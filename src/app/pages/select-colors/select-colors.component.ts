import { Component, ViewChild, HostListener } from '@angular/core';
import * as tinycolor from 'tinycolor2';

@Component({
  selector: 'app-select-colors',
  templateUrl: './select-colors.component.html',
  styleUrls: ['./select-colors.component.scss']
})
export class SelectColorsComponent {

  @ViewChild('add-swatch') addSwatch: any;
  @ViewChild('mode-toggle') modeToggle: any;
  @ViewChild('color-indicator') colorIndicator: any;
  @ViewChild('user-swatches') userSwatches: any;

  @ViewChild('spectrum-canvas') spectrumCanvas: any;
  @ViewChild('spectrum-cursor') spectrumCursor: any;

  @ViewChild('hue-canvas') hueCanvas: any;
  @ViewChild('hue-cursor') hue_cursor: any;

  defaultColorPicker: string[] = [ '#FFFFFF', '#FFFB0D', '#0532FF', '#FF9300', '#00F91A', '#FF2700', '#000000', '#686868', '#EE5464', '#D27AEE', '#5BA8C4', '#E64AA9' ];

  swatches: any = null;

  spectrumCtx: any = null;
  spectrumRect: any = null;

  hueCtx: any = null;
  hueRect: any = null;

  currentColor: string = '';
  hue: number = 0;
  saturation: number = 1;
  lightness: number = .5;

  @ViewChild('rgb-fields') rgbFields: any;
  @ViewChild('hex-field') hexField: any;

  @ViewChild('red') red: any;
  @ViewChild('blue') blue: any;
  @ViewChild('green') green: any;
  @ViewChild('hex') hex: any;

  ngOnInit(){

    console.log(this.addSwatch)
    console.log(this.modeToggle)
    console.log(this.colorIndicator)
    console.log(this.userSwatches)
    console.log(this.spectrumCanvas)
    console.log(this.spectrumCursor)
    console.log(this.hueCanvas)
    console.log(this.hue_cursor)
    console.log(this.rgbFields)
    console.log(this.hexField)
    console.log(this.red)
    console.log(this.blue)
    console.log(this.green)
    console.log(this.hex)


    // this.swatches = document.getElementsByClassName('default-swatches')[0];

    // this.spectrumCtx = this.spectrumCanvas.getContext('2d');
    // this.spectrumRect = this.spectrumCanvas.getBoundingClientRect();

    // this.hueCtx = this.hueCanvas.getContext('2d');
    // this.hueRect = this.hueCanvas.getBoundingClientRect();
  }

  ColorPicker(){
    // this.addDefaultSwatches();
    // createShadeSpectrum();
    // createHueSpectrum();
  };

  createSwatch(target: any, color: any){
    var swatch = document.createElement('button');
    swatch.classList.add('swatch');
    swatch.setAttribute('title', color);
    swatch.style.backgroundColor = color;

    target.appendChild(swatch);
    this.refreshElementRects();
  };

  swatchClick(color: any){
    var color: any = tinycolor(color);
    this.colorToPos(color);
    this.setColorValues(color);
  }
  // ColorPicker.prototype.addDefaultSwatches = function() {
  //   for(var i = 0; i < this.defaultSwatches.length; ++i){
  //     createSwatch(swatches, this.defaultSwatches[i]);
  //   }
  // }

  refreshElementRects(){
    this.spectrumRect = this.spectrumCanvas.getBoundingClientRect();
    this.hueRect = this.hueCanvas.getBoundingClientRect();
  }

  createShadeSpectrum(color: any) {
    let canvas = this.spectrumCanvas;
    let ctx = this.spectrumCtx;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(!color) color = '#f00';
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var whiteGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    whiteGradient.addColorStop(0, "#fff");
    whiteGradient.addColorStop(1, "transparent");
    ctx.fillStyle = whiteGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var blackGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    blackGradient.addColorStop(0, "transparent");
    blackGradient.addColorStop(1, "#000");
    ctx.fillStyle = blackGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // canvas.addEventListener('mousedown', function(e: any){
    //   this.startGetSpectrumColor(e);
    // });
  };

  // @HostListener('mousedown', ['$event'])
  // onMousedown2(event: MouseEvent) {
  //   this.startGetSpectrumColor(event);
  // }

  createHueSpectrum() {
    var canvas = this.hueCanvas;
    var ctx = this.hueCtx;
    var hueGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    hueGradient.addColorStop(0.00, "hsl(0,100%,50%)");
    hueGradient.addColorStop(0.17, "hsl(298.8, 100%, 50%)");
    hueGradient.addColorStop(0.33, "hsl(241.2, 100%, 50%)");
    hueGradient.addColorStop(0.50, "hsl(180, 100%, 50%)");
    hueGradient.addColorStop(0.67, "hsl(118.8, 100%, 50%)");
    hueGradient.addColorStop(0.83, "hsl(61.2,100%,50%)");
    hueGradient.addColorStop(1.00, "hsl(360,100%,50%)");
    ctx.fillStyle = hueGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // canvas.addEventListener('mousedown', function(e){
    //   this.startGetHueColor(e);
    // });
  };

  // @HostListener('mousedown', ['$event'])
  // onMousedown(event: MouseEvent) {
  //   this.startGetHueColor(event);
  // }

  colorToHue(color: any){
    color = tinycolor(color);
    var hueString = tinycolor('hsl '+ color.toHsl().h + ' 1 .5').toHslString();
    return hueString;
  };

  colorToPos(color: any){
    color = tinycolor(color);
    var hsl = color.toHsl();
    this.hue = hsl.h;
    var hsv = color.toHsv();
    var x = this.spectrumRect.width * hsv.s;
    var y = this.spectrumRect.height * (1 - hsv.v);
    var hueY = this.hueRect.height - ((this.hue / 360) * this.hueRect.height);
    this.updateSpectrumCursor(x,y);
    this.updateHueCursor(hueY);
    this.setCurrentColor(color);
    this.createShadeSpectrum(this.colorToHue(color));
  };

  setColorValues(color: any){
    //convert to tinycolor object
    color = tinycolor(color);
    var rgbValues = color.toRgb();
    var hexValue = color.toHex();
    //set inputs
    this.red.value = rgbValues.r;
    this.green.value = rgbValues.g;
    this.blue.value = rgbValues.b;
    this.hex.value = hexValue;
  };

  setCurrentColor(color: any){
    color = tinycolor(color);
    this.currentColor = color;
    this.colorIndicator.style.backgroundColor = color;
    document.body.style.backgroundColor = color;
    this.spectrumCursor.style.backgroundColor = color;
    this.hue_cursor.style.backgroundColor = 'hsl('+ color.toHsl().h +', 100%, 50%)';
  };

  updateHueCursor(y: any, aux?: any){
    this.hue_cursor.style.top = y + 'px';
  }

  updateSpectrumCursor(x: any, y: any){
    //assign position
    this.spectrumCursor.style.left = x + 'px';
    this.spectrumCursor.style.top = y + 'px';
  };

  startGetSpectrumColor(e: any) {
    this.getSpectrumColor(e);
    this.spectrumCursor.classList.add('dragging');



    // @HostListener('mousemove', ['$event'])
    //   onMousemove(event: MouseEvent) {
    //   this.getSpectrumColor();
    // }

    // @HostListener('mouseup')
    // onMouseup() {
    //     this.endGetSpectrumColor();
    // }

    // window.addEventListener('mousemove', getSpectrumColor);
    // window.addEventListener('mouseup', endGetSpectrumColor);
  };

  // @HostListener('mousemove', ['$event'])
  // onMouseMove(event: MouseEvent) {
  //   this.getSpectrumColor(event);
  // }

  // @HostListener('mouseup', ['$event'])
  // onMouseup(event: MouseEvent) {
  //   this.endGetSpectrumColor(event);
  // }

  getSpectrumColor(e: any) {
    // got some help here - http://stackoverflow.com/questions/23520909/get-hsl-value-given-x-y-and-hue
    e.preventDefault();
    //get x/y coordinates
    var x = e.pageX - this.spectrumRect.left;
    var y = e.pageY - this.spectrumRect.top;
    //constrain x max
    if(x > this.spectrumRect.width){ x = this.spectrumRect.width}
    if(x < 0){ x = 0}
    if(y > this.spectrumRect.height){ y = this.spectrumRect.height}
    if(y < 0){ y = .1}
    //convert between hsv and hsl
    var xRatio = x / this.spectrumRect.width * 100;
    var yRatio = y / this.spectrumRect.height * 100;
    var hsvValue = 1 - (yRatio / 100);
    var hsvSaturation = xRatio / 100;
    this.lightness = (hsvValue / 2) * (2 - hsvSaturation);
    this.saturation = (hsvValue * hsvSaturation) / (1 - Math.abs(2 * this.lightness - 1));
    var color = tinycolor('hsl ' + this.hue + ' ' + this.saturation + ' ' + this.lightness);
    this.setCurrentColor(color);
    this.setColorValues(color);
    this.updateSpectrumCursor(x,y);
  };

  endGetSpectrumColor(e: any){
    this.spectrumCursor.classList.remove('dragging');
    window.removeEventListener('mousemove', this.getSpectrumColor);
  };

  startGetHueColor(e: any) {
    this.getHueColor(e);
    this.hue_cursor.classList.add('dragging');
    // window.addEventListener('mousemove', getHueColor);
    // window.addEventListener('mouseup', endGetHueColor);
  };

  // @HostListener('mousemove', ['$event'])
  // onMousemove(event: MouseEvent) {
  //   this.getHueColor(event);
  // }

  // @HostListener('mouseup', ['$event'])
  // onMouseup2(event: MouseEvent) {
  //   this.endGetSpectrumColor(event);
  // }

  getHueColor(e: any){
    e.preventDefault();
    var y = e.pageY - this.hueRect.top;
    if (y > this.hueRect.height){ y = this.hueRect.height};
    if (y < 0){ y = 0};
    var percent = y / this.hueRect.height;
    this.hue = 360 - (360 * percent);
    var hueColor: any = tinycolor('hsl '+ this.hue + ' 1 .5').toHslString();
    var color = tinycolor('hsl '+ this.hue + ' ' + this.saturation + ' ' + this.lightness).toHslString();
    this.createShadeSpectrum(hueColor);
    this.updateHueCursor(y, hueColor)
    this.setCurrentColor(color);
    this.setColorValues(color);
  };

  endGetHueColor(e: any){
    this.hue_cursor.classList.remove('dragging');
  };

  // @HostListener('mousemove', ['$event'])
  // onMousemove2(event: MouseEvent) {
  //   this.getHueColor(event)
  // }
}
