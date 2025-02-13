export interface Usuario {
    id: number;
    email: string;
    password: string;
    nombre: string;
    apellido: string;
    id_roles: number;
    id_comercios: number;
    created_at: Date;
    updated_at: Date;

  }