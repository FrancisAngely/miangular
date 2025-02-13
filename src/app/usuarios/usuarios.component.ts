import { Component,AfterViewInit, OnInit, TemplateRef, ViewChild,ChangeDetectorRef } from '@angular/core';
import { Usuario } from '../usuario';
import {USUARIOS} from '../mock-usuarios';
import { UsuarioService } from '../usuario.service';
import { MessageService } from '../message.service';
import { DataTablesModule } from "angular-datatables";
import { DataTablesResponse } from '../datatables-response';

import { Config } from "datatables.net";
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { IDemoNgComponentEventType } from '../ng-template-ref-event-type';
import { NgTemplateRefComponent } from '../ng-template-ref/ng-template-ref.component';

import { ADTSettings,  } from '../settings';

@Component({
  selector: 'app-usuarios',
  standalone: false,
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit, AfterViewInit {
  usuarios: Usuario[] = [];

  


  constructor(private http: HttpClient,private usuarioService: UsuarioService, private messageService: MessageService, private ngTemplateRefComponent: NgTemplateRefComponent, private DataTablesModule: DataTablesModule) {}
  message = '';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  /*getUsuarios(): void {
    this.usuarioService.getUsuarios()
        .subscribe(usuarios => this.usuarios = usuarios);
  }^/
  /*ngOnInit(): void {
    this.getUsuarios();
  }*/
  usuario: Usuario = {
    id: 1,
    email: "luis@menasl.com",
    password: "123",
    nombre: "Luis",
    apellido: "Mena",
    id_roles: 1,
    id_comercios: 1,
    created_at: new Date("2025-01-01 00-00-00"),
    updated_at: new Date("2025-01-01 00-00-00")
  };

 /* usuarios = USUARIOS;*/
  selectedUsuario?: Usuario;
  onSelect(usuario: Usuario): void {
    this.selectedUsuario = usuario;
    this.messageService.add(`UsuariosComponent: Selected usuario id=${usuario.id}`);
  }




  dtOptions: Config = {};
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>();
  @ViewChild('demoNg') demoNg: TemplateRef<NgTemplateRefComponent>|undefined;
  columns: Array<any> = [];

  ngOnInit(): void {
    setTimeout(() => {
      const self = this;
    this.dtOptions = {
      serverSide: true, // Set the flag
      ajax: (dataTablesParameters: any, callback) => {
        this.http.post<DataTablesResponse>("http://localhost:8080/usuarios/datatable", dataTablesParameters, {}).subscribe((resp) => {
          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: resp.data,
          });
        });
      },
      columns: [
        {
          title: "ID",
          data: "id",
        },
        {
          title: "First name",
          data: "nombre",
        },
        {
          title: "Apellido",
          data: "apellido",
        },
        {
          title: 'Actions',
          data: null,
          defaultContent: '',
         /* ngTemplateRef: {
            ref: self.demoNg,
            context: {
              // needed for capturing events inside <ng-template>
              captureEvents: self.onCaptureEvent.bind(self)
            }
          }*/
        }
      ],
    };
  });

  
  }

  ngAfterViewInit() {
    setTimeout(() => {
      // race condition fails unit tests if dtOptions isn't sent with dtTrigger
      this.dtTrigger.next(this.dtOptions);
    }, 200);
  }

  onCaptureEvent(event: IDemoNgComponentEventType) {
    //this.message = `Event '${event.cmd}' with data '${JSON.stringify(event.data)}`;
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

/**
   * Populate the table with new data based on the page number
   * @param page The page to select
   */


}
