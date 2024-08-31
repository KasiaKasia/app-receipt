import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DashboardHeadingComponent } from './components/dashboard-heading/dashboard-heading.component';
import { CardComponent } from './components/card/card.component';
import { ModalContentComponent } from './components/modal/modal-content/modal-content.component';
import { ModalContainerComponent } from './components/modal/modal-container/modal-container.component';
import { DynamicTokenComponent } from './components/dynamic-token/dynamic-token.component';
import { DynamicTokenOutdatedComponent } from './components/dynamic-token-outdated/dynamic-token-outdated.component';
import { LoggerDebugService, LoggerService } from './logger/logger.service';


@NgModule({
  declarations: [
    ModalContentComponent, 
    DynamicTokenComponent,
    DynamicTokenOutdatedComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    CardComponent,
    DashboardHeadingComponent,
    ModalContainerComponent,
  ],
  exports: [
    ModalContentComponent,
    DynamicTokenComponent,
    DynamicTokenOutdatedComponent
  ],
  providers:[
    {
      provide: LoggerService,
      useClass: LoggerDebugService,
    }
  ]
})
export class SharedModule {}
