import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {MainComponent} from './main/main.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {ChartsComponent} from './pages/charts/charts.component';

const routes: Routes = [
  {path: 'welcome-page', component: WelcomePageComponent},
  {path: 'main', component: MainComponent, /*canActivateChild: [AuthGuard],*/ children: [
          {path: 'charts', component: ChartsComponent},
          {path: 'dashboard', component: DashboardComponent},
          /*{path: 'charts', component: ChartsComponent},
          {path: 'budgets', component: BudgetsComponent},
          {path: 'accounts', component: AccountsComponent},
          {path: 'categories', component: CategoriesComponent}*/
        ]},
  {path: '**', redirectTo: '/welcome-page'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
