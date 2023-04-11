import { Component, AfterContentChecked } from '@angular/core'
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent implements AfterContentChecked {

  constructor(private snackbarService: SnackbarService){}

  hux: string = '#0d77d5d2';

  arrayColors: any = [];
  selectedColor: any;

  ngOnInit(){
    this.hux = localStorage.getItem('_hux_') || '#0d77d5d2';
    if(localStorage.getItem('_arrayColors_')){
      this.arrayColors = JSON.parse(localStorage.getItem('_arrayColors_') || `['#0d77d5d2']`) || ['#0d77d5d2'];
    }
  }

  ngAfterContentChecked(){
    localStorage.setItem('_hux_', this.hux)
  }

  copiarColor() {
    const elementoTemporario = document.createElement("textarea");
    elementoTemporario.value = this.hux;
    document.body.appendChild(elementoTemporario);
    elementoTemporario.select();
    document.execCommand("copy");
    document.body.removeChild(elementoTemporario);
    this.snackbarService.info('Copiado!')
  }

  setColors(event: any){
    this.hux = event;
  }

  selectColors(event: any){
    this.selectedColor = event.color;

    if(event.slider == "hue"){
      let cursor = document.getElementsByClassName('cursor')
      if(cursor && cursor.length > 1){
        let curso: any = cursor.item(1) as HTMLDivElement;
        curso.style.background = event.color;
      }
    }
  }

  saveColor(){
    this.arrayColors.push(this.hux)
    localStorage.setItem('_arrayColors_', JSON.stringify(this.arrayColors))
    this.snackbarService.info('Cor Salva!')
  }
}
