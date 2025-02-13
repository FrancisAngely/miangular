import { Component, ViewChild } from '@angular/core';
import { ContactoService } from '../contacto.service';
import { Contacto } from '../contacto';
import { MessageService } from '../message.service';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module, SwalComponent, SwalPortalTarget } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-contactos',
  standalone: false,
  templateUrl: './contactos.component.html',
  styleUrl: './contactos.component.css'
})
export class ContactosComponent {
  contactos: Contacto[] = [];
  selectedContacto: Contacto | undefined;

  constructor(private contactoService: ContactoService, private messageService: MessageService) { }

  getContactos(): void {
    this.contactoService.getContactos()
      .subscribe(contactos => this.contactos = contactos);
  }

  ngOnInit(): void {
    this.getContactos();
  }

  onSelect(contacto: Contacto): void {
    this.selectedContacto = contacto;
    this.messageService.add(`ContactosComponent: Selected contacto id=${contacto.id}`);
  }

  add(nombre: string, email: string, asunto: string, mensaje: string): void {
    nombre = nombre.trim();
    email = email.trim();
    asunto = asunto.trim();
    mensaje = mensaje.trim();
    if (!nombre) { return; }
    this.contactoService.addContacto({ nombre, email, asunto, mensaje } as Contacto)
      .subscribe(contacto => {
        this.contactos.push(contacto);
      });
  }

  texto: any;

  @ViewChild('confirmDialog') confirmDialog: SwalComponent | any;
  @ViewChild('swal1') respuestaDialog: SwalComponent | any;
  async delete(contacto: Contacto) {
    this.texto = "Contato de:" + contacto.email;
    const resp = await this.confirmDialog.fire();

    if (resp.isConfirmed) {
      // Borra el producto
      this.contactos = this.contactos.filter(h => h !== contacto);
      this.contactoService.deleteContacto(contacto.id).subscribe();
      const respo2 = await this.respuestaDialog.fire();
    }
  }
}