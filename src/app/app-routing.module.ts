import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ColorPickerComponent } from './pages/color-picker/color-picker.component';
import { FontSizeComponent } from './pages/font-size/font-size.component';

const routes: Routes = [
  { path: '', component: HomeComponent, },
  // { path: '', redirectTo: 'picker', pathMatch: 'full' },
  { path: 'picker', component: ColorPickerComponent, },
  { path: 'font-size', component: FontSizeComponent, },
  { path: '**', redirectTo: 'picker' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
