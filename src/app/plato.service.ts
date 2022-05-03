import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Plato } from './plato';


@Injectable({
  providedIn: 'root'
})

export class PlatoService {

  private platosUrl = "http://192.168.93.179:45455/api/Alergenos/"


  httpOptions = {
    headers: new HttpHeaders({
      "content-type": "application/json"
    })
  };

  constructor(private http: HttpClient) { }


  getPlatos(hotel: string): Observable<Plato[]> {
    return this.http.get<Plato[]>(this.platosUrl + hotel)
  }


  /*getPlato(plato: string): Observable<Plato> {
    const url = `${this.platosUrl}+${plato}`;
    return this.http.get<Plato>(url);
  }

  searchPlatos(term: string): Observable<Plato[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Plato[]>(`${this.platosUrl}/?name=${term}`);
  }*/
}