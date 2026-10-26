export type EstadoFacturaCobro =
  | "al_dia"
  | "por_vencer"
  | "hoy_vence"
  | "vencida"
  | "cobrada";

export type MedioPago =
  | "efectivo"
  | "transferencia"
  | "tarjeta"
  | "cheque";

export interface CuentaBancariaSaldo {
  readonly id: string;
  readonly nombre:
    | "Caja principal"
    | "Banco Santander"
    | "Banco Macro"
    | "Caja chica";
  readonly saldoActual: number;
}

export interface MovimientoTesoreria {
  readonly id: string;
  readonly fecha: string;
  readonly tipo: "ingreso" | "egreso";
  readonly concepto: string;
  readonly categoria: string;
  readonly origenODestino: string; // Nombre de paciente o proveedor
  readonly monto: number;
  readonly medioPago: MedioPago;
  readonly estado: "Cobrado" | "Pagado";
}

export interface FacturaCobroItem {
  readonly id: string;
  readonly numeroFactura: string; // ej: FAC-00123
  readonly pacienteId: string;
  readonly pacienteNombre: string;
  readonly concepto: string;
  readonly especialidad?: string;
  readonly montoOriginal: number;
  readonly fechaEmision: string; // YYYY-MM-DD
  readonly fechaVencimiento: string; // YYYY-MM-DD
  readonly diasAtraso: number; // Negativo si falta vencer, positivo si venció
  readonly interesCalculado: number;
  readonly totalACobrar: number;
  readonly estado: EstadoFacturaCobro;
}

export interface ParametrosCalculoMora {
  readonly montoOriginal: number;
  readonly fechaVencimiento: string;
  readonly fechaReferencia?: string; // Por defecto hoy
  readonly tasaMensualPct?: number; // Por defecto 2.0
}

export interface ResultadoCalculoMora {
  readonly diasAtraso: number;
  readonly interes: number;
  readonly totalACobrar: number;
  readonly estado: EstadoFacturaCobro;
}

export interface KpiTesoreriaSummary {
  readonly ingresosTotales: number;
  readonly ingresosTendenciaPct: number;
  readonly egresosTotales: number;
  readonly egresosTendenciaPct: number;
  readonly resultadoMes: number;
  readonly rentabilidadPct: number;
  readonly cuentasPorCobrarMonto: number;
  readonly cuentasPorCobrarComprobantes: number;
  readonly cuentasPorPagarMonto: number;
  readonly cuentasPorPagarComprobantes: number;
}

export interface KpiCobranzasSummary {
  readonly totalPorCobrar: number;
  readonly totalFacturas: number;
  readonly vencidasMonto: number;
  readonly vencidasFacturas: number;
  readonly porVencerMonto: number;
  readonly porVencerFacturas: number;
  readonly alDiaMonto: number;
  readonly alDiaFacturas: number;
}

export interface DistribucionEgresoItem {
  readonly categoria: string;
  readonly porcentaje: number;
  readonly monto: number;
  readonly color: string;
}

export interface ResumenCategoriaIngresoItem {
  readonly categoria: string;
  readonly porcentaje: number;
  readonly monto: number;
  readonly color: string;
}

export interface EvolucionFinancieraMes {
  readonly mes: string;
  readonly ingresos: number;
  readonly egresos: number;
  readonly resultado: number;
}

export interface AntiguedadSaldoItem {
  readonly tramo: string;
  readonly dias: string;
  readonly porcentaje: number;
  readonly monto: number;
  readonly color: string;
}
