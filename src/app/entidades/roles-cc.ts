export class RolesCC {
    rolesCC: Roles[];
    constructor () {
        this.rolesCC = Array( new Roles());
    }
}

export class Roles {
    id: number;
    nombre: string;
    cc: CentrosConsumo[];
    constructor () {
        this.id = 0;
        this.nombre = '';
        this.cc = [];
    }
}

export class CentrosConsumo {
    id: number;
    nombre: string;
    constructor () {
        this.id = 0;
        this.nombre = '';
    }
}
