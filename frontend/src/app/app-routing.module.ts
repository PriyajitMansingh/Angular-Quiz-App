import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { AppComponent } from './app.component';
import { CardListComponent } from './card-list/card-list.component';

const routes: Routes = [
   { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
  path: 'card-list',
  component: CardListComponent,
  canActivate: [AuthGuard]
},

  // default entry
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
