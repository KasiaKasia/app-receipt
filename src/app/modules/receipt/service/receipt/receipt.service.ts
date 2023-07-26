import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, share, tap } from 'rxjs';
import { Receipt } from '../../../../shared/models/interface-receipt';
import { Settings } from '../../../../shared/environments/settings';
import { User } from '../../../../shared/models/interface-user';
import { Response } from '../../../../shared/models/interface-response';
import { LoggerService } from '../../../../shared/logger/logger.service';


@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain' })
  };
  constructor(private httpClient: HttpClient,private logger: LoggerService ) {}
  
  public getListOfReceipts(userid?: Pick<User, 'userid'> | string): Observable<Receipt  | Response> {
     return this.httpClient.post<Receipt  | Response>(Settings.API_LIST_OF_RECEIPTS + `${userid}`, this.httpOptions).pipe(
      tap(listOfReceipts => this.logger.success('The receipts of the logged in user have been retrieved!' + listOfReceipts)), share()
    );
  }

  public addReceiptImage(receipt: Partial<Receipt>, userid: Pick<User, 'userid'>): Observable<any> {
    return this.httpClient.put<any>(Settings.API_ADD_RECEIPT_IMAGE + `${userid}`, receipt,  this.httpOptions)
  }
  public addReceipt(receipt: Partial<Receipt>, userid: Pick<User, 'userid'>): Observable<any> {
    return this.httpClient.put<any>(Settings.API_ADD_RECEIPT + `${userid}`, receipt,  this.httpOptions)
  }
}