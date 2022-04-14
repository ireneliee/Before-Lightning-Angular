import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Member } from 'src/app/models/member';
import { Product } from 'src/app/models/product';
import { Review } from 'src/app/models/review';
import { MemberService } from 'src/app/services/member.service';
import { ProductService } from 'src/app/services/product.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-products-home-page',
  templateUrl: './products-home-page.component.html',
  styleUrls: ['./products-home-page.component.scss'],
})
export class ProductsHomePageComponent implements OnInit {
  listOfProductEntities: Product[] = [];
  number: number;
  sortOptions: SelectItem[];
  reviewMap: Map<string, number>;
  sortField: string;
  sortOrder: number;
  sortKey: string;
  selectedProduct: Product | null = null;
  displayReviewsDialog: boolean = false;
  listOfReviews: Review[] = [];
  ratingsMap: Map<Product, number> = new Map();

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private productService: ProductService,
	private memberService: MemberService
  ) {
    this.sortOptions = new Array();
    this.reviewMap = new Map<string, number>();
    this.sortField = '';
    this.sortKey = '';
    this.sortOrder = 0;
    this.number = 5;
  }

  ngOnInit(): void {
    this.checkAccessRight();

    this.productService.getProducts().subscribe({
      next: (response) => {
        this.listOfProductEntities = response;
        console.log('going through products to calc rating');
        this.listOfProductEntities.forEach((product) => {
          let rating = 0;
          let total = 0;
          if (product.reviewEntities!.length > 0) {
            product.reviewEntities!.forEach((review) => {
              total += review.rating!;
            });
            rating = Math.round(total / product.reviewEntities!.length);
          }
          this.ratingsMap.set(product, rating);
          // let avgRating = 0;
          // let numReviews = product.reviewEntities.length;
          // let sumRating = 0;
          // product.reviewEntities.forEach((review) => {
          // 	sumRating += review.rating!;
          // });
          // avgRating = sumRating / numReviews;
          // console.log("avg rating for this product: " + avgRating);
          // this.reviewMap.set(product.productName!, avgRating);
        });
        console.log(this.listOfProductEntities);
      },
      error: (error) => {
        console.log('***********ProductPageComponent.ts: ' + error);
      },
    });

    this.sortOptions = [
      { label: 'Name', value: 'productName' },
      { label: 'Rating', value: 'rating' },
      { label: 'Brand', value: 'brand' },
    ];
  }

  retrieveUserByUsername(username: string): Member {
    this.memberService.RetrieveMemberByUsername(username).subscribe({
      next: (response) => {
		  return response as Member;
	  },
      error: (error) => {
        console.log('***********ProductPageComponent.ts: ' + error);
		
      },
    });
	return this.sessionService.getCurrentMember();
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

  customizeProduct(product: Product) {
    this.router.navigate(['/customizeProductsPage/' + product.productEntityId]);
  }

  doDisplayReviewsDialog(product: Product) {
    this.displayReviewsDialog = true;
    console.log(product);
    this.selectedProduct = product;
    this.listOfReviews = this.selectedProduct.reviewEntities!;
  }

  checkAccessRight() {
    if (!this.sessionService.checkAccessRight(this.router.url)) {
      this.router.navigate(['/accessRightError']);
    }
  }
}
