export interface ProyectoDoc {
  id: string
  data: Proyecto
}

export interface Proyecto {
  nombre: string
  codigo: string
  descripcion: string
  isActive: boolean
}
