import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './sides/navbar/navbar.component';
import { SidebarComponent } from './sides/sidebar/sidebar.component';
import { AuthlayoutComponent } from './layouts/authlayout/authlayout.component';
import { UserlayoutComponent } from './layouts/userlayout/userlayout.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SearchComponent } from './pages/search/search.component';
import { BookingcalendarComponent } from './modals/bookingcalendar/bookingcalendar.component';
import { BookingdetailsComponent } from './modals/bookingdetails/bookingdetails.component';
import { RoomPlanningComponent } from './pages/home/room-planning/room-planning.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiConstants } from '../app/constantes/constantes';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    AuthlayoutComponent,
    UserlayoutComponent,
    HomeComponent,
    DashboardComponent,
    SearchComponent,
    BookingcalendarComponent,
    BookingdetailsComponent,
    RoomPlanningComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule, 
    ReactiveFormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgbModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [ApiConstants],
  bootstrap: [AppComponent],

  entryComponents: [
    BookingcalendarComponent,
    BookingdetailsComponent
  ]
})
export class AppModule { }
