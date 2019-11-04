import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserlayoutComponent } from './layouts/userlayout/userlayout.component';
import { AuthlayoutComponent } from './layouts/authlayout/authlayout.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SearchComponent } from './pages/search/search.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  {path: 'login', component: AuthlayoutComponent},


  {path: '',
   component: UserlayoutComponent,
  children: [
    {path: 'accueil', component: AppComponent},
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'search', component: SearchComponent},
  ]},
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
