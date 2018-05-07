// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { LocationStrategy, HashLocationStrategy } from '@angular/common';
//
// import { AppComponent } from './app.component';
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import { TabsModule } from 'ngx-bootstrap/tabs';
// import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';
//
// import { ChartsModule } from 'ng2-charts/ng2-charts';
// import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
// import { AsideToggleDirective } from './shared/aside.directive';
// import { BreadcrumbsComponent } from './shared/breadcrumb.component';
//
// // Routing Module
// import { AppRoutingModule } from './app.routing';
//
// //Layouts
// import { FullLayoutComponent } from './layouts/full-layout.component';
// import { SimpleLayoutComponent } from './layouts/simple-layout.component';
//
// @NgModule({
//   imports: [
//     BrowserModule,
//     BrowserAnimationsModule,
//     AppRoutingModule,
//     BsDropdownModule.forRoot(),
//     TabsModule.forRoot(),
//     ChartsModule
//   ],
//   declarations: [
//     AppComponent,
//     FullLayoutComponent,
//     SimpleLayoutComponent,
//     NAV_DROPDOWN_DIRECTIVES,
//     BreadcrumbsComponent,
//     SIDEBAR_TOGGLE_DIRECTIVES,
//     AsideToggleDirective
//   ],
//   providers: [{
//     provide: LocationStrategy,
//     useClass: HashLocationStrategy
//   }],
//   bootstrap: [ AppComponent ]
// })
// export class AppModule { }


////
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {AppComponent} from './app.component';

// Import containers
import {
  FullLayout,
  SimpleLayout
} from './containers';

const APP_CONTAINERS = [
  FullLayout,
  SimpleLayout
]

// Import components
import {
  AppAside,
  AppBreadcrumbs,
  AppFooter,
  AppHeader,
  AppSidebar
} from './components';

const APP_COMPONENTS = [
  AppAside,
  AppBreadcrumbs,
  AppFooter,
  AppHeader,
  AppSidebar
]

// Import directives
import {
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  SIDEBAR_TOGGLE_DIRECTIVES
} from './directives';

const APP_DIRECTIVES = [
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  SIDEBAR_TOGGLE_DIRECTIVES
]

// Import routing module
import {AppRoutingModule} from './app.routing';

// Import 3rd party components
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {ModalModule} from 'ngx-bootstrap/modal';
import {CookiesStorageService, LocalStorageService, SessionStorageService, SharedStorageService} from 'ngx-store';
import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster/angular2-toaster';

// Import self components
import {StorageService} from './providers/storage.service';
import {AppCommonModule} from './components/app-common/app.common.module';
// import {ConfirmModalComponent} from './components/app-common/app-modal/confirm.modal.component';
import {AuthInterceptor} from './providers/authInterceptor';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    ModalModule.forRoot(),
    AppCommonModule,
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ...APP_COMPONENTS,
    ...APP_DIRECTIVES
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
    CookiesStorageService,
    LocalStorageService,
    SessionStorageService,
    SharedStorageService,
    StorageService,
    ToasterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
