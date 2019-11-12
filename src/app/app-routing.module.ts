import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserlayoutComponent } from './layouts/userlayout/userlayout.component';
import { AuthlayoutComponent } from './layouts/authlayout/authlayout.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SearchComponent } from './pages/search/search.component';
import { HomeComponent } from './pages/home/home.component';
import { RoomPlanningComponent } from './pages/home/room-planning/room-planning.component';


const routes: Routes = [
  {
    path: 'login',
    component: AuthlayoutComponent
  },
 {
    path: '',
    component: UserlayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'planning/:id',
        component: RoomPlanningComponent
      },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'search', component: SearchComponent },
    ]
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
