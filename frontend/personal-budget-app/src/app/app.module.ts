import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { TokenService } from './services/token.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ManageExpensesComponent } from './manage-expenses/manage-expenses.component';
import { WidgetComponent } from './widget/widget.component';
// import { TokenWarningComponent } from './auth/token-warning/token-warning.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DashboardPageComponent,
    SidebarComponent,
    ManageExpensesComponent,
    WidgetComponent,
    // TokenWarningComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 10,
      progressBar: true,
      positionClass: 'toast-bottom-right',
    }),
    NgxDatatableModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthService, AuthGuard, TokenService],
  bootstrap: [AppComponent],
})
export class AppModule {}