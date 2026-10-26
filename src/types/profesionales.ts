export type TipoSlotAgenda =
  | "consulta"
  | "control"
  | "procedimiento"
  | "cirugia_menor"
  | "bloqueado";

export type DiaSemana =
  | "Lunes"
  | "Martes"
  | "Miércoles"
  | "Jueves"
  | "Viernes"
  | "Sábado"
  | "Domingo";

export interface DiaAgendaSemanal {
  readonly dia: DiaSemana;
  readonly horario: string; // ej: "08:00 - 13:00" o "-"
  readonly consultorioNombre: string;
  readonly activo: boolean;
}

export interface DocumentoProfesional {
  readonly id: string;
  readonly tipo:
    | "Titulo médico"
    | "Matrícula"
    | "Seguro RC"
    | "Contrato de alquiler"
    | "Otro";
  readonly nombreArchivo: string;
  readonly fechaSubida: string;
  readonly urlDescarga: string;
  readonly estado?: "Vigente" | "Por vencer" | "Vencido";
}

export interface ProfesionalDetalle {
  readonly id: string;
  readonly nombreCompleto: string;
  readonly matricula: string;
  readonly dni: string;
  readonly especialidad: string;
  readonly telefono: string;
  readonly email: string;
  readonly consultorioAsignadoNombre: string;
  readonly montoAlquilerMensual: number;
  readonly proximoVencimientoAlquiler: string;
  readonly facturacionMesActual: number;
  readonly turnosMesActual: number;
  readonly agendaSemanal: readonly DiaAgendaSemanal[];
  readonly documentos: readonly DocumentoProfesional[];
  readonly estado?: "activo" | "inactivo" | "licencia";
  readonly biografia?: string;
}

export interface SlotConsultorio {
  readonly id: string;
  readonly consultorioNumero: number; // 1 a 6
  readonly consultorioNombre?: string;
  readonly horaInicio: string; // "08:00"
  readonly horaFin: string; // "08:30"
  readonly tipo: TipoSlotAgenda;
  readonly pacienteNombre?: string;
  readonly pacienteDni?: string;
  readonly profesionalNombre?: string;
  readonly especialidad?: string;
  readonly motivo?: string;
  readonly estado?: "confirmado" | "pendiente" | "en_espera" | "finalizado";
  readonly notas?: string;
}

export interface ConsultorioInfo {
  readonly numero: number;
  readonly nombre: string;
  readonly habilitado: boolean;
  readonly esQuirofano: boolean;
  readonly piso: string;
  readonly equipamiento: string;
  readonly profesionalActual?: string;
}

export interface KpiOcupacionData {
  readonly consultoriosTotales: number;
  readonly consultoriosHabilitados: number;
  readonly ocupacionPorcentaje: number;
  readonly turnosTotales: number;
  readonly turnosConfirmados: number;
  readonly turnosConfirmadosPct: number;
  readonly turnosPendientes: number;
  readonly turnosPendientesPct: number;
  readonly consultoriosLibres: number;
  readonly ingresosAlquilerHoy: number;
}
