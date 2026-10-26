import {
  ReporteCatalogoItem,
  ResumenEjecutivoStrip,
  ReportePreviewData,
} from "@/types/reportes";

export const MOCK_RESUMEN_EJECUTIVO_STRIP: ResumenEjecutivoStrip = {
  turnosTotales: 1240,
  porcentajeAsistenciaGlobal: 81,
  facturacionTotal: 12450000,
  egresosTotales: 7320000,
  margenRentabilidadPct: 41,
};

export const MOCK_CATALOGO_REPORTES: readonly ReporteCatalogoItem[] = [
  // 1. GESTIÓN MÉDICA Y PACIENTES (7)
  {
    id: "REP-01",
    numero: 1,
    titulo: "Turnos por período",
    categoria: "clinica",
    categoriaEtiqueta: "Gestión Médica",
    queMuestra:
      "Cantidad de turnos dados, cancelados, reprogramados y atendidos por rango de fechas.",
    utilidadNegocio:
      "Medir el volumen de actividad general, picos de demanda y estacionalidad de la clínica.",
    iconName: "Calendar",
  },
  {
    id: "REP-02",
    numero: 2,
    titulo: "Asistencia de pacientes",
    categoria: "clinica",
    categoriaEtiqueta: "Gestión Médica",
    queMuestra:
      "Pacientes que asistieron vs. no asistieron, ausentismo porcentual y turnos sobreturnos.",
    utilidadNegocio:
      "Controlar el ausentismo (no-show), diseñar estrategias de sobreturnos y recordatorios automáticos.",
    iconName: "UserCheck",
  },
  {
    id: "REP-03",
    numero: 3,
    titulo: "Turnos por especialidad",
    categoria: "clinica",
    categoriaEtiqueta: "Gestión Médica",
    queMuestra:
      "Distribución de turnos según especialidad médica (Clínica, Cardiología, Derma, Traumatología).",
    utilidadNegocio:
      "Saber qué áreas tienen mayor y menor demanda, para sumar profesionales o reasignar consultorios.",
    iconName: "Stethoscope",
  },
  {
    id: "REP-04",
    numero: 4,
    titulo: "Producción por profesional",
    categoria: "clinica",
    categoriaEtiqueta: "Gestión Médica",
    queMuestra:
      "Cantidad de pacientes atendidos, horas de consultorio trabajadas y turnos completados por médico.",
    utilidadNegocio:
      "Evaluar el rendimiento individual, liquidar honorarios variables y justificar alquileres de espacio.",
    iconName: "Activity",
  },
  {
    id: "REP-07",
    numero: 7,
    titulo: "Pacientes por período (Nuevos vs. recurrentes)",
    categoria: "clinica",
    categoriaEtiqueta: "Gestión Médica",
    queMuestra:
      "Pacientes que ingresaron por primera vez vs. pacientes que ya se atendían en la institución.",
    utilidadNegocio:
      "Medir el crecimiento real de la base de pacientes y la fidelización o retención de la clínica.",
    iconName: "Users",
  },
  {
    id: "REP-08",
    numero: 8,
    titulo: "Membresías de pacientes",
    categoria: "clinica",
    categoriaEtiqueta: "Gestión Médica",
    queMuestra:
      "Cantidad de miembros activos, nuevas suscripciones, bajas y recaudación recurrente mensual.",
    utilidadNegocio:
      "Monitorear el programa de membresías como flujo de ingresos predecible para el centro.",
    iconName: "CreditCard",
  },
  {
    id: "REP-17",
    numero: 17,
    titulo: "Pacientes por obra social / plan",
    categoria: "clinica",
    categoriaEtiqueta: "Gestión Médica",
    queMuestra:
      "Cantidad de pacientes y consultas atendidas según prepaga, obra social o categoría particular.",
    utilidadNegocio:
      "Saber qué convenios generan mayor flujo de pacientes y cuáles son más o menos rentables.",
    iconName: "HeartPulse",
  },

  // 2. INFRAESTRUCTURA Y OCUPACIÓN (2)
  {
    id: "REP-05",
    numero: 5,
    titulo: "Uso de consultorios",
    categoria: "infraestructura",
    categoriaEtiqueta: "Infraestructura",
    queMuestra:
      "Horas asignadas vs. horas efectivamente utilizadas por consultorio y por franja horaria.",
    utilidadNegocio:
      "Optimizar la infraestructura física, detectar consultorios ociosos y planificar alquileres por módulo.",
    iconName: "Building2",
  },
  {
    id: "REP-06",
    numero: 6,
    titulo: "Cirugías por período",
    categoria: "infraestructura",
    categoriaEtiqueta: "Infraestructura",
    queMuestra:
      "Cantidad de cirugías realizadas, quirófano asignado, tipo de procedimiento y duración media.",
    utilidadNegocio:
      "Monitorear la productividad quirúrgica, tiempo de rotación y rotación de insumos de quirófano.",
    iconName: "Scissors",
  },

  // 3. FINANZAS Y RENTABILIDAD (6)
  {
    id: "REP-09",
    numero: 9,
    titulo: "Facturación médica (profesionales)",
    categoria: "finanzas",
    categoriaEtiqueta: "Finanzas",
    queMuestra:
      "Total facturado por cada profesional según aranceles particulares y de obra social.",
    utilidadNegocio:
      "Liquidar honorarios profesionales, retener comisiones pactadas y evaluar rentabilidad médica.",
    iconName: "Receipt",
  },
  {
    id: "REP-10",
    numero: 10,
    titulo: "Ingresos del centro médico",
    categoria: "finanzas",
    categoriaEtiqueta: "Finanzas",
    queMuestra:
      "Total de dinero ingresado por consultas, cirugías, estudios, membresías y alquileres.",
    utilidadNegocio:
      "Tener la foto de la caja general, comparar con metas comerciales y evaluar liquidez.",
    iconName: "DollarSign",
  },
  {
    id: "REP-11",
    numero: 11,
    titulo: "Egresos del centro médico",
    categoria: "finanzas",
    categoriaEtiqueta: "Finanzas",
    queMuestra:
      "Gastos fijos y variables: compras de insumos, sueldos, servicios, mantenimiento e impuestos.",
    utilidadNegocio:
      "Controlar el gasto operativo, detectar desviaciones de presupuesto y mantener el margen operativo.",
    iconName: "ArrowDownLeft",
  },
  {
    id: "REP-12",
    numero: 12,
    titulo: "Cuentas por cobrar y morosidad",
    categoria: "finanzas",
    categoriaEtiqueta: "Finanzas",
    queMuestra:
      "Deuda acumulada por pacientes y obras sociales, antigüedad de deuda y recargos por mora.",
    utilidadNegocio:
      "Gestionar cobranzas prejudiciales, aplicar intereses automáticos y reducir incobrables.",
    iconName: "Clock",
  },
  {
    id: "REP-13",
    numero: 13,
    titulo: "Cuentas por pagar",
    categoria: "finanzas",
    categoriaEtiqueta: "Finanzas",
    queMuestra:
      "Obligaciones pendientes con droguerías, proveedores de servicios y vencimientos a 30/60 días.",
    utilidadNegocio:
      "Planificar el flujo de caja semanal y evitar cortes de suministro o intereses punitorios comerciales.",
    iconName: "FileCheck2",
  },
  {
    id: "REP-18",
    numero: 18,
    titulo: "Rentabilidad por servicio",
    categoria: "finanzas",
    categoriaEtiqueta: "Finanzas",
    queMuestra:
      "Ingreso menos costo directo (honorario médico + insumos) por cada tipo de prestación o cirugía.",
    utilidadNegocio:
      "Identificar qué servicios dejan mayor margen neto y cuáles están operando a pérdida o margen mínimo.",
    iconName: "ShieldCheck",
  },

  // 4. SUMINISTROS Y LOGÍSTICA (3)
  {
    id: "REP-14",
    numero: 14,
    titulo: "Insumos y stock",
    categoria: "suministros",
    categoriaEtiqueta: "Suministros",
    queMuestra:
      "Inventario actual, valorizado por categoría, ítems bajo stock mínimo y sin existencia.",
    utilidadNegocio:
      "Evitar quiebres de stock en consultorio/quirófano y no inmovilizar capital excesivo.",
    iconName: "Boxes",
  },
  {
    id: "REP-15",
    numero: 15,
    titulo: "Consumo de insumos",
    categoria: "suministros",
    categoriaEtiqueta: "Suministros",
    queMuestra:
      "Qué insumos se usaron, en qué cantidad, por qué profesional, especialidad o quirófano.",
    utilidadNegocio:
      "Calcular el costo real por procedimiento, detectar consumos atípicos o mermas sin justificar.",
    iconName: "TrendingUp",
  },
  {
    id: "REP-16",
    numero: 16,
    titulo: "Compras por proveedor",
    categoria: "suministros",
    categoriaEtiqueta: "Suministros",
    queMuestra:
      "Volumen y monto comprado a cada proveedor, precios unitarios históricos y cumplimiento de entregas.",
    utilidadNegocio:
      "Negociar mejores condiciones comerciales, plazos de pago y comparar alternativas de abastecimiento.",
    iconName: "ShoppingCart",
  },
];

// Generador de datos tabulares dinámicos para los 18 reportes
export function getPreviewDataForReport(
  reporteId: string,
  periodoTexto: string = "Mayo 2025"
): ReportePreviewData {
  switch (reporteId) {
    case "REP-18": // Rentabilidad por servicio
      return {
        reporteId,
        titulo: "Rentabilidad por servicio y procedimiento",
        categoria: "finanzas",
        periodoTexto,
        columnas: [
          { key: "servicio", label: "Servicio / Prestación", align: "left" },
          { key: "cantidad", label: "Volumen", align: "center", isMono: true },
          { key: "ingreso", label: "Ingreso Bruto", align: "right", isMono: true },
          { key: "costoInsumos", label: "Costo Insumos", align: "right", isMono: true },
          { key: "honorarios", label: "Honorarios Médicos", align: "right", isMono: true },
          { key: "margenNeto", label: "Margen Neto ($)", align: "right", isMono: true },
          { key: "margenPct", label: "Margen (%)", align: "right", isMono: true },
        ],
        filas: [
          {
            servicio: "Consulta Médica General",
            cantidad: 420,
            ingreso: "$ 3.360.000",
            costoInsumos: "$ 168.000",
            honorarios: "$ 1.680.000",
            margenNeto: "$ 1.512.000",
            margenPct: "45%",
          },
          {
            servicio: "Cirugía Artroscópica Rodilla",
            cantidad: 14,
            ingreso: "$ 3.920.000",
            costoInsumos: "$ 784.000",
            honorarios: "$ 1.568.000",
            margenNeto: "$ 1.568.000",
            margenPct: "40%",
          },
          {
            servicio: "Ecocardiograma Doppler",
            cantidad: 85,
            ingreso: "$ 1.870.000",
            costoInsumos: "$ 93.500",
            honorarios: "$ 935.000",
            margenNeto: "$ 841.500",
            margenPct: "45%",
          },
          {
            servicio: "Biopsia Dermatológica",
            cantidad: 36,
            ingreso: "$ 1.080.000",
            costoInsumos: "$ 162.000",
            honorarios: "$ 540.000",
            margenNeto: "$ 378.000",
            margenPct: "35%",
          },
          {
            servicio: "Membresía Plan Familiar",
            cantidad: 120,
            ingreso: "$ 2.220.000",
            costoInsumos: "$ 0",
            honorarios: "$ 666.000",
            margenNeto: "$ 1.554.000",
            margenPct: "70%",
          },
        ],
        totales: {
          servicio: "TOTALES CONSOLIDADOS",
          cantidad: 675,
          ingreso: "$ 12.450.000",
          costoInsumos: "$ 1.207.500",
          honorarios: "$ 5.389.000",
          margenNeto: "$ 5.853.500",
          margenPct: "47%",
        },
      };

    case "REP-01": // Turnos por período
      return {
        reporteId,
        titulo: "Turnos por período y estado",
        categoria: "clinica",
        periodoTexto,
        columnas: [
          { key: "semana", label: "Semana / Franja", align: "left" },
          { key: "programados", label: "Programados", align: "center", isMono: true },
          { key: "atendidos", label: "Atendidos", align: "center", isMono: true },
          { key: "cancelados", label: "Cancelados", align: "center", isMono: true },
          { key: "reprogramados", label: "Reprogramados", align: "center", isMono: true },
          { key: "tasaAsistencia", label: "Tasa Asistencia", align: "right", isMono: true },
        ],
        filas: [
          { semana: "Semana 1 (01/05 al 07/05)", programados: 290, atendidos: 238, cancelados: 38, reprogramados: 14, tasaAsistencia: "82%" },
          { semana: "Semana 2 (08/05 al 14/05)", programados: 315, atendidos: 255, cancelados: 44, reprogramados: 16, tasaAsistencia: "81%" },
          { semana: "Semana 3 (15/05 al 21/05)", programados: 325, atendidos: 263, cancelados: 45, reprogramados: 17, tasaAsistencia: "81%" },
          { semana: "Semana 4 (22/05 al 28/05)", programados: 310, atendidos: 248, cancelados: 46, reprogramados: 16, tasaAsistencia: "80%" },
        ],
        totales: {
          semana: "TOTAL MES",
          programados: 1240,
          atendidos: 1004,
          cancelados: 173,
          reprogramados: 63,
          tasaAsistencia: "81%",
        },
      };

    case "REP-05": // Uso de consultorios
      return {
        reporteId,
        titulo: "Uso y ocupación horaria de consultorios",
        categoria: "infraestructura",
        periodoTexto,
        columnas: [
          { key: "consultorio", label: "Consultorio", align: "left" },
          { key: "especialidadPrincipal", label: "Especialidad", align: "left" },
          { key: "horasDisponibles", label: "Horas Hab.", align: "center", isMono: true },
          { key: "horasOcupadas", label: "Horas Ocup.", align: "center", isMono: true },
          { key: "tasaOcupacion", label: "% Ocupación", align: "right", isMono: true },
        ],
        filas: [
          { consultorio: "Consultorio 1", especialidadPrincipal: "Clínica Médica", horasDisponibles: 220, horasOcupadas: 198, tasaOcupacion: "90%" },
          { consultorio: "Consultorio 2", especialidadPrincipal: "Cardiología", horasDisponibles: 220, horasOcupadas: 176, tasaOcupacion: "80%" },
          { consultorio: "Consultorio 3", especialidadPrincipal: "Dermatología", horasDisponibles: 220, horasOcupadas: 165, tasaOcupacion: "75%" },
          { consultorio: "Consultorio 4", especialidadPrincipal: "Pediatría", horasDisponibles: 220, horasOcupadas: 187, tasaOcupacion: "85%" },
          { consultorio: "Consultorio 5", especialidadPrincipal: "Ginecología", horasDisponibles: 220, horasOcupadas: 154, tasaOcupacion: "70%" },
          { consultorio: "Consultorio 6", especialidadPrincipal: "Traumatología", horasDisponibles: 220, horasOcupadas: 192, tasaOcupacion: "87%" },
        ],
        totales: {
          consultorio: "TOTAL CLÍNICA",
          especialidadPrincipal: "6 Consultorios",
          horasDisponibles: 1320,
          horasOcupadas: 1072,
          tasaOcupacion: "81.2%",
        },
      };

    default: // Genérico robusto para los demás reportes
      const reporte = MOCK_CATALOGO_REPORTES.find((r) => r.id === reporteId) ?? MOCK_CATALOGO_REPORTES[0];
      return {
        reporteId,
        titulo: reporte.titulo,
        categoria: reporte.categoria,
        periodoTexto,
        columnas: [
          { key: "concepto", label: "Concepto / Detalle", align: "left" },
          { key: "volumen", label: "Registros / Casos", align: "center", isMono: true },
          { key: "monto", label: "Importe Liquidado", align: "right", isMono: true },
          { key: "participacion", label: "% Participación", align: "right", isMono: true },
          { key: "estado", label: "Estado / Desempeño", align: "center" },
        ],
        filas: [
          { concepto: "Segmento Principal A", volumen: 245, monto: "$ 4.890.000", participacion: "39%", estado: "Óptimo" },
          { concepto: "Segmento Operativo B", volumen: 182, monto: "$ 3.640.000", participacion: "29%", estado: "Normal" },
          { concepto: "Segmento Quirúrgico C", volumen: 96, monto: "$ 2.450.000", participacion: "20%", estado: "En crecimiento" },
          { concepto: "Segmento Complementario D", volumen: 74, monto: "$ 1.470.000", participacion: "12%", estado: "Estable" },
        ],
        totales: {
          concepto: "TOTAL AUDITADO",
          volumen: 597,
          monto: "$ 12.450.000",
          participacion: "100%",
          estado: "Conforme",
        },
      };
  }
}
