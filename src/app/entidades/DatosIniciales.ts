import { Usuario } from './usuario';

export class DatosIniciales {
    usuario: Usuario;
    roles_acceso: RolesAcceso[];
    corporativos: Corporativos[];
    funcionalidades: Array<{clave: string; valor: string}>;
}

class RolesAcceso {
    rol_id: number;
    nombre_rol: string;
    centro_consto_acceso: CentroCostoAcceso[];

}

class CentroCostoAcceso {
    centro_consumo_identificador: string;
    centro_consumo: string;
    sucursal: string;
}

export class Corporativos {
    nombre: string;
    identificador: string;
    contribuyentes: Contribuyentes[];
    sucursales: Sucursales[];
}

class Contribuyentes {
    nombre: string;
    identificador: string;
    centro_costo: string;
}

class CentroCostos {
    nombre: string;
    identificador: string;
}

class Sucursales {
    nombre: string;
    identificador: string;
    centro_costo: string;
}
