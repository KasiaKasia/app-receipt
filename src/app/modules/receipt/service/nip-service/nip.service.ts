import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class NipService {
  formatNip(event: Event, form: AbstractControl): void {
    const input = event.target as HTMLInputElement;
    let modifiedValue = input.value.replace(/-/g, '').replace(/\D/g, '');
    modifiedValue = modifiedValue.slice(0, 10);

    if (modifiedValue.length <= 3) {
      input.value = modifiedValue;
    } else if (modifiedValue.length <= 6) {
      input.value = `${modifiedValue.slice(0, 3)}-${modifiedValue.slice(3)}`;
    } else if (modifiedValue.length <= 8) {
      input.value = `${modifiedValue.slice(0, 3)}-${modifiedValue.slice(3, 6)}-${modifiedValue.slice(6)}`;
    } else {
      input.value = `${modifiedValue.slice(0, 3)}-${modifiedValue.slice(3, 6)}-${modifiedValue.slice(6, 8)}-${modifiedValue.slice(8, 10)}`;
    }

    form.get('nip')?.setValue(input.value, { emitEvent: false });
  }
}
