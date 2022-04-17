import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  get historial(){
    return this.giftService.historial;
  }

  constructor(private giftService:GifsService) { }

  buscar(argumento:string){
    this.giftService.buscarGifs(argumento);
  }

}
