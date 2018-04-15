import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from 'selenium-webdriver/http';
import { AppConfig } from '../app.config';


let BACKEND_URL = AppConfig.API_ENDPOINT;

@Injectable()
export class BackendServicesProxy {
  constructor(private http: HttpClient) {}

  public delete(servicePath: string): Observable<HttpResponse>{
    return this.http.delete(this.createRequestURL(servicePath)).share();
  }

  public get(servicePath: string): Observable<HttpResponse> {
    return this.http.get(this.createRequestURL(servicePath)).share();
  }

  public post(servicePath: string, data: any = {}): Observable<HttpResponse> {
    return this.http.post(this.createRequestURL(servicePath), data).share();
  }

  public put(servicePath: string, data: any = {}): Observable<HttpResponse> {
    return this.http.put(this.createRequestURL(servicePath), data).share();
  }

  public createRequestURL(servicePath: string): string {
    return BACKEND_URL + servicePath;
  }
}
