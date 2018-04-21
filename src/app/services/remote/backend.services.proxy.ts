import { Injectable } from '@angular/core';
import { AppConfig } from '../../app.config';

const BACKEND_URL = AppConfig.API_ENDPOINT;

@Injectable()
export class BackendServicesProxy {
  public createRequestURL(servicePath: string): string {
    return BACKEND_URL + servicePath;
  }
}
