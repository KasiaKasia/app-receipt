import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { ReceiptComponent } from './pages/receipt/receipt.component';
import { GuardCanActivateCanDeactivateCanActivateChildCanLoadCanMatch } from 'src/app/shared/guards/guards.service';
import { ReceiptListComponent } from './pages/receipt-list/receipt-list.component';
import { ReceiptAdditionComponent } from './pages/receipt-addition/receipt-addition.component';
import { ListComponent } from './pages/list/list.component';

const routes: Routes = [{
  path: '',
  component: ReceiptComponent,
//  canActivateChild: [GuardCanActivateCanDeactivateCanActivateChildCanLoadCanMatch],
  children: [
    {
      path: 'list-of-receipts/:id',
      data: { title: 'Lista paragonów' },
      component:  ReceiptListComponent
    }, {
      path: 'list/:id',
      data: { title: 'Lista paragonów' },
      component: ListComponent //ReceiptListComponent
    }, {
      path: 'add-receipt/:id',
      data: { title: 'Dodaj paragon' },
      component: ReceiptAdditionComponent
   //   canActivate: mapToCanActivate ([GuardCanActivateCanDeactivateCanActivateChildCanLoadCanMatch]) 
    }, 
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceiptRoutingModule { }
