import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReceiptSignalsService {

  recipt: WritableSignal<any[]> = signal<any[]>([]);

  setRecipt(recipt: any[]) {
    this.recipt.set(recipt)
  }

  getRecipt(): any[] {
    return this.recipt()
  } 
}
