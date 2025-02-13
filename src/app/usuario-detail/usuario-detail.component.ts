import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


import {Usuario} from '../usuario';
import { UsuarioService } from '../usuario.service';
@Component({
  selector: 'app-usuario-detail',
  standalone: false,
  
  templateUrl: './usuario-detail.component.html',
  styleUrl: './usuario-detail.component.css'
})
export class UsuarioDetailComponent {
  //@Input() usuario?: Usuario;

  usuario: Usuario | undefined;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getUsuario();
  }

  getUsuario(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.usuarioService.getUsuario(id)
      .subscribe(usuario => this.usuario = usuario);
  }

  goBack(): void {
    this.location.back();
  }
  /*save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }*/
}
