export type CategoriaInsumo =
  | "descartables"
  | "medicamentos"
  | "curaciones"
  | "higiene"
  | "soluciones"
  | "otros";

export type EstadoStock = "normal" | "stock_bajo" | "sin_stock";

export type EstadoOC =
  | "pendiente"
  | "en_transito"
  | "recepcionada"
  | "cancelada";

export type EstadoRecepcion = "completa" | "parcial";

export interface InsumoItem {
  readonly id: string;
  readonly codigo: string; // ej: INS-001
  readonly nombre: string;
  readonly categoria: CategoriaInsumo;
  readonly presentacion: string; // ej: Caja x 100 u, Frasco x 1 L
  readonly stockActual: number;
  readonly stockMinimo: number;
  readonly estado: EstadoStock;
  readonly ubicacion: string;
  readonly precioCompraReferencia: number;
  readonly proveedorHabitualNombre: string;
  readonly ultimaCompraFecha: string;
  readonly notas?: string;
  readonly imagenUrl?: string;
}

export interface ProveedorItem {
  readonly id: string;
  readonly razonSocial: string;
  readonly cuit: string;
  readonly rubro: string;
  readonly telefono: string;
  readonly email: string;
  readonly direccion: string;
  readonly condicionPagoDias: number;
  readonly contactoComercial: string;
  readonly activo: boolean;
  readonly totalComprasMes?: number;
}

export interface OrdenCompraItem {
  readonly id: string;
  readonly numeroOrden: string; // ej: OC-00023
  readonly proveedorNombre: string;
  readonly fecha: string;
  readonly montoTotal: number;
  readonly estado: EstadoOC;
  readonly itemsCount?: number;
}

export interface RecepcionMercaderiaItem {
  readonly id: string;
  readonly fecha: string;
  readonly ordenCompraNumero: string;
  readonly proveedorNombre: string;
  readonly itemsContados: number;
  readonly estado: EstadoRecepcion;
}

export interface KpiStockSummary {
  readonly totalInsumos: number;
  readonly stockNormalConteo: number;
  readonly stockNormalPct: number;
  readonly stockBajoConteo: number;
  readonly stockBajoPct: number;
  readonly sinStockConteo: number;
  readonly sinStockPct: number;
  readonly consumoMes: number;
  readonly consumoMesTendenciaPct: number;
}

export interface KpiComprasSummary {
  readonly proveedoresActivos: number;
  readonly ordenesCompraConteo: number;
  readonly comprasMesMonto: number;
  readonly productosCompradosConteo: number;
  readonly gastoPromedioMonto: number;
}

export interface MetricaCategoriaStock {
  readonly categoria: CategoriaInsumo;
  readonly etiqueta: string;
  readonly porcentaje: number;
  readonly cantidad: number;
  readonly color: string;
}

export interface ConsumoInsumoHistorico {
  readonly mes: string;
  readonly consumoMonto: number;
  readonly comprasMonto: number;
  readonly tendenciaMonto: number;
}

export interface RubroGastoItem {
  readonly rubro: string;
  readonly monto: number;
  readonly porcentaje: number;
  readonly color: string;
}
