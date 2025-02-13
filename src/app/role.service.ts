import { Injectable } from '@angular/core';
import { Role } from './role';

import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private rolesUrl = 'http://localhost:8080/roles';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient,
    private messageService: MessageService) { }

     getRoles(): Observable<Role[]> {
          
          return this.http.get<Role[]>(this.rolesUrl)
          .pipe ( map ( ( respuesta : any ) => respuesta.roles ) ) ;
          
        }

        /** PUT: update the hero on the server */
        updateRoles(roles: Role): Observable<any> {
          const id=roles.id;
          const url = `${this.rolesUrl}/${id}`;
          return this.http.put(url, roles, this.httpOptions)
          .pipe(
            tap(_ => this.log(`updated roles id=${roles.id}`)),
            catchError(this.handleError<any>('updateRoles'))
          );
        }
        log(arg0: string): void {
          throw new Error('Method not implemented.');
        }
        handleError<T>(arg0: string): (err: any, caught: Observable<Object>) => import("rxjs").ObservableInput<any> {
          throw new Error('Method not implemented.');
        }
        
        /** POST: add a new hero to the server */
        addRole(roles: Role): Observable<Role> {
          return this.http.post<Role>(this.rolesUrl, roles, this.httpOptions)
          .pipe ( map ( ( respuesta : any ) => respuesta.role ) ) ;
 
        }

        
        /** DELETE: delete the hero from the server */
        deleteRole(id: number): Observable<Role> {
          const url = `${this.rolesUrl}/${id}`;
        
          return this.http.delete<Role>(url, this.httpOptions).pipe(
            tap(_ => this.log(`deleted roles id=${id}`)),
            catchError(this.handleError<Role>('deleteRole'))
          );
        }
}
