import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { SessionService } from 'src/app/services/session.service';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'app-forum-menu',
  templateUrl: './forum-menu.component.html',
  styleUrls: ['./forum-menu.component.css'],
})
export class ForumMenuComponent implements OnInit {
  items: MenuItem[];
  activeItem: MenuItem;

  constructor(
    private router: Router,
    public sessionService: SessionService,
    private messageService: MessageService
  ) {
    this.items = [
      { label: 'All posts', icon: 'pi pi-table', command : () => {this.router.navigate(["/forumPage"])}},
      { label: 'My posts', icon: 'pi pi-book', command: () => {this.router.navigate(["/viewMyForumPage"])}},
    ];
    this.activeItem = this.items[0];
  }

  ngOnInit(): void {}
}
