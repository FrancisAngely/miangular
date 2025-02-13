import { Component, ViewChild } from '@angular/core';

import {FormsModule} from '@angular/forms';
import { Hero } from '../hero';
import {HEROES} from '../mock-heroes';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { SweetAlert2Module, SwalComponent, SwalPortalTarget } from '@sweetalert2/ngx-sweetalert2'


@Component({
  standalone: false,
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent {
  
  selectedHero?: Hero;
  heroes: Hero[] = [];
  constructor(private heroService: HeroService, private messageService: MessageService) { }
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
        
  }
  
  ngOnInit(): void {
    this.getHeroes();
  }
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  
      @ViewChild('confirmDialog') confirmDialog: SwalComponent | any;
      @ViewChild('swal1') respuestaDialog: SwalComponent | any;

      async delete(hero: Hero) {
        const resp = await this.confirmDialog.fire();
        
        if(resp.isConfirmed) {
        // Borra el producto
        
        this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
        const respo2= await this.respuestaDialog.fire();
        
        }}
}
