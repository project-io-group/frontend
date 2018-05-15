import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {BackendServicesProxy} from "./remote/backend.services.proxy";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable()
export class MailService {

  constructor(private backendServicesProxy: BackendServicesProxy, private http: HttpClient) {
  }

  getPossibleRecipients(): Observable<string[]> {
    return Observable.of(['devteam'])
  }

  getPossibleSubjects(): Observable<string[]> {
    return Observable.of(['test'])
  }

  sendMail(mail: Mail): Observable<Object> {
    const emailRequest = this.backendServicesProxy.createRequestURL("/email");
    return this.http.post(emailRequest, "", {
      params: new HttpParams()
        .append("recipient", mail.recipient)
        .append("subject", mail.subject)
        .append("content", mail.message),
    });
  }

}

export class Mail {
  constructor(
    public recipient: string,
    public subject: string,
    public message: string,
  ) {
  }
}
