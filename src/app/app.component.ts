import {Component} from '@angular/core';
import { HeroesComponent } from './heroes/heroes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //imports: [FontAwesomeModule], // alternatively, individual components can be imported
})
export class AppComponent {
  title = 'Admin';
  title2 = 'Admin 2';
  faCoffee = faCoffee;

}

