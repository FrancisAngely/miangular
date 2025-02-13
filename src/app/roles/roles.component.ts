import { Component, ViewChild } from '@angular/core';
import { Role } from '../role';
import { FormsModule } from '@angular/forms';

import { RoleService } from '../role.service';
import { MessageService } from '../message.service';
import { SweetAlert2Module, SwalComponent, SwalPortalTarget } from '@sweetalert2/ngx-sweetalert2'


@Component({
  selector: 'app-roles',
  standalone: false,
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {

  selectedRole?: Role;

  roles: Role[] = [];
  constructor(private roleService: RoleService, private messageService: MessageService) { }


  getRoles(): void {
    this.roleService.getRoles()
      .subscribe(roles => this.roles = roles);

  }

  ngOnInit(): void {
    this.getRoles();
  }

  onSelect(roles: Role): void {
    this.selectedRole = roles;
    this.messageService.add(`RolesComponent: Selected roles id=${roles.id}`);
  }
  

  add(role: string): void {
    role = role.trim();
      if (!role) { return; }
      this.roleService.addRole({ role } as Role)
        .subscribe(role => {
          this.roles.push(role);
        });
    }

  @ViewChild('confirmDialog') confirmDialog: SwalComponent | any;
  @ViewChild('swal1') respuestaDialog: SwalComponent | any;

  async delete(roles: Role) {
    const resp = await this.confirmDialog.fire();

    if (resp.isConfirmed) {
      // Borra el producto

      this.roles = this.roles.filter(h => h !== roles);
      this.roleService.deleteRole(roles.id).subscribe();
      const respo2 = await this.respuestaDialog.fire();

    }
  }
}
   







