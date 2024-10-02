import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalysisRoutingModule } from './analysis-routing.module';
import { AnalysisComponent } from './analysis/analysis.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AnalysisRoutingModule,
    AnalysisComponent
  ]
})
export class AnalysisModule { }
