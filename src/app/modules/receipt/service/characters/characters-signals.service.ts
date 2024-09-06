import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CharactersSignalsService {

  characters: WritableSignal<string> = signal<string>('');

  setCharacters(text: string) {
    this.characters.set(text)
  }

  getCharacters(): string {
    return this.characters()
  }
}
