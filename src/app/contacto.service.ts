import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Contacto } from './contacto';
@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private Url = 'http://localhost:8080/contactos';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

 getContactos(): Observable<Contacto[]> {
         
         return this.http.get<Contacto[]>(this.Url)
         .pipe ( map ( ( respuesta : any ) => respuesta.contactos ) ) ;
         
       }

  addContacto(contacto: Contacto): Observable<Contacto> {
    return this.http.post<Contacto>(this.Url, contacto, this.httpOptions)
    .pipe ( map ( ( respuesta : any ) => respuesta.contacto ) ) ;
  
  }

  getContacto(id: number): Observable<Contacto> {
    const url = `${this.Url}/${id}`;
    return this.http.get<Contacto>(url)
    .pipe ( map ( ( respuesta : any ) => respuesta.contacto ) ) ;
}

updateContacto(contacto: Contacto): Observable<any> {
  const id=contacto.id;
  const url = `${this.Url}/${id}`;
  return this.http.put(url, contacto, this.httpOptions);
}
deleteContacto(id: number): Observable<Contacto> {
  const url = `${this.Url}/${id}`;

  return this.http.delete<Contacto>(url, this.httpOptions);
}
}
