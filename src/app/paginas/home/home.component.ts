import { SidebarComponent } from './../../compartidos/sidebar/sidebar.component';
import { Component, OnInit, HostListener, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('mainContainer') mainContainer: HTMLElement;
  @ViewChild('sidebar') sidebar: SidebarComponent;

  pageSettings;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
    // page settings
    this.pageSettings = {
      pageSidebarMinified: false,
      pageContentFullHeight: false,
      pageContentFullWidth: false,
      pageContentInverseMode: false,
      pageWithFooter: false,
      pageWithoutSidebar: false,
      pageSidebarRight: false,
      pageSidebarRightCollapsed: false,
      pageSidebarTwo: false,
      pageSidebarWide: false,
      pageSidebarTransparent: false,
      pageSidebarLight: false,
      pageTopMenu: false,
      pageEmpty: false,
      pageBodyWhite: false,
      pageMobileSidebarToggled: false,
      pageMobileSidebarFirstClicked: false,
      pageMobileSidebarRightToggled: false,
      pageMobileSidebarRightFirstClicked: false
    };
  }

  ngAfterViewInit(): void {
    this.sidebar.inciarMenu();
  }

  // window scroll
  // pageHasScroll;
  // @HostListener('window:scroll', ['$event'])
  // onWindowScroll($event) {
  //   var doc = document.documentElement;
  //   var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  //   if (top > 0) {
  //     this.pageHasScroll = true;
  //   } else {
  //     this.pageHasScroll = false;
  //   }
  // }

  // clear settings to default
  clearSettings() {
    this.pageSettings.pageSidebarMinified = false;
    this.pageSettings.pageContentFullHeight = false,
      this.pageSettings.pageContentFullWidth = false;
    this.pageSettings.pageWithFooter = false;
    this.pageSettings.pageWithoutSidebar = false;
    this.pageSettings.pageSidebarRight = false;
    this.pageSettings.pageSidebarRightCollapsed = false;
    this.pageSettings.pageSidebarTwo = false;
    this.pageSettings.pageSidebarWide = false;
    this.pageSettings.pageSidebarTransparent = false;
    this.pageSettings.pageSidebarLight = false;
    this.pageSettings.pageTopMenu = false;
    this.pageSettings.pageEmpty = false;
    this.pageSettings.pageBodyWhite = false;
    this.pageSettings.pageContentInverseMode = false;
    this.pageSettings.pageMobileSidebarToggled = false;
    this.pageSettings.pageMobileSidebarFirstClicked = false;
    this.pageSettings.pageMobileRightSidebarToggled = false;
    this.pageSettings.pageMobileRightSidebarFirstClicked = false;
    this.renderer.removeClass(document.body, 'bg-white');
  }

  toggleMenu() {
    this.sidebar.toggleMenu();
  }

  // set page settings
  setPageSettings(settings) {
    for (let option in settings) {
      this.pageSettings[option] = settings[option];
      if (option == 'pageBodyWhite' && settings[option] == true) {
        this.renderer.addClass(document.body, 'bg-white');
      }
    }
  }

  // set page minified
  onToggleSidebarMinified(val: boolean): void {
    if (this.pageSettings.pageSidebarMinified) {
      this.pageSettings.pageSidebarMinified = false;
    } else {
      this.pageSettings.pageSidebarMinified = true;
    }
    const elemento = document.getElementById('page-container');
    elemento.classList.toggle('page-sidebar-minified');
  }

  // set page right collapse
  onToggleSidebarRight(val: boolean): void {
    if (this.pageSettings.pageSidebarRightCollapsed) {
      this.pageSettings.pageSidebarRightCollapsed = false;
    } else {
      this.pageSettings.pageSidebarRightCollapsed = true;
    }
  }

  // hide mobile sidebar
  onHideMobileSidebar(val: boolean): void {
    if (this.pageSettings.pageMobileSidebarToggled) {
      if (this.pageSettings.pageMobileSidebarFirstClicked) {
        this.pageSettings.pageMobileSidebarFirstClicked = false;
      } else {
        this.pageSettings.pageMobileSidebarToggled = false;
      }
    }
  }

  actualizarMenu() {
    this.sidebar.inciarMenu();
  }

}
