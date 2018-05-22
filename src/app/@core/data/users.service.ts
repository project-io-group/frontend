import {Injectable} from '@angular/core';
import 'rxjs/add/observable/of';
import {NbAuthJWTToken, NbAuthService} from '@nebular/auth';
import {BehaviorSubject, Observable} from '@angular/cli/node_modules/rxjs';


@Injectable()
export class UserService {

  private _currentUser: BehaviorSubject<any>;

  constructor(private authService: NbAuthService) {
    this._currentUser = new BehaviorSubject<any>('');
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this._currentUser.next(token.getPayload().sub); // here we receive a payload from the token and assigne it to our `user` variable
        }
      });
  }

  get currentUser(): Observable<any> {
    return this._currentUser.asObservable();
  }
}
