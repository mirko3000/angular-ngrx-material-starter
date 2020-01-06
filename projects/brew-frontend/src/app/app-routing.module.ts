import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'beans',
    loadChildren: () =>
      import('./features/beans/beans.module').then(m => m.BeansModule)
  },
  {
    path: 'grind',
    loadChildren: () =>
      import('./features/grind/grind.module').then(m => m.GrindModule)
  },
  {
    path: 'brew',
    loadChildren: () =>
      import('./features/brew/brew.module').then(m => m.BrewModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
