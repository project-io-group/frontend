import { BackendServicesProxy } from './remote/backend.services.proxy';
import { NgModule } from '@angular/core';
import { VMService } from './vm_service/vm_service';
import { HttpClientModule } from '@angular/common/http';

const OWN_PROVIDERS = [
  BackendServicesProxy,
  VMService,
];

const OWN_COMPONENTS = [];

@NgModule({
  imports: [
    HttpClientModule,
  ],
  exports: [
    ...OWN_COMPONENTS,
  ],
  declarations: [
    ...OWN_COMPONENTS,
  ],
  providers: [
    ...OWN_PROVIDERS,
  ],
})
export class ServicesModule {
}
