import { provideHttpClient, withInterceptors, withInterceptorsFromDi, withRequestsMadeViaParent } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { routerFeature } from "./shared/logic-router-state";
import { SharedModule } from "./shared/shared.module";
import { UiCoreModule } from "./shared/ui-core/ui-core.module";
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading } from "@angular/router";
import { APP_ROUTES } from "./app.routes";
import { provideConfigState } from "./shared/util-config";
import { authInterceptor } from "./shared/logic-communication/http-interceptors/auth.interceptor";


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES,
      withPreloading(PreloadAllModules),
      withComponentInputBinding()
    ),
    provideHttpClient(
      withInterceptors([authInterceptor]),
      // withRequestsMadeViaParent()
      // withInterceptorsFromDi()
    ),
    provideConfigState('./assets/config.state.json'),
    importProvidersFrom(
      StoreModule.forRoot(),
      EffectsModule.forRoot(),
      StoreModule.forFeature(routerFeature),
      UiCoreModule,
      SharedModule
    ),
  ]
};
