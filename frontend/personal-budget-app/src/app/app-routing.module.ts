import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { SignupPageComponent } from './auth/signup-page/signup-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { AuthGuard } from './services/auth.guard';
import { ManageExpensesComponent } from './manage-expenses/manage-expenses.component';
import { WidgetComponent } from './widget/widget.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: WidgetComponent },
      {
        path: 'manage-expenses',
        component: ManageExpensesComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
