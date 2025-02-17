import { Component,Input } from '@angular/core';
import { Localidad } from '../localidad';
import { ActivatedRoute } from '@angular/router';
import { LocalidadService } from '../localidad.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-localidad-detail',
  standalone: false,
  
  templateUrl: './localidad-detail.component.html',
  styleUrl: './localidad-detail.component.css'
})
export class LocalidadDetailComponent {
  //localidad: Localidad | undefined;
  //@Input() localidad?: Localidad;
  localidad: Localidad | undefined;
  constructor(
   private route: ActivatedRoute,
   private localidadService: LocalidadService,
   
 ) {}
 
  ngOnInit(): void {
   this.getLocalidad();
 }
 getLocalidad(): void {
   const id = Number(this.route.snapshot.paramMap.get('id'));
   this.localidadService.getLocalidad(id)
     .subscribe(localidad => this.localidad = localidad);
 }
 }