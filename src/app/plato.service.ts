import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Plato } from './plato';


@Injectable({
  providedIn: 'root'
})

export class PlatoService {

  public _platosArray!: Plato[]

  //private platosUrl = "https://alergenosapiviva.azurewebsites.net/api/Alergenos/"
  private platosUrl = "https://localhost:7183/api/Alergenos/"

  httpOptions = {
    headers: new HttpHeaders({
      "content-type": "application/json"
    })
  };

  constructor(private http: HttpClient) { }


  getPlatos(hotel: string): Observable<Plato[]> {
    this.http.get<Plato[]>(this.platosUrl + hotel).subscribe({
      next: (platos) => { 
        this._platosArray = platos
      },
    });
    return this.http.get<Plato[]>(this.platosUrl + hotel)
  }

}