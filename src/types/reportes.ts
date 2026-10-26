export type CategoriaReporte =
  | "clinica"
  | "infraestructura"
  | "finanzas"
  | "suministros";

export type PeriodoFiltro =
  | "hoy"
  | "semana"
  | "mes"
  | "ano"
  | "personalizado";

export interface ReporteCatalogoItem {
  readonly id: string; // ej: REP-01
  readonly numero: number;
  readonly titulo: string;
  readonly categoria: CategoriaReporte;
  readonly categoriaEtiqueta: string;
  readonly queMuestra: string;
  readonly utilidadNegocio: string;
  readonly iconName: string;
  readonly badge?: string;
}

export interface FiltroReporteParams {
  readonly periodo: PeriodoFiltro;
  readonly categoria: "todos" | CategoriaReporte;
  readonly busqueda: string;
  readonly fechaDesde?: string;
  readonly fechaHasta?: string;
}

export interface ResumenEjecutivoStrip {
  readonly turnosTotales: number;
  readonly porcentajeAsistenciaGlobal: number;
  readonly facturacionTotal: number;
  readonly egresosTotales: number;
  readonly margenRentabilidadPct: number;
}

export interface ColumnaReporte {
  readonly key: string;
  readonly label: string;
  readonly align?: "left" | "center" | "right";
  readonly isMono?: boolean;
}

export interface ReportePreviewData {
  readonly reporteId: string;
  readonly titulo: string;
  readonly categoria: CategoriaReporte;
  readonly periodoTexto: string;
  readonly columnas: readonly ColumnaReporte[];
  readonly filas: readonly Readonly<Record<string, string | number>>[];
  readonly totales?: Readonly<Record<string, string | number>>;
}
