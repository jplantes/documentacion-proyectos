export interface DocTecnico {
  titulo: string;
  cuerpo: string;
  autor: string;
  tipo: string;
  editBy?: string;
  createtAt?: string;
  updateAt?: string;
}

export interface docGroup {
  tipo: Tipo
  docs: docWithId[]
}

export interface docWithId {
  id: string
  data: DocTecnico
}

export enum Tipo {
  MODULO = 'modulo',
  ENDPOINT = 'end-point',
  COMPONENTE = 'componente',
  SERVICIO = 'servicio',
  GENEARL = 'general',
}