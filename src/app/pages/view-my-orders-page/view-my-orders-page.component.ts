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
import { TimelineModule } from 'primeng/timeline';
import { FullPurchaseOrderLineItem } from 'src/app/models/full-purchase-order-lineitems';
import { PurchaseOrderLineItemTypeEnum } from 'src/app/models/enum/purchase-order-line-item-type-enum';

@Component({
  selector: 'app-view-my-orders-page',
  templateUrl: './view-my-orders-page.component.html',
  styleUrls: ['./view-my-orders-page.component.css'],
})
export class ViewMyOrdersPageComponent implements OnInit {
  listOfPurchaseOrder: PurchaseOrderEntity[];

  //filtering and sorting purposes
  sortOptions: SelectItem[];
  sortField: string;
  sortOrder: number;
  sortKey: string;
  

  // tracking information
  events1: any[];

  //view order details dialog
  viewOrderDisplay: boolean;
  purchaseOrderToView: FullPurchaseOrderEntity;
  purchaseOrderLineItemToView: FullPurchaseOrderLineItem[];

  //submit support ticket dialog
  submitSupportTicketDisplay: boolean;

  //submit forum dialog
  submitForumDisplay: boolean;

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

    //view order details dialog
    this.viewOrderDisplay =  false;
    this.purchaseOrderToView = new FullPurchaseOrderEntity();
    this.purchaseOrderLineItemToView = new Array();

    //submit support ticket dialog
    this.submitSupportTicketDisplay = false;
  
    //submit forum dialog
    this.submitForumDisplay =  false;

    this.events1 = [
      {
        status: 'IN_PROGRESS',
        color: 'blue',
      },
      {
        status: 'READY_FOR_SHIPMENT',
        color: 'orange',
      },
      {
        status: 'COMPLETE',
        color: 'green',
      },
      {
        status: 'REFUNDED',
        color: 'red',
      },
    ];
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

  showViewPurchaseOrderDialog(purchaseOrderToView: FullPurchaseOrderEntity) {
    this.viewOrderDisplay = true;
    this.purchaseOrderToView = purchaseOrderToView;
    this.purchaseOrderLineItemToView = this.purchaseOrderToView.purchaseOrderLineItems!;
  }

  showForumPostDialog() {
    this.submitForumDisplay =  true;
  }

  directToForumPage() {
    this.router.navigate(["/forumPage"]);
  }

  showSupportTicketDialog() {
    this.submitSupportTicketDisplay = true;
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

  // badge-related
  inProgress(po: FullPurchaseOrderEntity) {
    if(po.purchaseOrderStatus == PurchaseOrderStatusEnum.IN_PROGRESS) {
      return true;
    } else {
      return false;
    }
  }

  readyForShipment(po: FullPurchaseOrderEntity) {

    if(po.purchaseOrderStatus == PurchaseOrderStatusEnum.READY_FOR_SHIPMENT) {
      return true;
    } else {
      return false;
    }
  }

  isComplete(po: FullPurchaseOrderEntity) {
    if(po.purchaseOrderStatus == PurchaseOrderStatusEnum.COMPLETE ) {
      //console.log("isComplete true");
      return true;
    } else {
      console.log("isComplete false");
      return false;
    }
  }

  isRefunded(po: FullPurchaseOrderEntity) {
    if(po.purchaseOrderStatus == PurchaseOrderStatusEnum.REFUNDED) {
      return true;
    } else {
      return false;
    }
  }

  // decide if it's accessory or built
  isBuilt(po: FullPurchaseOrderLineItem) {
    if(po.purchaseOrderLineItemTypeEnum == PurchaseOrderLineItemTypeEnum.BUILD) {
      return true;
    } else {
      return false;
    }
  }

  isAccessory(po: FullPurchaseOrderLineItem) {
    if(po.purchaseOrderLineItemTypeEnum == PurchaseOrderLineItemTypeEnum.ACCESSORY) {
      return true;
    } else {
      return false;
    }
  }
}
