export class EnviarAcuse {
  public factura: FacturaDgt;
  public cliente: Cliente;
}

export class FacturaDgt {
     public clave: string;
     public cedula_emisor: string;
     public respuestaMensaje: string;
     public total_comprobante: string;
     public cedula_receptor: string;
     public detalleMensaje: string;
     public serie: string;
     public receptor_tipo_identificacion: string;
     public clave_facto: string;
     public tipo_timbrado: string;

     constructor() {
      this.clave = '';
      this.cedula_emisor = '';
      this.respuestaMensaje = '';
      this.total_comprobante = '';
      this.cedula_receptor = '';
      this.detalleMensaje = '';
      this.serie = '';
      this.clave_facto = '';
      this.tipo_timbrado = '';

    }
}



export class Cliente {
  public username: string;
  public password: string;
  public key_name: string;
  constructor() {
    this.username = '';
    this.password = '';
    this.key_name = '';
  }
}
