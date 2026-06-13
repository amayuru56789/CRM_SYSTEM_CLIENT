import {inject, Injectable} from '@angular/core';
import {Customer, CustomerRequest, CustomerStatus} from '../../models/customer';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {map, Observable} from 'rxjs';

export interface PageResponse<T> {
  content:       T[];
  page:          number;
  size:          number;
  totalElements: number;
  totalPages:    number;
  last:          boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data:    T;
}

export interface CustomerFilter {
  search?:     string;
  status?:     CustomerStatus;
  assignedTo?: number;
  page?:       number;
  size?:       number;
  sortBy?:     string;
}


@Injectable({
  providedIn: 'root',
})
export class CustomerService {

  private http = inject(HttpClient);
  private url  = `${environment.apiUrl}/customers`;

  getAll(filter: CustomerFilter = {}): Observable<PageResponse<Customer>> {
    let params = new HttpParams();

    if (filter.search)     params = params.set('search',     filter.search);
    if (filter.status)     params = params.set('status',     filter.status);
    if (filter.assignedTo) params = params.set('assignedTo', filter.assignedTo);

    params = params.set('page',   filter.page   ?? 0);
    params = params.set('size',   filter.size   ?? 10);
    params = params.set('sortBy', filter.sortBy ?? 'createdAt');

    return this.http
      .get<ApiResponse<PageResponse<Customer>>>(this.url, { params })
      .pipe(map(res => res.data));
  }

  getById(id: number): Observable<Customer> {
    return this.http
      .get<ApiResponse<Customer>>(`${this.url}/${id}`)
      .pipe(map(res => res.data));
  }

  create(request: CustomerRequest): Observable<Customer> {
    return this.http
      .post<ApiResponse<Customer>>(this.url, request)
      .pipe(map(res => res.data));
  }

  update(id: number, request: CustomerRequest): Observable<Customer> {
    return this.http
      .put<ApiResponse<Customer>>(`${this.url}/${id}`, request)
      .pipe(map(res => res.data));
  }

  delete(id: number): Observable<void> {
    return this.http
      .delete<ApiResponse<void>>(`${this.url}/${id}`)
      .pipe(map(() => void 0));
  }

}
