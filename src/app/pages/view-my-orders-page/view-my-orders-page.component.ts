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
import { FullPurchaseOrderEntity } from 'src/app/models/full-purchase-order';
import { DividerModule } from 'primeng/divider';
import { CarouselModule } from 'primeng/carousel';
import { BadgeModule } from 'primeng/badge';
import { PurchaseOrderStatusEnum } from 'src/app/models/enum/purchase-order-status-enum';
import { TimelineModule } from 'primeng/timeline';
import { FullPurchaseOrderLineItem } from 'src/app/models/full-purchase-order-lineitems';
import { PurchaseOrderLineItemTypeEnum } from 'src/app/models/enum/purchase-order-line-item-type-enum';
import { PurchaseOrderService } from 'src/app/services/purchase-order.service';
import { AccessoryItem } from 'src/app/models/accessory-item';
import { Product } from 'src/app/models/product';
import { ListboxModule } from 'primeng/listbox';
import { PartChoice } from 'src/app/models/part-choice';
import { ReviewService } from 'src/app/services/review.service';

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

  //create review
  createReviewDisplay: boolean;
  productChoices: Product[];
  accessoryChoices: AccessoryItem[];
  reviewFormSubmitted: boolean;
  rating?: number;
  description: string;
  //itemId?: number;
  prodId?: number;
  accId?: number;
  chooseAcc: boolean;
  chooseProd: boolean;
  purchaseOrderToReview: FullPurchaseOrderEntity;
  resultSuccess: boolean;
  resultError: boolean;
  JSON;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private purchaseOrderService: PurchaseOrderService,
    private reviewService: ReviewService
  ) {
    this.listOfPurchaseOrder = new Array();
    this.purchaseOrderToView = new FullPurchaseOrderEntity();

    //filtering and sorting purposes
    this.sortField = '';
    this.sortKey = '';
    this.sortOrder = 0;
    this.sortOptions = new Array();

    //view order details dialog
    this.viewOrderDisplay = false;
    this.purchaseOrderToView = new FullPurchaseOrderEntity();
    this.purchaseOrderLineItemToView = new Array();

    //submit support ticket dialog
    this.submitSupportTicketDisplay = false;

    //submit forum dialog
    this.submitForumDisplay = false;

    //create review
    this.createReviewDisplay = false;
    this.productChoices = new Array();
    this.accessoryChoices = new Array();
    this.reviewFormSubmitted = false;
    //this.itemId = 0;
    this.prodId = 0;
    this.accId = 0;
    this.rating = 0;
    this.description = '';
    this.chooseProd = false;
    this.chooseAcc = true;
    this.purchaseOrderToReview = new FullPurchaseOrderEntity();
    this.resultSuccess = false;
    this.resultError = false;

    this.JSON = JSON;

    this.events1 = [
      {
        status: 'in progress',
        color: 'blue',
      },
      {
        status: 'ready for shipment',
        color: 'orange',
      },
      {
        status: 'complete',
        color: 'green',
      },
      {
        status: 'refunded',
        color: 'red',
      },
    ];
  }

  ngOnInit(): void {
    this.checkAccessRight();
    this.purchaseOrderService.getMyPurchaseOrder().subscribe({
      next: (response) => {
        this.listOfPurchaseOrder = response;
        //console.log(response);
        // for (let i = 0; i < this.listOfPurchaseOrder.length; i++) {
        //   console.log ("Purchase order id" + this.listOfPurchaseOrder[i].purchaseOrderEntityId);
        // }
      },
      error: (error) => {
        //console.log('***********ForumPageComponent.ts: ' + error);
      },
    });
    //console.log(this.listOfPurchaseOrder.length);
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
    this.submitSupportTicketDisplay = false;
    this.submitForumDisplay = false;
    this.createReviewDisplay = false;
    this.viewOrderDisplay = true;
    this.purchaseOrderToView = purchaseOrderToView;
    this.purchaseOrderLineItemToView =
    this.purchaseOrderToView.purchaseOrderLineItems!;
  }

  showForumPostDialog(pol: FullPurchaseOrderEntity) {
    this.submitSupportTicketDisplay = false;
    this.createReviewDisplay = false;
    this.viewOrderDisplay = false;
    this.purchaseOrderToReview = pol;
    this.purchaseOrderToView= pol;
    this.submitForumDisplay = true;
  }

  directToForumPage() {
    this.router.navigate(['/forumPage']);
  }

  showSupportTicketDialog() {
    this.submitForumDisplay = false;
    this.createReviewDisplay = false;
    this.viewOrderDisplay = false;
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
    if (po.purchaseOrderStatus == PurchaseOrderStatusEnum.IN_PROGRESS) {
      return true;
    } else {
      return false;
    }
  }

  readyForShipment(po: FullPurchaseOrderEntity) {
    if (po.purchaseOrderStatus == PurchaseOrderStatusEnum.READY_FOR_SHIPMENT) {
      return true;
    } else {
      return false;
    }
  }

  isComplete(po: FullPurchaseOrderEntity) {
    if (po.purchaseOrderStatus == PurchaseOrderStatusEnum.COMPLETE) {
      //console.log("isComplete true");
      return true;
    } else {
      //console.log("isComplete false");
      return false;
    }
  }

  isRefunded(po: FullPurchaseOrderEntity) {
    if (po.purchaseOrderStatus == PurchaseOrderStatusEnum.REFUNDED) {
      return true;
    } else {
      return false;
    }
  }

  // decide if it's accessory or built
  isBuilt(po: FullPurchaseOrderLineItem) {
    if (
      po.purchaseOrderLineItemTypeEnum == PurchaseOrderLineItemTypeEnum.BUILD
    ) {
      return true;
    } else {
      return false;
    }
  }

  isAccessory(po: FullPurchaseOrderLineItem) {
    if (
      po.purchaseOrderLineItemTypeEnum ==
      PurchaseOrderLineItemTypeEnum.ACCESSORY
    ) {
      return true;
    } else {
      return false;
    }
  }

  // check if there's at least one record
  atLeastOneBuild(po: FullPurchaseOrderEntity) {
    let listOfPols: FullPurchaseOrderLineItem[] = po.purchaseOrderLineItems!;
    for (let i = 0; i < listOfPols?.length; i++) {
      if (
        listOfPols[i].purchaseOrderLineItemTypeEnum ==
        PurchaseOrderLineItemTypeEnum.BUILD
      ) {
        return true;
      }
    }

    return false;
  }

  atLeastOneAcc(po: FullPurchaseOrderEntity) {
    let listOfPols: FullPurchaseOrderLineItem[] = po.purchaseOrderLineItems!;
    for (let i = 0; i < listOfPols?.length; i++) {
      if (
        listOfPols[i].purchaseOrderLineItemTypeEnum ==
        PurchaseOrderLineItemTypeEnum.ACCESSORY
      ) {
        return true;
      }
    }

    return false;
  }

  // handle create review
  showCreateReviewDialog(pol: FullPurchaseOrderEntity) {
    this.submitSupportTicketDisplay = false;
    this.submitForumDisplay = false;
    this.viewOrderDisplay = false;
    this.purchaseOrderToReview = pol;
    this.purchaseOrderToView= pol;
    this.createReviewDisplay = true;
  }

  chooseProduct() {
    this.chooseAcc = false;
    this.chooseProd = true;
    let listOfPols: FullPurchaseOrderLineItem[] =
      this.purchaseOrderToReview.purchaseOrderLineItems!;
    console.log(listOfPols.length);
    this.productChoices = [];
    for (let i = 0; i < listOfPols?.length; i++) {
      if (
        listOfPols[i].purchaseOrderLineItemTypeEnum ==
        PurchaseOrderLineItemTypeEnum.BUILD
      ) {
        console.log(listOfPols[i].productEntity.productName);
        this.productChoices.push(listOfPols[i].productEntity);
      }
    }
  }

  chooseAccessory() {
    this.chooseAcc = true;
    this.chooseProd = false;
    let listOfPols: FullPurchaseOrderLineItem[] =
      this.purchaseOrderToReview.purchaseOrderLineItems!;
    this.accessoryChoices = [];
    for (let i = 0; i < listOfPols?.length; i++) {
      if (
        listOfPols[i].purchaseOrderLineItemTypeEnum ==
        PurchaseOrderLineItemTypeEnum.ACCESSORY
      ) {
        this.accessoryChoices.push(listOfPols[i].accessoryItemEntity);
      }
    }
  }

  // clearing without closing the dialog box
  initializeReviewFormWithoutClosing() {
    this.accessoryChoices = [];
    this.productChoices = [];
    this.reviewFormSubmitted = false;
    this.rating = 0;
    this.description = '';
    this.accId = 0;
    this.prodId = 0;
    this.chooseAcc = false;
    this.chooseProd = false;
  }

  clear() {
    this.initializeReviewFormWithoutClosing();
  }

  createNewReviewForProduct(createNewReviewForProduct: NgForm) {
    // console.log("rating: " + this.rating);
    // console.log("description: " + this.description);
    // console.log("itemId: " + this.prodId);
    // console.log('reach here: product');
    this.reviewFormSubmitted = true;

    this.reviewService
      .createNewReviewForProduct(this.prodId!, this.description, this.rating!)
      .subscribe({
        next: (response) => {
          let reviewId: Number = response;
          this.resultSuccess = true;
          this.resultError = false;
          this.clear();
          this.createReviewDisplay = false;
          this.viewOrderDisplay = false;
          this.messageService.add({
            severity: 'info',
            summary: 'Successfuly posted a review',
            detail: 'Your review will greatly help the community!',
          });
          createNewReviewForProduct.reset();
          createNewReviewForProduct.resetForm();
        },
        error: (error) => {
          this.resultError = true;
          this.resultSuccess = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail:
              'An error has occured while posting a review' + error.toString(),
          });
          console.log('********** Create new review.ts: ' + error);
        },
      });
  }

  createNewReviewForAccessory(createNewReviewForAcc: NgForm) {
    console.log('reach here: accessory');
    this.reviewFormSubmitted = true;

    this.reviewService
      .createNewReviewForAcc(this.accId!, this.description, this.rating!)
      .subscribe({
        next: (response) => {
          let reviewId: Number = response;
          this.resultSuccess = true;
          this.resultError = false;
          this.clear();
          this.createReviewDisplay = false;
          this.viewOrderDisplay = false;
          this.messageService.add({
            severity: 'info',
            summary: 'Successfuly posted a review',
            detail: 'Your review will greatly help the community!',
          });
          createNewReviewForAcc.reset();
          createNewReviewForAcc.resetForm();
        },
        error: (error) => {
          this.resultError = true;
          this.resultSuccess = false;

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail:
              'An error has occured while posting a review: ' +
              error.toString(),
          });
          console.log('********** Create new review.ts: ' + error);
        },
      });
  }

  navigateToSupportTicket() {
    this.router.navigate(["/supportPage"]);
  }

  dummy() {
    console.log('rating is : ' + this.rating);
    if (1 + 1 == 2) {
      return true;
    } else {
      return false;
    }
  }

  isDisabled() {
    return true;
  }

  redirectToProductPage() {
    this.router.navigate(["productsHomePage"]);
  
  }

  // displaying cosmetic
  checkIfImageExist(pol: FullPurchaseOrderLineItem) {
    if(pol.cosmeticImageLink === null || pol.cosmeticImageLink === "") {
      return false;
    } else {
      return true;
    }
  }
}


