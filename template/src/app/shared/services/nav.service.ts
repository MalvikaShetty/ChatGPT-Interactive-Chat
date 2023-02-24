import { Injectable, OnDestroy } from "@angular/core";
import { Subject, BehaviorSubject, fromEvent } from "rxjs";
import { takeUntil, debounceTime } from "rxjs/operators";
import { Router } from "@angular/router";

// Menu
export interface Menu {
  headTitle1?: string;
  headTitle2?: string;
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  bookmark?: boolean;
  children?: Menu[];
}

@Injectable({
  providedIn: "root",
})
export class NavService implements OnDestroy {
  private unsubscriber: Subject<any> = new Subject();
  public screenWidth: BehaviorSubject<number> = new BehaviorSubject(window.innerWidth);

  // Search Box
  public search: boolean = false;

  // Language
  public language: boolean = false;

  // Mega Menu
  public megaMenu: boolean = false;
  public levelMenu: boolean = false;
  public megaMenuColapse: boolean = window.innerWidth < 1199 ? true : false;

  // Collapse Sidebar
  public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;

  // For Horizontal Layout Mobile
  public horizontal: boolean = window.innerWidth < 991 ? false : true;

  // Full screen
  public fullScreen: boolean = false;

  constructor(private router: Router) {
    this.setScreenWidth(window.innerWidth);
    fromEvent(window, "resize")
      .pipe(debounceTime(1000), takeUntil(this.unsubscriber))
      .subscribe((evt: any) => {
        this.setScreenWidth(evt.target.innerWidth);
        if (evt.target.innerWidth < 991) {
          this.collapseSidebar = true;
          this.megaMenu = false;
          this.levelMenu = false;
        }
        if (evt.target.innerWidth < 1199) {
          this.megaMenuColapse = true;
        }
      });
    if (window.innerWidth < 991) {
      // Detect Route change sidebar close
      this.router.events.subscribe((event) => {
        this.collapseSidebar = true;
        this.megaMenu = false;
        this.levelMenu = false;
      });
    }
  }

  ngOnDestroy() {
    // this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  private setScreenWidth(width: number): void {
    this.screenWidth.next(width);
  }

  MENUITEMS: Menu[] = [
    // {
    //   headTitle1: "General",
    // },
    {
      title: "Dashboards",
      icon: "home",
      type: "sub",
      badgeType: "light-primary",
      badgeValue: "5",
      active: true,
      children: [
        { path: "/dashboard/default", title: "Default", type: "link" },
      ],
    },
 
    // {
    //   headTitle1: "Applications",
    //   headTitle2: "Ready To Use Apps.",
    // },
    // {
    //   title: "Project",
    //   icon: "project",
    //   type: "sub",
    //   badgeType: "light-secondary",
    //   badgeValue: "New",
    //   active: false,
    //   children: [
    //     { path: "/project/list", title: "Project List", type: "link" },
    //     { path: "/project/create", title: "Create New", type: "link" },
    //   ],
    // },
    {
      path: "/project/create",
      title: "Form",
      icon: "form",
      type: "link",
    },
    {
      path: "/file-manager",
      title: "File Upload",
      icon: "file",
      type: "link",
    },
    {
      path: "/chat",
      title: "Chat",
      icon: "chat",
      type: "link",
      bookmark: true,
    },
    {
      title: "Users",
      icon: "user",
      type: "sub",
      active: false,
      children: [
        { path: "/user/team-details", title: "All Users", type: "link" },
        { path: "/user/profile", title: "User Profile", type: "link" },
        { path: "/user/edit-profile", title: "Edit Profile", type: "link" },
      ],
    },

    { path: "/contacts", title: "Contact", icon: "contact", type: "link", bookmark: true },
    { path: "/todo", title: "Todo", icon: "to-do", type: "link" },
    { path: "/search-pages", title: "Search Result", icon: "search", type: "link" },
    // {
    //   headTitle1: "Forms & Table",
    //   headTitle2: "Ready To Use Froms & Tables.",
    // },
    // {
    //   title: "Forms",
    //   icon: "form",
    //   type: "sub",
    //   active: false,
    //   children: [
    //     {
    //       title: "Form Controls",
    //       icon: "file-text",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         { path: "/form/form-controls/validation", title: "Form Validation", type: "link" },
    //         { path: "/form/form-controls/inputs", title: "Base Inputs", type: "link" },
    //         { path: "/form/form-controls/checkbox-radio", title: "Checkbox & Radio", type: "link" },
    //         { path: "/form/form-controls/input-groups", title: "Input Groups", type: "link" },
    //         { path: "/form/form-controls/mega-options", title: "Mega Options", type: "link" },
    //       ],
    //     },
    //     {
    //       title: "Form Widgets",
    //       icon: "file-text",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         { path: "/form/form-widgets/touchspin", title: "Touchspin", type: "link" },
    //         { path: "/form/form-widgets/ngselect", title: "Ng-Select", type: "link" },
    //         { path: "/form/form-widgets/switch", title: "Switch", type: "link" },
    //         { path: "/form/form-widgets/clipboard", title: "Clipboard", type: "link" },
    //       ],
    //     },
    //     {
    //       title: "Form Layout",
    //       icon: "file-text",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         { path: "/form/form-layout/default-form", title: "Default Forms", type: "link" },
    //         { path: "/form/form-layout/form-wizard", title: "Form Wizard 1", type: "link" },
    //         { path: "/form/form-layout/form-wizard-two", title: "Form Wizard 2", type: "link" },
    //         { path: "/form/form-layout/form-wizard-three", title: "Form Wizard 3", type: "link" },
    //         { path: "/form/form-layout/form-wizard-four", title: "Form Wizard 4", type: "link" },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   title: "Tables",
    //   icon: "table",
    //   type: "sub",
    //   active: false,
    //   children: [
    //     {
    //       title: "Bootstrap Tables",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         { path: "/table/bootstrap-tables/basic", title: "Basic Table", type: "link" },
    //         { path: "/table/bootstrap-tables/table-components", title: "Table components", type: "link" },
    //       ],
    //     },
    //     {
    //       title: "Data table",
    //       active: false,
    //       type: "link",
    //       path: "/table/datatable",
    //     },
    //   ],
    // },
    // {
    //   headTitle1: "Components",
    //   headTitle2: "UI Components & Elements.",
    // },
    // {
    //   title: "Widgets",
    //   icon: "widget",
    //   type: "sub",
    //   active: false,
    //   children: [
    //     // { path: "/widgets/general", title: "General", type: "link" },
    //     { path: "/widgets/chart", title: "Chart", type: "link" },
    //   ],
    // },
    // {
    //   title: "Ui-Kits",
    //   icon: "ui-kits",
    //   type: "sub",
    //   active: false,
    //   children: [
    //     { path: "/ui-kits/avatars", title: "Avatars", type: "link" },
    //     { path: "/ui-kits/breadcrumb", title: "Breadcrumb", type: "link" },
    //     { path: "/ui-kits/grid", title: "Grid", type: "link" },
    //     { path: "/ui-kits/helper-classes", title: "Helper-Classes", type: "link" },
    //     { path: "/ui-kits/list", title: "List", type: "link" },
    //     { path: "/ui-kits/ribbons", title: "Ribbons", type: "link" },
    //     { path: "/ui-kits/shadow", title: "Shadow", type: "link" },
    //     { path: "/ui-kits/spinner", title: "Spinner", type: "link" },
    //     { path: "/ui-kits/tag-n-pills", title: "Tag and Pills", type: "link" },
    //     { path: "/ui-kits/typography", title: "Typography", type: "link" },
    //   ],
    // },
    // {
    //   title: "Bonus UI",
    //   icon: "bonus-kit",
    //   type: "sub",
    //   active: false,
    //   children: [
    //     {
    //       title: "Base",
    //       icon: "box",
    //       type: "sub",
    //       children: [
    //         { path: "/base/accordion", title: "Accordion", type: "link" },
    //         { path: "/base/alert", title: "Alert", type: "link" },
    //         { path: "/base/buttons", title: "Buttons", type: "link" },
    //         { path: "/base/carousel", title: "Carousel", type: "link" },
    //         { path: "/base/collapse", title: "Collapse", type: "link" },
    //         { path: "/base/datepicker", title: "Datepicker", type: "link" },
    //         { path: "/base/dropdown", title: "Dropdown", type: "link" },
    //         { path: "/base/modal", title: "Modal", type: "link" },
    //         { path: "/base/pagination", title: "Pagination", type: "link" },
    //         { path: "/base/popover", title: "Popover", type: "link" },
    //         { path: "/base/progressbar", title: "Progressbar", type: "link" },
    //         { path: "/base/rating", title: "Rating", type: "link" },
    //         { path: "/base/tabset", title: "Tabset", type: "link" },
    //         { path: "/base/timepicker", title: "Timepicker", type: "link" },
    //         { path: "/base/tooltip", title: "Tooltip", type: "link" },
    //         { path: "/base/typeahead", title: "Typeahead", type: "link" },
    //       ],
    //     },
    //     {
    //       title: "Advance",
    //       icon: "folder-plus",
    //       type: "sub",
    //       children: [
    //         { path: "/advance/scrollable", title: "Scrollable", type: "link" },
    //         { path: "/advance/dropzone", title: "Dropzone", type: "link" },
    //         { path: "/advance/sweetAlert2", title: "SweetAlert2", type: "link" },
    //         { path: "/advance/owl-carousel", title: "Owl Carousel", type: "link" },
    //         { path: "/advance/range-slider", title: "Range Slider", type: "link" },
    //         { path: "/advance/image-cropper", title: "Image cropper", type: "link" },
    //         { path: "/advance/sticky", title: "Sticky", type: "link" },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   title: "Icons",
    //   icon: "icons",
    //   type: "sub",
    //   active: false,
    //   children: [
    //     { path: "/icons/flag", title: "Flag icon", type: "link" },
    //     { path: "/icons/fontawesome", title: "Fontawesome Icon", type: "link" },
    //     { path: "/icons/ico", title: "Ico Icon", type: "link" },
    //     { path: "/icons/themify", title: "Themify Icon", type: "link" },
    //     { path: "/icons/feather", title: "Feather Icon", type: "link" },
    //     { path: "/icons/weather", title: "Weather Icon", type: "link" },
    //   ],
    // },
    // {
    //   title: "Buttons",
    //   icon: "button",
    //   type: "sub",
    //   active: false,
    //   children: [
    //     { path: "/buttons/default", title: "Default Style", type: "link" },
    //     { path: "/buttons/flat", title: "Flat Style", type: "link" },
    //     { path: "/buttons/edge", title: "Edge Style", type: "link" },
    //     { path: "/buttons/raised", title: "Raised Style", type: "link" },
    //     { path: "/buttons/group", title: "Button Group", type: "link" },
    //   ],
    // },
    // {
    //   title: "Charts",
    //   icon: "charts",
    //   type: "sub",
    //   active: false,
    //   children: [
    //     { path: "/chart/apex", title: "Apex Chart", type: "link" },
    //     { path: "/chart/google", title: "Google Chart", type: "link" },
    //     { path: "/chart/chartjs", title: "Chartjs Chart", type: "link" },
    //     { path: "/chart/chartist", title: "Chartist Chart", type: "link" },
    //   ],
    // },

    // {
    //   title: "Cards",
    //   icon: "layout",
    //   type: "sub",
    //   active: false,
    //   children: [
    //     { path: "/cards/basic", title: "Basic Card", type: "link" },
    //     { path: "/cards/creative", title: "Creative Card", type: "link" },
    //     { path: "/cards/tabbed", title: "Tabbed Card", type: "link" },
    //     { path: "/cards/dragable", title: "Draggable Card", type: "link" },
    //   ],
    // },
    // {
    //   headTitle1: "Pages",
    //   headTitle2: "All Neccesory Pages Added.",
    // },
    // { path: "/sample-page", title: "Sample Page", icon: "sample-page", type: "link" },
    // {
    //   title: "Others",
    //   icon: "others",
    //   type: "sub",
    //   children: [
    //     {
    //       title: "Error Pages",
    //       type: "sub",
    //       active: false,
    //       children: [
    //         { path: "/error-page/error-400", title: "Error400", type: "link" },
    //         { path: "/error-page/error-401", title: "Error401", type: "link" },
    //         { path: "/error-page/error-403", title: "Error403", type: "link" },
    //         { path: "/error-page/error-404", title: "Error404", type: "link" },
    //         { path: "/error-page/error-500", title: "Error500", type: "link" },
    //         { path: "/error-page/error-503", title: "Error503", type: "link" },
    //       ],
    //     },
    //     {
    //       title: "Authentication",
    //       type: "sub",
    //       active: false,
    //       children: [
          
    //         { path: "/authentication/login/image-two", title: "Login Image 2", type: "link" },
    //         { path: "/authentication/register/image-one", title: "Register Image 1", type: "link" },
    //         { path: "/authentication/unlock-user", title: "Unlock User", type: "link" },
    //         { path: "/authentication/forgot-password", title: "Forgot Password", type: "link" },
    //         { path: "/authentication/reset-password", title: "Reset Password", type: "link" },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   headTitle1: "Miscellaneous",
    //   headTitle2: "Bouns Pages & Apps.",
    // },
    // {
    //   title: "Blog",
    //   icon: "blog",
    //   type: "sub",
    //   active: false,
    //   children: [
    //     { path: "/blog/details", title: "Blog Details", type: "link" },
    //     { path: "/blog/single", title: "Single Blog", type: "link" },
    //     { path: "/blog/add-post", title: "Add Post", type: "link" },
    //   ],
    // },
    // { path: "/editor", title: "Editor", icon: "editors", type: "link" },
  ];

  // Array
  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}
