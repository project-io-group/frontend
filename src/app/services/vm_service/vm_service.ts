import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { VMPool } from './vm_pool';
import { BackendServicesProxy } from '../remote/backend.services.proxy';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class VMService {

  constructor(private backendServicesProxy: BackendServicesProxy, private http: HttpClient) {
  }

  getVMPools(): Observable<VMPool[]> {
    return this.http.get<VMPool[]>(this.backendServicesProxy.createRequestURL('/vm/'))
  }
}
