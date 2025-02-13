import { Component, ViewChild } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente';
import { MessageService } from '../message.service';

import {FormsModule} from '@angular/forms';
import {SwalComponent, SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2'

@Component({
  selector: 'app-clientes',
  standalone: false,
  
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {
clientes: Cliente[] = [];
  constructor(private clienteService: ClienteService) { }

  getClientes(): void {
    this.clienteService.getClientes()
      .subscribe(clientes => this.clientes = clientes);
        
  }

  ngOnInit(): void {
    this.getClientes();
  }

  add(nombre: string,apellidos:string): void {
    nombre = nombre.trim();
    apellidos = apellidos.trim();
      if (!nombre) { return; }
      this.clienteService.addCliente({ nombre,apellidos } as Cliente)
        .subscribe(cliente => {
          this.clientes.push(cliente);
        });
    }

          @ViewChild('confirmDialog') confirmDialog: SwalComponent | any;
          @ViewChild('swal1') respuestaDialog: SwalComponent | any;
    
          async delete(cliente:Cliente) {
            const resp = await this.confirmDialog.fire();
            
            if(resp.isConfirmed) {
            // Borra el producto
            
            if (cliente) {
             this.clientes = this.clientes.filter(h => h !== cliente);
              this.clienteService.deleteCliente(cliente.id).subscribe();
            }
            const respo2= await this.respuestaDialog.fire();
            
            }}





}
