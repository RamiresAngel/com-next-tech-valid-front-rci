export class Comunicado {
  public id: number;
  public nombre: string;
  public header: string;
  public foother: string;
  public body: string;
  public identificador_integrador: string;
  public identificador: string;
  public tags: Array<Tags>;

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.header = '';
    this.foother = '';
    this.body = '';
    this.identificador_integrador = '';
    this.identificador = '';
    this.tags = new Array<Tags>();
  }
}

export class Tags {
  public id: number;
  public tag: string;
  public id_comunicado: number;

  constructor(tag: string) {
    this.id = 0;
    this.tag = '';
    this.id_comunicado = 0;
  }
}

export class Notificacion {
  public identificador_corporativo: string;
  public asunto: string;
  public destinatarios: string;
  public destinatarios_cc: string;
  public destinatarios_co: string;
  public mensaje: string;
  public all_users: string;
  public all_providers: string;
  public archivos_adjuntos: Array<FileNotificacion>;
}

export class FileNotificacion {
  public archivo_base_64: string;
  public archivo_nombre: string;
}

export class UploadAdapter {
  private loader;
  constructor(loader: any) {
    this.loader = loader;
    console.log(this.readThis(loader.file));
  }

  public upload(): Promise<any> {
    return this.readThis(this.loader.file);
  }
  readThis(file: File): Promise<any> {
    console.log(file);
    const imagePromise: Promise<any> = new Promise((resolve, reject) => {
      const myReader: FileReader = new FileReader();
      myReader.onloadend = (e) => {
        const image = myReader.result;
        console.log(image);
        return { default: 'data:image/png;base64,' + image };
        // resolve();
      };
      myReader.readAsDataURL(file);
    });
    return imagePromise;
  }

}
