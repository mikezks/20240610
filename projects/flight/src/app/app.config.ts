import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AppRoutingModule } from "./app-routing.module";
import { routerFeature } from "./shared/logic-router-state";
import { SharedModule } from "./shared/shared.module";
import { UiCoreModule } from "./shared/ui-core/ui-core.module";


export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      AppRoutingModule,
      StoreModule.forRoot(),
      EffectsModule.forRoot(),
      StoreModule.forFeature(routerFeature),
      UiCoreModule,
      SharedModule
    ),
    provideHttpClient(
      withInterceptorsFromDi()
    )
  ]
};
