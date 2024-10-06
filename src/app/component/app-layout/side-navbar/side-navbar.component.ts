import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, HostListener, Input, NgZone, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { DataService } from 'src/app/services/data.service';
// import { DialogService } from 'src/app/services/dialog.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { validate } from 'uuid';
// import { HelperService } from 'src/app/services/helper.service';
// import { environment } from 'src/environments/environment';
import { CommonModule, Location } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedService } from '../../../services/shared.service';
interface SideNavToggle {
  screenwidth: number
  collapsed: boolean
}

@Component({
  selector: 'app-side-navbar',
  standalone: true,
  imports: [MatMenuModule, MatIconModule, MatButtonModule, MatSidenavModule, CommonModule],
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit {
  activeItem: string = 'pending';

  @Input() parentData: String = '';
  @Input() sideNavStatus: any;

  @Output() onToggleSidenav: EventEmitter<SideNavToggle> = new EventEmitter
  @Output() newItemEvent = new EventEmitter<string>();
  isDisabled = true;
  navItems!: any[]
  collapsed = true
  screenwidth = 0
  subsectionExpanded: { [key: string]: boolean } = {};
  logo_image: any;
  project_Data: any = [];
  // activeItem:string="";

  constructor(
    private router: Router,
    private zone: NgZone,
    private sharedService: SharedService

  ) {
  }

  toggleSubsection(section: any): void {
    for (let subsectionName in this.subsectionExpanded) {
      if (subsectionName !== section.displayName) {
        this.subsectionExpanded[subsectionName] = false;
      }
    }
    if (section.children) {
      this.subsectionExpanded[section.displayName] = !this.subsectionExpanded[section.displayName];
    }
    if (section) {
      section.expand = !section.expand
      section.collapsed = !section.expand
    }
  }

  screenId: any
  selectProject: any
  @Input('header') header: any
  routego: boolean = true;
  ngOnInit(): void {

    if (this.header) {
      this.navItems = this.header
      console.log(this.header);

      this.routego = false
      return
    }

    this.screenId = 'ProjectMenu'
    this.screenwidth = window.innerWidth
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(this.sideNavStatus);

  }
  @HostListener('window:ressize', ['$event'])
  onResize(event: any) {
    this.screenwidth = window.innerWidth;
    if (this.screenwidth <= 768) {
      this.collapsed = false
      this.onToggleSidenav.emit({ collapsed: this.collapsed, screenwidth: this.screenwidth })
    }
  }

  togglecollapse(menuItem?: boolean) {
    if (!menuItem) {
      this.collapsed = !this.collapsed
      this.onToggleSidenav.emit({ collapsed: this.collapsed, screenwidth: this.screenwidth })
    }

  }

  closesidenv() {
    this.collapsed = false
    this.onToggleSidenav.emit({ collapsed: this.collapsed, screenwidth: this.screenwidth })
  }

  goToDashboard(item: any) {
    // this.sharedService.emitItem(item);
    // this.activeItem= item;
    this.newItemEvent.emit(item);
    console.log("parent Form Name :" + item);

  }


  isDisabledLabel(key: string): boolean {
    this.sideNavStatus.map((s: any) => {
      if (s.key === key) {

      }
    }
    )
    const status = this.sideNavStatus.find((s: any) => s.key === key);
    console.log(key);
    return status ? status.status !== 'completed' : true;
  }

  close() {
    // this.helperServices.getProjectmenu(false)
  }

  logout() {

    this.zone.run(() => {
      if (confirm("Are you sure you want to Logout?")) {
        sessionStorage.clear();
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    });
  }

  routeToDestination(data: any) {
    if (!this.routego) return;
    let route = data.first + this.selectProject._id + data.last


    this.router.navigate([route])
  }

}
