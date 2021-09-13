/*
* Define la entidad categoria
*/
export class Categoria {
    id: number;
    nombre: string;
    icono: string;
    usuario_actualizo_id: number;
    fecha_creacion: string;
    usuario_creo_id: number;
    activo: number;
    clave_facto: string;

    constructor() {
        this.id = 0;
        this.nombre = '';
        this.icono = '';
        this.usuario_creo_id = 1;
        this.activo = 1;
        this.clave_facto = '';
    }
}
