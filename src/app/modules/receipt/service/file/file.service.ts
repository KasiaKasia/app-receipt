import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { share, takeLast } from 'rxjs';
import { Settings } from 'src/app/shared/environments/settings';

@Injectable({
  providedIn: 'root'
})
export class FileService {
 
  constructor(private http: HttpClient) { }
  upload(formData: FormData) {
    return this.http.post(Settings.BASE_END_POINT + `/upload`, formData,   {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      takeLast(1), // jeśli jest właczone nie widać progress-bar, bo strumień pobrany ostatni
      share())
  }
}
