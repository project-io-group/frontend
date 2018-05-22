import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NbAuthModule, NbEmailPassAuthProvider} from '@nebular/auth';
import {NbRoleProvider, NbSecurityModule} from '@nebular/security';
import {of as observableOf} from 'rxjs/observable/of';

import {throwIfAlreadyLoaded} from './module-import-guard';
import {DataModule} from './data/data.module';
import {AnalyticsService} from './utils/analytics.service';
import {AppConfig} from '../app.config';


const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  ...NbAuthModule.forRoot({
    providers: {
      email: {
        service: NbEmailPassAuthProvider,
        config: {
          delay: 3000,
          baseEndpoint: AppConfig.API_ENDPOINT,
          token: {
            key: 'token', // this parameter tells Nebular where to look for the token
          },
          login: {
            endpoint: '/login',
            method: 'post',
          },
          register: {
            endpoint: '/sign-up',
            method: 'post',
          },
        },
      },
    },
    forms: {
      login: {},
      register: {},
    },
  }).providers,
  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,
  {
    provide: NbRoleProvider,
    useValue: {
      getRole: () => {
        return observableOf('guest'); // here you could provide any role based on any auth flow
      },
    },
  },
  AnalyticsService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
