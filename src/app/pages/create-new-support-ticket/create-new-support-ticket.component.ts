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
  email: string;
  @Output()
  signalToRefresh: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private supportService: SupportService,
    private primengConfig: PrimeNGConfig
  ) {
    this.username = "";
    this.issue = "";
    this.email = "";
  }

  clear() {
    this.username = "";
    this.issue = "";
    this.email = "";
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

    if (this.email != null) {
    }
  
    if (createSupportTicketForm.valid) {

      if (this.email != "") {
        this.sessionService.setEmail(this.email);
      }

      this.supportService.createSupportTicket(this.issue).subscribe({
          next: (response) => {
          this.clear();
          if (this.email != "") {
            this.messageService.add({ severity: 'info', summary: "Successfuly Created Support Ticket", detail: "Please Log In and visit the Support Page to view your entry" });
          } else {
            this.messageService.add({ severity: 'info', summary: "Successfuly Created Support Ticket", detail: "Please visit the Support Page to view your entry" });

          }
            createSupportTicketForm.resetForm();
            createSupportTicketForm.reset();
          this.sessionService.setEmail("");
          this.signalToRefresh.emit('');

          },
          error: (error) => {
            this.messageService.add({ severity: "error", summary: "Error", detail: "An error has occured while posting the entry" });
            console.log("********** Create new support ticket post.ts: " + error);
          },
        });
    }
  }
}
