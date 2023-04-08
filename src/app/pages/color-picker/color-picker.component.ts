import { Component, AfterContentChecked } from '@angular/core'

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent implements AfterContentChecked {
  hue: string = '#1c7bc2';
  color: string = 'rgba(28,123,194,1)';

  ngOnInit(){
    this.hue = localStorage.getItem('_hue_') || '#1c7bc2';
    this.color = localStorage.getItem('_color_') || 'rgba(28,123,194,1)';
  }

  ngAfterContentChecked(){
    localStorage.setItem('_hue_', this.hue)
    localStorage.setItem('_color_', this.color)
  }
}
