import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BackendServicesProxy} from './remote/backend.services.proxy';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class MailService {

  constructor(private backendServicesProxy: BackendServicesProxy, private http: HttpClient) {
  }

  sendMail(mail: Mail): Observable<Object> {
    const emailRequest = this.backendServicesProxy.createRequestURL('/email');
    return this.http.post(emailRequest, '', {
      params: new HttpParams()
        .append('subject', mail.subject)
        .append('content', mail.message),
    });
  }

}

export class Mail {
  constructor(
    public subject: string,
    public message: string,
  ) {
  }
}
