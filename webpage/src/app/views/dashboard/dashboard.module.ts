import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


// Notifications
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ToasterModule
  ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule { }
