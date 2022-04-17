import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { IfStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../Interface/gifs.interfaces';

@Injectable({
  providedIn: 'root' //<-- 'root' indica que el servicio va a ser usado en cualquier lugar de la app.
})
export class GifsService {

  private apiKey      : string    = 'MR4XePujsqUiXmXtYOvO04v009SwvDS2';
  private servicioUrl : string    = 'https://api.giphy.com/v1/gifs';
  private _historial  : string[]  = [];
  public resultados   : Gif[]     = [];

  get historial()
  {
    return [...this._historial];
  }

  constructor( private http:HttpClient ){
    
    this._historial = JSON.parse( localStorage.getItem('historial') !) || [];
    //Son lineas que hacen lo mismo.
    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse( localStorage.getItem('historial') !);
    // }
    
    this.resultados = JSON.parse( localStorage.getItem('resultado') !) || [];      
  }

  buscarGifs(query:string){

    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) { //Si lo que quiero ingresar NO EXISTE dentro de mi array, lo agrega.
      this._historial.unshift( query );      
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial))
    }

    const params = new HttpParams()
      .set('api_key',this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{ params })
    .subscribe( ( response ) => {
      //console.log(response.data);
      this.resultados = response.data;

      localStorage.setItem('resultado', JSON.stringify(this.resultados))
    } )

  }
}
