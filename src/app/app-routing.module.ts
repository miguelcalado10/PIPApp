import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/public/login/login.module#LoginPageModule' },
  // { path: 'dashboard', loadChildren: './private/dashboard/dashboard.module#DashboardPageModule' },
  {
    path: 'private',
    canActivate: [AuthGuardService],
    loadChildren: './pages/private/private-routing.module#PrivateRoutingModule'
  }
];

@NgModule({
  imports: [
    // RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
