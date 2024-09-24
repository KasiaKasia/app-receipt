import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { ReceiptComponent } from './pages/receipt/receipt.component';
import { GuardCanActivateCanDeactivateCanActivateChildCanLoadCanMatch } from 'src/app/shared/guards/guards.service';
import { ListReceiptsComponent } from './pages/list-receipts/list-receipts.component';
import { AddReceiptComponent } from './pages/add-receipt/add-receipt.component';
import { ListComponent } from './pages/list/list.component';
import { DetailsReceiptComponent } from './pages/details-receipt/details-receipt.component';

const routes: Routes = [{
  path: '',
  component: ReceiptComponent,
//  canActivateChild: [GuardCanActivateCanDeactivateCanActivateChildCanLoadCanMatch],
  children: [
    {
      path: 'list-of-receipts/:id',
      data: { title: 'Lista paragonów' },
      component:  ListReceiptsComponent
    }, {
      path: 'receipt-details/:id',
      data: { title: 'Szczegóły paragonu' },
      component: DetailsReceiptComponent //ListComponent //ReceiptListComponent
    }, {
      path: 'add-receipt/:id',
      data: { title: 'Dodaj paragon' },
      component: AddReceiptComponent,
      canActivate: [GuardCanActivateCanDeactivateCanActivateChildCanLoadCanMatch] 
   //   canActivate: mapToCanActivate ([GuardCanActivateCanDeactivateCanActivateChildCanLoadCanMatch]) 
    }, 
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceiptRoutingModule { }
