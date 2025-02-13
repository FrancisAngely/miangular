import { Component,Input } from '@angular/core';
import { Localidad } from '../localidad';
@Component({
  selector: 'app-localidad-detail',
  standalone: false,
  
  templateUrl: './localidad-detail.component.html',
  styleUrl: './localidad-detail.component.css'
})
export class LocalidadDetailComponent {
 //localidad: Localidad | undefined;
 @Input() localidad?: Localidad;
}
