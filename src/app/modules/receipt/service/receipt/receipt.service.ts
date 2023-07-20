import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, share, tap } from 'rxjs';
import { Receipt } from '../../../../shared/models/interface-receipt';
import { Settings } from '../../../../shared/environments/settings';
import { User } from 'src/app/shared/models/interface-user';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private httpClient: HttpClient) {}
  
  public getListOfReceipts(userid?: Pick<User, 'userid'> | string): Observable<Receipt[]> {
     return this.httpClient.post<Receipt[]>(Settings.BASE_END_POINT + `/receipt/get-list-of-receipt/${userid}`, this.httpOptions).pipe(
      tap(listOfReceipts => console.log('The receipts of the logged in user have been retrieved!' + listOfReceipts)), share()
    );
  }

  public addReceipt(receipt: Partial<Receipt>, userid: Pick<User, 'userid'>): Observable<any> {
    return this.httpClient.put<any>(Settings.BASE_END_POINT + `/receipt/add-receipt/${userid}`, receipt,  this.httpOptions)
  }
}