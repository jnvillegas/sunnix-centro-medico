import {
  CuentaBancariaSaldo,
  MovimientoTesoreria,
  FacturaCobroItem,
  KpiTesoreriaSummary,
  KpiCobranzasSummary,
  DistribucionEgresoItem,
  ResumenCategoriaIngresoItem,
  EvolucionFinancieraMes,
  AntiguedadSaldoItem,
} from "@/types/finanzas";
import { calcularInteresMora } from "@/lib/utils/mora";

export const MOCK_TESORERIA_KPIS: KpiTesoreriaSummary = {
  ingresosTotales: 12450000,
  ingresosTendenciaPct: 12,
  egresosTotales: 7320000,
  egresosTendenciaPct: 6,
  resultadoMes: 5130000,
  rentabilidadPct: 41,
  cuentasPorCobrarMonto: 2850000,
  cuentasPorCobrarComprobantes: 24,
  cuentasPorPagarMonto: 1940000,
  cuentasPorPagarComprobantes: 15,
};

export const MOCK_CUENTAS_BANCOS: readonly CuentaBancariaSaldo[] = [
  {
    id: "cta-01",
    nombre: "Caja principal",
    saldoActual: 1250000,
  },
  {
    id: "cta-02",
    nombre: "Banco Santander",
    saldoActual: 3480000,
  },
  {
    id: "cta-03",
    nombre: "Banco Macro",
    saldoActual: 2150000,
  },
  {
    id: "cta-04",
    nombre: "Caja chica",
    saldoActual: 320000,
  },
];

export const MOCK_MOVIMIENTOS_INGRESOS: readonly MovimientoTesoreria[] = [
  {
    id: "mov-in-01",
    fecha: "12/05/2025 11:30",
    tipo: "ingreso",
    concepto: "Cobro Consulta Médica General",
    categoria: "Consultas médicas",
    origenODestino: "Ana Torres",
    monto: 35000,
    medioPago: "transferencia",
    estado: "Cobrado",
  },
  {
    id: "mov-in-02",
    fecha: "12/05/2025 10:15",
    tipo: "ingreso",
    concepto: "Anticipo Cirugía Traumatológica",
    categoria: "Cirugías",
    origenODestino: "Carlos Mendoza",
    monto: 220000,
    medioPago: "tarjeta",
    estado: "Cobrado",
  },
  {
    id: "mov-in-03",
    fecha: "11/05/2025 16:45",
    tipo: "ingreso",
    concepto: "Abono Membresía Plan Familiar",
    categoria: "Membresías",
    origenODestino: "Valentina Gómez",
    monto: 65000,
    medioPago: "transferencia",
    estado: "Cobrado",
  },
  {
    id: "mov-in-04",
    fecha: "11/05/2025 14:00",
    tipo: "ingreso",
    concepto: "Ecocardiograma Doppler Color",
    categoria: "Estudios",
    origenODestino: "Lucas Benítez",
    monto: 75000,
    medioPago: "efectivo",
    estado: "Cobrado",
  },
  {
    id: "mov-in-05",
    fecha: "10/05/2025 09:20",
    tipo: "ingreso",
    concepto: "Control Post-Operatorio",
    categoria: "Consultas médicas",
    origenODestino: "Sofía Gómez Torres",
    monto: 28000,
    medioPago: "tarjeta",
    estado: "Cobrado",
  },
];

export const MOCK_MOVIMIENTOS_EGRESOS: readonly MovimientoTesoreria[] = [
  {
    id: "mov-eg-01",
    fecha: "12/05/2025 09:00",
    tipo: "egreso",
    concepto: "Compra Insumos Descartables OC-00023",
    categoria: "Insumos médicos",
    origenODestino: "Droguería del Norte S.A.",
    monto: 450000,
    medioPago: "transferencia",
    estado: "Pagado",
  },
  {
    id: "mov-eg-02",
    fecha: "11/05/2025 18:00",
    tipo: "egreso",
    concepto: "Honorarios Médicos Quincenales",
    categoria: "Sueldos y honorarios",
    origenODestino: "Dra. Laura García",
    monto: 680000,
    medioPago: "transferencia",
    estado: "Pagado",
  },
  {
    id: "mov-eg-03",
    fecha: "10/05/2025 15:30",
    tipo: "egreso",
    concepto: "Alquiler Sede Consultorios Central",
    categoria: "Servicios y alquileres",
    origenODestino: "Inmobiliaria Mitre S.A.",
    monto: 550000,
    medioPago: "transferencia",
    estado: "Pagado",
  },
  {
    id: "mov-eg-04",
    fecha: "09/05/2025 11:15",
    tipo: "egreso",
    concepto: "Mantenimiento Preventivo Quirófano",
    categoria: "Mantenimiento",
    origenODestino: "BioIngeniería Sanitaria",
    monto: 180000,
    medioPago: "cheque",
    estado: "Pagado",
  },
  {
    id: "mov-eg-05",
    fecha: "08/05/2025 10:00",
    tipo: "egreso",
    concepto: "Licencia Sistema Gestión y Hosting",
    categoria: "Gastos administrativos",
    origenODestino: "Sunnix Software Cloud",
    monto: 120000,
    medioPago: "tarjeta",
    estado: "Pagado",
  },
];

export const MOCK_DISTRIBUCION_EGRESOS: readonly DistribucionEgresoItem[] = [
  { categoria: "Insumos médicos", porcentaje: 32, monto: 2342400, color: "#0070F3" },
  { categoria: "Sueldos y honorarios", porcentaje: 18, monto: 1317600, color: "#10B981" },
  { categoria: "Servicios y alquileres", porcentaje: 15, monto: 1098000, color: "#F59E0B" },
  { categoria: "Gastos administrativos", porcentaje: 12, monto: 878400, color: "#8B5CF6" },
  { categoria: "Mantenimiento", porcentaje: 8, monto: 585600, color: "#06B6D4" },
  { categoria: "Otros gastos", porcentaje: 15, monto: 1098000, color: "#64748B" },
];

export const MOCK_RESUMEN_CATEGORIA_INGRESOS: readonly ResumenCategoriaIngresoItem[] = [
  { categoria: "Consultas médicas", porcentaje: 43, monto: 5353500, color: "#0070F3" },
  { categoria: "Cirugías", porcentaje: 26, monto: 3237000, color: "#10B981" },
  { categoria: "Estudios diagnósticos", porcentaje: 15, monto: 1867500, color: "#F59E0B" },
  { categoria: "Membresías familiares", porcentaje: 8, monto: 996000, color: "#8B5CF6" },
  { categoria: "Otros ingresos", porcentaje: 8, monto: 996000, color: "#06B6D4" },
];

export const MOCK_EVOLUCION_FINANCIERA: readonly EvolucionFinancieraMes[] = [
  { mes: "Dic", ingresos: 9800000, egresos: 6200000, resultado: 3600000 },
  { mes: "Ene", ingresos: 10200000, egresos: 6500000, resultado: 3700000 },
  { mes: "Feb", ingresos: 9500000, egresos: 6100000, resultado: 3400000 },
  { mes: "Mar", ingresos: 11100000, egresos: 6900000, resultado: 4200000 },
  { mes: "Abr", ingresos: 11600000, egresos: 7100000, resultado: 4500000 },
  { mes: "May", ingresos: 12450000, egresos: 7320000, resultado: 5130000 },
];

export const MOCK_COBRANZAS_KPIS: KpiCobranzasSummary = {
  totalPorCobrar: 8450000,
  totalFacturas: 42,
  vencidasMonto: 3280000,
  vencidasFacturas: 18,
  porVencerMonto: 2150000,
  porVencerFacturas: 12,
  alDiaMonto: 3020000,
  alDiaFacturas: 12,
};

// Generador de facturas mock con motor de mora integrado
interface FacturaBaseInput {
  id: string;
  numeroFactura: string;
  pacienteId: string;
  pacienteNombre: string;
  concepto: string;
  especialidad?: string;
  montoOriginal: number;
  fechaEmision: string;
  fechaVencimiento: string;
}

const FACTURAS_RAW: readonly FacturaBaseInput[] = [
  {
    id: "fac-01",
    numeroFactura: "FAC-00123",
    pacienteId: "p-001",
    pacienteNombre: "Ana Torres",
    concepto: "Consulta Médica General y Ecografía",
    especialidad: "Clínica Médica",
    montoOriginal: 50000,
    fechaEmision: "2025-04-12",
    fechaVencimiento: "2025-04-22", // 20 días de atraso al 12/05/2025
  },
  {
    id: "fac-02",
    numeroFactura: "FAC-00124",
    pacienteId: "p-002",
    pacienteNombre: "Carlos Mendoza",
    concepto: "Ecocardiograma Doppler Color",
    especialidad: "Cardiología",
    montoOriginal: 75000,
    fechaEmision: "2025-04-20",
    fechaVencimiento: "2025-04-30", // 12 días de atraso
  },
  {
    id: "fac-03",
    numeroFactura: "FAC-00125",
    pacienteId: "p-003",
    pacienteNombre: "María Díaz",
    concepto: "Control Dermatológico y Biopsia",
    especialidad: "Dermatología",
    montoOriginal: 35000,
    fechaEmision: "2025-05-02",
    fechaVencimiento: "2025-05-12", // Vence hoy 12/05/2025
  },
  {
    id: "fac-04",
    numeroFactura: "FAC-00126",
    pacienteId: "p-004",
    pacienteNombre: "Lucas Benítez",
    concepto: "Consulta Traumatología e Inmovilización",
    especialidad: "Traumatología",
    montoOriginal: 42000,
    fechaEmision: "2025-05-08",
    fechaVencimiento: "2025-05-15", // Próx. 3 días
  },
  {
    id: "fac-05",
    numeroFactura: "FAC-00127",
    pacienteId: "p-005",
    pacienteNombre: "Valentina Gómez",
    concepto: "Cirugía Ambulatoria Quirófano 1",
    especialidad: "Cirugía General",
    montoOriginal: 280000,
    fechaEmision: "2025-04-01",
    fechaVencimiento: "2025-04-15", // 27 días de atraso
  },
  {
    id: "fac-06",
    numeroFactura: "FAC-00128",
    pacienteId: "p-006",
    pacienteNombre: "Sofía Gómez Torres",
    concepto: "Laboratorio Completo y Cultivo",
    especialidad: "Bioquímica",
    montoOriginal: 48000,
    fechaEmision: "2025-05-10",
    fechaVencimiento: "2025-05-24", // Al día
  },
  {
    id: "fac-07",
    numeroFactura: "FAC-00129",
    pacienteId: "p-007",
    pacienteNombre: "Gabriel Ponce",
    concepto: "Cuota Membresía Plan Familiar",
    especialidad: "Membresías",
    montoOriginal: 65000,
    fechaEmision: "2025-05-01",
    fechaVencimiento: "2025-05-10", // 2 días de atraso
  },
  {
    id: "fac-08",
    numeroFactura: "FAC-00130",
    pacienteId: "p-008",
    pacienteNombre: "Julián Castro",
    concepto: "Curación Quirúrgica Avanzada",
    especialidad: "Cirugía General",
    montoOriginal: 28000,
    fechaEmision: "2025-05-05",
    fechaVencimiento: "2025-05-18", // Al día
  },
];

export const MOCK_FACTURAS_COBRO: readonly FacturaCobroItem[] = FACTURAS_RAW.map(
  (raw) => {
    // Calculado mediante el motor matemático de mora con fecha base 2025-05-12
    const calc = calcularInteresMora({
      montoOriginal: raw.montoOriginal,
      fechaVencimiento: raw.fechaVencimiento,
      fechaReferencia: "2025-05-12",
      tasaMensualPct: 2.0,
    });

    return {
      id: raw.id,
      numeroFactura: raw.numeroFactura,
      pacienteId: raw.pacienteId,
      pacienteNombre: raw.pacienteNombre,
      concepto: raw.concepto,
      especialidad: raw.especialidad,
      montoOriginal: raw.montoOriginal,
      fechaEmision: raw.fechaEmision,
      fechaVencimiento: raw.fechaVencimiento,
      diasAtraso: calc.diasAtraso,
      interesCalculado: calc.interes,
      totalACobrar: calc.totalACobrar,
      estado: calc.estado,
    };
  }
);

export const MOCK_ANTIGUEDAD_SALDOS: readonly AntiguedadSaldoItem[] = [
  { tramo: "Al día", dias: "Sin vencimiento", porcentaje: 36, monto: 3042000, color: "#10B981" },
  { tramo: "1 a 30 días", dias: "Vencido leve", porcentaje: 28, monto: 2366000, color: "#F59E0B" },
  { tramo: "31 a 60 días", dias: "Mora media", porcentaje: 16, monto: 1352000, color: "#F97316" },
  { tramo: "61 a 90 días", dias: "Mora alta", porcentaje: 12, monto: 1014000, color: "#EF4444" },
  { tramo: "+90 días", dias: "En gestión judicial", porcentaje: 8, monto: 676000, color: "#991B1B" },
];
