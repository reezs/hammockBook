import {NgModule} from '@angular/core'
import { Routes,RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'books',
        children: [
          {
            path: '',
            loadChildren: '../books/books.module#BooksPageModule'
          }
        ]
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            loadChildren: '../users/users.module#UsersPageModule'
          }
        ]
      },
      {
        path: 'favorites',
        children: [
          {
            path: '',
            loadChildren: '../favorites/favorites.module#FavoritesPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/books',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/books',
    pathMatch: 'full'
  }
];
@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class TabsPageRoutingModule {}