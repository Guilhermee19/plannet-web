import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconDirective } from './directives/icon.directive';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SelectColorsComponent } from './pages/select-colors/select-colors.component';
import { ToDoListComponent } from './pages/to-do-list/to-do-list.component';
import { ColorPickerComponent } from './pages/color-picker/color-picker.component';
import { ColorSliderComponent } from './pages/color-picker/color-slider/color-slider.component';
import { ColorPaletteComponent } from './pages/color-picker/color-palette/color-palette.component';

@NgModule({
  declarations: [
    AppComponent,
    IconDirective,
    HomeComponent,
    NavbarComponent,
    SelectColorsComponent,
    ToDoListComponent,
    ColorPickerComponent,
    ColorSliderComponent,
    ColorPaletteComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule
  ],
  providers: [
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
