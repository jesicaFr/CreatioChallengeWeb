import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateAccountPayload, PagedResult } from '../dto/account.dto';

@Injectable({ providedIn: 'root' })
export class CreatioAccountsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/Accounts';

  getAccounts(page: number, pageSize: number, search: string): Observable<PagedResult> {
    const params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize)
      .set('search', search.trim());

    return this.http.get<PagedResult>(this.apiUrl, { params });
  }

  createAccount(payload: CreateAccountPayload): Observable<unknown> {
    return this.http.post(this.apiUrl, payload);
  }
}