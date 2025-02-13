import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-cliente-detail',
  standalone: false,
  
  templateUrl: './cliente-detail.component.html',
  styleUrl: './cliente-detail.component.css'
})
export class ClienteDetailComponent {
 cliente: Cliente | undefined;
 constructor(
     private route: ActivatedRoute,
     private clienteService: ClienteService,
     private location: Location
   ) {}
ngOnInit(): void {
  this.getCliente();
}

getCliente(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.clienteService.getCliente(id)
    .subscribe(cliente => this.cliente = cliente);
}

goBack(): void {
  this.location.back();
}
save(): void {
  if (this.cliente) {
    this.clienteService.updateCliente(this.cliente)
      .subscribe(() => this.goBack());
  }
}

}
