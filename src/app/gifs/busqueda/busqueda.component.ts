import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  //txtBuscar! al agregarle el ! le decimos a typescript que el elemento siempre va a existir y va a tener un valor no nulo.
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>; //Hacemos referencia al elemento 'txtBuscar' del html

  constructor (private gifsService: GifsService){

  }

  buscar(){

    const valor = this.txtBuscar.nativeElement.value; //Obtenemos el valor del elemento.

    if (valor.trim().length == 0) {
      return;
    }

    this.gifsService.buscarGifs(valor);

    this.txtBuscar.nativeElement.value = '';

  }

}
