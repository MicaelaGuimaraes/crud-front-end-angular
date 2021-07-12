import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'
import { UserListComponent } from './components/user-list/user-list.component';
import { UserComponent } from './components/user/user.component'
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ToastrModule } from 'ngx-toastr';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CdkTableModule } from '@angular/cdk/table';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthComponent } from './components/auth/auth.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './services/auth-guard.service';
import { RouterModule } from '@angular/router';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

export function token() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserComponent,
    AuthComponent,
  ],
  imports: [
    FormsModule,
    MatTooltipModule,
    BrowserModule,
    ReactiveFormsModule,
    CdkTableModule,
    BrowserModule,
    MatCheckboxModule,
    MatProgressBarModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(options),
    JwtModule.forRoot({
      config: {
        tokenGetter: token
      }
    }),
    RouterModule.forRoot([
      {
        path: "",
        component: AuthComponent
      },
      {
        path: "login",
        component: AuthComponent
      },
      {
        path: "home",
        component: UserListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "user/new",
        component: UserComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "user/update/:id",
        component: UserComponent,
        canActivate: [AuthGuard]
      }
    ]),
  ],
  providers: [AuthGuard],

  bootstrap: [AppComponent]
})
export class AppModule { }
