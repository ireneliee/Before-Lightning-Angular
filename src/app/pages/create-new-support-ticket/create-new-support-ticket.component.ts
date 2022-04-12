import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { MessageService, Message, PrimeNGConfig } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { SupportTicket } from 'src/app/models/support-ticket';
import { SupportService } from 'src/app/services/support.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-create-new-support-ticket',
  templateUrl: './create-new-support-ticket.component.html',
  styleUrls: ['./create-new-support-ticket.component.css'],
  providers: [MessageService],
})  
export class CreateNewSupportTicketComponent implements OnInit {
  username: string;
  issue: string;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private supportService: SupportService,
    private primengConfig: PrimeNGConfig
  ) {
    this.username = '';
    this.issue = '';
  }

  clear() {
    this.username = "";
    this.issue = "";
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.clear();
  }

  displayMaximizable?: boolean;
  showMaximizableDialog() {
    this.displayMaximizable = true;
}
  create(createSupportTicketForm: NgForm) {
    console.log("create method @createsupportticketcomponent");
    console.log("Issue received: " + this.issue);
  
    if(createSupportTicketForm.valid) {
      this.supportService.createSupportTicket(this.issue).subscribe({
          next: (response) => {
            this.clear();
            this.messageService.add({ severity: 'info', summary: "Successfuly posted a forum post entry", detail: "Please visit the forum page to view your entry" });
            createSupportTicketForm.resetForm();
            createSupportTicketForm.reset();
          },
          error: (error) => {
            this.messageService.add({ severity: "error", summary: "Error", detail: "An error has occured while posting the entry" });
            console.log("********** Create new support ticket post.ts: " + error);
          },
        });
    }
  }
}
