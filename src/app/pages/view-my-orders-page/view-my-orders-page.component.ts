import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ForumPost } from 'src/app/models/forum-post';
import { ForumService } from 'src/app/services/forum.service';
import { SessionService } from 'src/app/services/session.service';
import { MessageService, SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { Reply } from 'src/app/models/reply';
import { PurchaseOrderEntity } from 'src/app/models/purchase-order';
import { PurchaseOrderService } from 'src/app/services/purchase-order-service';
import { FullPurchaseOrderEntity } from 'src/app/models/full-purchase-order';
import { DividerModule } from 'primeng/divider';
import { CarouselModule } from 'primeng/carousel';
import { BadgeModule } from 'primeng/badge';
import { PurchaseOrderStatusEnum } from 'src/app/models/enum/purchase-order-status-enum';

@Component({
  selector: 'app-view-my-orders-page',
  templateUrl: './view-my-orders-page.component.html',
  styleUrls: ['./view-my-orders-page.component.css'],
})
export class ViewMyOrdersPageComponent implements OnInit {
  listOfPurchaseOrder: PurchaseOrderEntity[];
  purchaseOrderToView: PurchaseOrderEntity;

  //filtering and sorting purposes
  sortOptions: SelectItem[];
  sortField: string;
  sortOrder: number;
  sortKey: string;
  inProgressStatus: PurchaseOrderStatusEnum;
  readyForShipmentStatus: PurchaseOrderStatusEnum;
  completeStatus: PurchaseOrderStatusEnum;
  refunded: PurchaseOrderStatusEnum;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private purchaseOrderService: PurchaseOrderService
  ) {
    this.listOfPurchaseOrder = new Array();
    this.purchaseOrderToView = new FullPurchaseOrderEntity();

    //filtering and sorting purposes
    this.sortField = '';
    this.sortKey = '';
    this.sortOrder = 0;
    this.sortOptions = new Array();

    // aesthetic coloring purposes
    this.inProgressStatus = PurchaseOrderStatusEnum.IN_PROGRESS;
    this.readyForShipmentStatus =  PurchaseOrderStatusEnum.READY_FOR_SHIPMENT;
    this.completeStatus =  PurchaseOrderStatusEnum.COMPLETE;
    this.refunded =  PurchaseOrderStatusEnum.REFUNDED;
  }

  ngOnInit(): void {
    this.checkAccessRight();
    this.purchaseOrderService.getMyPurchaseOrder().subscribe({
      next: (response) => {
        this.listOfPurchaseOrder = response;
        console.log(response);
        // for (let i = 0; i < this.listOfPurchaseOrder.length; i++) {
        //   console.log ("Purchase order id" + this.listOfPurchaseOrder[i].purchaseOrderEntityId);
        // }
      },
      error: (error) => {
        console.log('***********ForumPageComponent.ts: ' + error);
      },
    });
    console.log(this.listOfPurchaseOrder.length);
    this.sortOptions = [
      { label: 'Recent First', value: '!timestamp' },
      { label: 'Oldest First', value: 'timestamp' },
    ];
    this.primengConfig.ripple = true;
  }

  checkAccessRight() {
    if (!this.sessionService.checkAccessRight(this.router.url)) {
      this.router.navigate(['/accessRightError']);
    }
  }

  onSortChange(event: { value: any }) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
}
