import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-receipt',
  standalone: true,
  imports: [],
  templateUrl: './details-receipt.component.html',
  styleUrl: './details-receipt.component.scss'
})
export class DetailsReceiptComponent {
  roleId = this.activatedRoute.snapshot.paramMap.get('id') as string;
constructor(private activatedRoute: ActivatedRoute){}
}
