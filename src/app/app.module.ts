import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './sides/navbar/navbar.component';
import { SidebarComponent } from './sides/sidebar/sidebar.component';
import { AuthlayoutComponent } from './layouts/authlayout/authlayout.component';
import { UserlayoutComponent } from './layouts/userlayout/userlayout.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SearchComponent } from './pages/search/search.component';
import { ResaDateComponent } from './pages/search/steps/resa-date/resa-date.component';
import { ResaRecurrenceComponent } from './pages/search/steps/resa-recurrence/resa-recurrence.component';
import { ResaResultatComponent } from './pages/search/steps/resa-resultat/resa-resultat.component';
import { BookingcalendarComponent } from './modals/bookingcalendar/bookingcalendar.component';
import { BookingdetailsComponent } from './modals/bookingdetails/bookingdetails.component';
import { ResaCaracteristiqueComponent } from './pages/search/steps/resa-caracteristique/resa-caracteristique.component';
 

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
    ResaDateComponent,
    ResaRecurrenceComponent,
    ResaResultatComponent,
    BookingcalendarComponent,
    BookingdetailsComponent,
    ResaCaracteristiqueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
