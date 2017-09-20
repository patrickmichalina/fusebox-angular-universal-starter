import { ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MdSidenav } from "@angular/material";
import { DASHBOARD_MENU } from "./dashboard-menu";

@Component({
  selector: 'pm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit{ 

  pageTitle: string;

  isMobile: boolean= false;

  dashboardMenu: any = DASHBOARD_MENU;

  @ViewChild('sidenav') public sidenav: MdSidenav;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
      if (event.target.innerWidth < 840) {
          this.sidenav.close();
      }
      if (event.target.innerWidth >= 840) {
        this.sidenav.open();
      }
  }
  
  constructor(private route: ActivatedRoute){
  }

  ngOnInit() {
    this.setPageTitle(this.route.snapshot.children[0].firstChild.data['meta'].title);
  }

  toggleSidenav(event: any){
      this.sidenav.toggle();
  }

  setPageTitle(title: string){
    this.pageTitle = title;
  }

  


}
