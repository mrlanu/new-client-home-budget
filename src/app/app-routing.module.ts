import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {MainComponent} from './main/main.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {BarChartComponent} from './pages/charts/bar-chart/bar-chart.component';
import {LineChartComponent} from './pages/charts/line-chart/line-chart.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  {path: 'welcome-page', component: WelcomePageComponent},
  {path: 'main', component: MainComponent, canActivateChild: [AuthGuard], children: [
          {path: 'charts/income-vs-expenses', component: BarChartComponent},
          {path: 'charts/spent-by-category', component: LineChartComponent},
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
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
