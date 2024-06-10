import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { APP_ROUTES } from "./app.routes";
import { authInterceptor } from "./shared/logic-communication/http-interceptors/auth.interceptor";
import { routerFeature } from "./shared/logic-router-state";
import { SharedModule } from "./shared/shared.module";
import { UiCoreModule } from "./shared/ui-core/ui-core.module";
import { provideConfigState } from "./shared/util-config";


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
