import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PrimeNGConfig, MessageService } from 'primeng/api';
import { AccessoryItem } from 'src/app/models/accessory-item';
import { PartChoice } from 'src/app/models/part-choice';
import { Promotion } from 'src/app/models/promotion';
import { ForumService } from 'src/app/services/forum.service';
import { PromotionService } from 'src/app/services/promotion.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  listOfPromotions: Promotion[];
  listOfPartChoices: PartChoice[];
  listOfAccessoryItems: AccessoryItem[];

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private promotionService: PromotionService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService) { 
      this.listOfPromotions = new Array();
      this.listOfPartChoices = new Array();
      this.listOfAccessoryItems = new Array();
    }

  ngOnInit(): void {
    this.promotionService.retrieveOngoingPromotion().subscribe({
      next:(response) => {
        this.listOfPromotions = response;
      },
      error: (error) => {
        console.log("***********ForumPageComponent.ts: " + error);
      }
    });
    this.primengConfig.ripple = true;
  }

  isPartPromotion(promo: Promotion) {
    
    if(promo.partChoiceEntities != null && promo.partChoiceEntities.length >= 1) {
      //console.log("This is a part promotion");
      this.listOfPartChoices = promo.partChoiceEntities;
      return true;
    } else {
      //console.log("This is not a part promotion");
      this.listOfAccessoryItems = promo.accessoryItemEntities;
      return false;
    }
  }

  isDiscountPromotion(promo: Promotion) {
    if(promo.discount == 0) {
      return false;
    } else {
      return true;
    }
  }
}
