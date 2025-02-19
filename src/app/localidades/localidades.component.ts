import { Component, ViewChild } from '@angular/core';
import {LOCALIDADES} from '../mock-localidades';
import { Localidad } from '../localidad';
import { LocalidadService } from '../localidad.service';
import { MessageService } from '../message.service';
import { Config } from 'datatables.net';
import { DataTablesResponse } from '../datatables-response';
import { HttpClient } from '@angular/common/http';
import { SweetAlert2Module,SwalComponent,SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { Renderer2 } from '@angular/core';  
import { ActivatedRoute, Router } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCoffee, faStar as faStarSolid,faDownload,faTrash,faPenToSquare  } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-localidades',
  standalone: false,
  
  templateUrl: './localidades.component.html',
  styleUrl: './localidades.component.css'
})
export class LocalidadesComponent {
  selectedLocalidad?: Localidad;
  localidades: Localidad[] = [];
  faTrash=faTrash;
  faPenToSquare=faPenToSquare;

  icono = `<fa-icon class="ng-fa-icon" size="xs">
  <svg 
    aria-hidden="true" data-prefix="`+this.faTrash.prefix+`" data-icon="`+this.faTrash.iconName+`"
    class="svg-inline--fa fa-`+this.faTrash.iconName+`" role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 `+this.faTrash.icon[0]+` `+this.faTrash.icon[1]+`">
    <path fill="currentColor" d="`+this.faTrash.icon[4]+`"></path></svg></fa-icon>
  `;
  iconoEdit = `<fa-icon class="ng-fa-icon" size="xs">
  <svg 
    aria-hidden="true" data-prefix="`+this.faPenToSquare.prefix+`" data-icon="`+this.faPenToSquare.iconName+`"
    class="svg-inline--fa fa-`+this.faPenToSquare.iconName+`" role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 `+this.faPenToSquare.icon[0]+` `+this.faPenToSquare.icon[1]+`">
    <path fill="currentColor" d="`+this.faPenToSquare.icon[4]+`"></path></svg></fa-icon>
  `;
  constructor(private localidadService: LocalidadService, private messageService: MessageService, private http: HttpClient, private renderer: Renderer2, private router: Router) { }

  getLocalidades(): void {
    this.localidadService.getLocalidades()
      .subscribe(localidades => this.localidades = localidades);
        
  }

  dtOptions: Config = {};
  ngOnInit(): void {
    this.getLocalidades();
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      order: [0, 'desc'],
      processing: true,
      //serverSide: true, // Set the flag
      language: {
        "decimal": "",
        "emptyTable": "No hay información",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
        "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
        "infoFiltered": "(Filtrado de _MAX_ total entradas)",
        "infoPostFix": "",
        "thousands": ",",
        "lengthMenu": "Mostrar _MENU_ Entradas",
        "loadingRecords": "Cargando...",
        "processing": "Procesando...",
        "search": "Buscar:",
        "zeroRecords": "Sin resultados encontrados",
        "paginate": {
            "first": "Primero",
            "last": "Ultimo",
            "next": "Siguiente",
            "previous": "Anterior"
        }
    },
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<DataTablesResponse>(
            'http://localhost:8080/localidades/datatable',
            dataTablesParameters, {}
          ).subscribe((resp: DataTablesResponse) => {
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: resp.data
            });
          });
      },
      columns: [{
        title: 'ID',
        data: 'id'
      }, {
        title: 'id_provincias',
        data: 'id_provincias'
      }, {
        title: 'localidad',
        data: 'localidad'
      }
      , {
        title: 'cp',
        data: 'cp'
      }
      , {
        title: 'activo',
        data: 'activo'
      },
      {
        title: 'Eliminar',
        data: null,
        render: (data: any, type: any, row: any) => {
          return `<div class="d-flex">
                    <div>
                    <button class="btn btn-danger action-btn" style="width:40px">`+this.icono+`</button>
                  </div>
                  <div>&nbsp;</div>
                  <div> 
                    <button class="btn btn-primary actionEdit-btn" style="width:40px">`+this.iconoEdit+`</button>
                  </div>
                  </div>`
                  
                  
                  ;
        },
        className: 'action-column'
      }
      ],
      rowCallback: (row: Node, data: any, index: number) => {
        // Cast row to HTMLElement to access querySelector
      const rowElement = row as HTMLElement;
      const Id=data.id| 0;
        // Ensure the last cell (Actions column) is styled
        const actionCell = rowElement.querySelector('td:last-child');
        if (actionCell) {
          actionCell.setAttribute(
            'style',
            'display: flex; justify-content: center; '
          );
        }
        // Find the button in the row and attach a click listener using Renderer2
        const actionButton = rowElement.querySelector('.action-btn');
        if (actionButton) {
          this.renderer.listen(actionButton, 'click', () => {
            this.eliminar(rowElement,Id);
            console.log('Eliminar:', data); // Log the data for the clicked row
          });
        }

        const actionButtonEdit = rowElement.querySelector('.actionEdit-btn');
        if (actionButtonEdit) {
          this.renderer.listen(actionButtonEdit, 'click', () => {
            this.router.navigate(['/localidades/detail/'+Id]);
            console.log('Editar:', data); // Log the data for the clicked row
          });
        }
        return row;
      }
    };


  }

  onSelect(localidad: Localidad): void {
    this.selectedLocalidad = localidad;
  }
@ViewChild('confirmDialog') confirmDialog: SwalComponent | any;
  @ViewChild('swal1') respuestaDialog: SwalComponent | any;
  async  eliminar(rowElement: HTMLElement, dataId: number) {
    const resp =  await this.confirmDialog.fire();
      if(resp.isConfirmed) {
        this.localidadService.deleteLocalidad(dataId).subscribe();     
        const resp2 = await  this.respuestaDialog.fire();  
        rowElement.remove();  
      }
  }
}

