import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { Contacto } from '../contacto';
import { ContactoService } from '../contacto.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-contacto-detail',
  standalone: false,
  
  templateUrl: './contacto-detail.component.html',
  styleUrl: './contacto-detail.component.css'
})
export class ContactoDetailComponent {
  contacto: Contacto | undefined;
  constructor(
      private route: ActivatedRoute,
      private contactoService: ContactoService,
      private location: Location
    ) {}
 ngOnInit(): void {
   this.getContacto();
 }
 
 getContacto(): void {
   const id = Number(this.route.snapshot.paramMap.get('id'));
   this.contactoService.getContacto(id)
     .subscribe(contacto => this.contacto = contacto);
 }
 
 goBack(): void {
   this.location.back();
 }
 save(): void {
   if (this.contacto) {
     this.contactoService.updateContacto(this.contacto)
       .subscribe(() => this.goBack());
   }
 }
}
