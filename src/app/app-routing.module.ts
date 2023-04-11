import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ColorPickerComponent } from './pages/color-picker/color-picker.component';

const routes: Routes = [
  { path: '', redirectTo: 'picker', pathMatch: 'full' },
  { path: 'picker', component: ColorPickerComponent, },
  { path: '**', redirectTo: 'picker' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
