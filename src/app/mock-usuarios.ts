import { Usuario } from './usuario';

export const USUARIOS: Usuario[] = [
    {
        id: 1,
        email: "luis@menasl.com",
        password: "122",
        nombre: "luis",
        apellido: "mena",
        id_roles: 1,
        id_comercios: 1,
        created_at: new Date("2025-01-01 10:00:00"),
        updated_at: new Date("2025-01-01 10:00:00")
      },
      {
        id: 2,
        email: "luis2@menasl.com",
        password: "122",
        nombre: "luis2",
        apellido: "mena2",
        id_roles: 1,
        id_comercios: 1,
        created_at: new Date("2025-01-01 10:00:00"),
        updated_at: new Date("2025-01-01 10:00:00")
      },
];