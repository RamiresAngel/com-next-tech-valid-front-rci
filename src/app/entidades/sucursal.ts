export class Sucursal {

    public id: number;
    public nombre: string;
    public ubicacion_provincia: string;
    public ubicacion_canton: string;
    public ubicacion_distrito: string;
    public ubicacion_barrio: string;
    public ubicacion_otras_senas: string;
    public codigo_pais: string;
    public activo: number;
    public corporativo_id: number;
    public usuario_creo_id: number;
    public usuario_actualizo_id: number;
    public fecha_creacion: Date;
    public num_telefonico: string;
    public ubicacion_provincia_nombre: string;
    public ubicacion_canton_nombre: string;
    public ubicacion_distrito_nombre: string;
    public ubicacion_barrio_nombre: string;
}

export class ConfiguracionBuzzon {
    id: number;
    host: string;
    puerto: string;
    ssl: number;
    usuario: string;
    password: string;
    carpeta: string;
    identificador_sucursal: string;
    activo: number;
    correo: string;

    constructor() {
        this.id = 0;
        this.host = '';
        this.puerto = '';
        this.ssl = 0;
        this.usuario = '';
        this.password = '';
        this.carpeta = '';
        this.identificador_sucursal = '';
        this.activo = 1;
        this.correo = '';
    }
}
