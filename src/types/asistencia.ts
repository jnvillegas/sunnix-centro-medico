export type EstadoAsistencia = "asistio" | "no_asistio" | "reprogramado";

export type TipoConsultaAsistencia = "Consulta" | "Control" | "Procedimiento";

export interface TurnoAsistenciaFila {
  readonly id: string;
  readonly hora: string;
  readonly pacienteId: string;
  readonly pacienteNombre: string;
  readonly pacienteDni: string;
  readonly pacienteEdad: number;
  readonly pacienteAvatarUrl?: string;
  readonly profesionalNombre: string;
  readonly profesionalId?: string;
  readonly especialidad: string;
  readonly tipo: TipoConsultaAsistencia;
  readonly estado: EstadoAsistencia;
  readonly notaEstado?: string; // ej: "Reprogramado para 16/05"
  readonly inasistenciasPrevias: number;
  readonly frecuenciaVisitas?: string;
}

export interface KpiAsistenciaSummary {
  readonly asistidosConteo: number;
  readonly asistidosPct: number;
  readonly noAsistidosConteo: number;
  readonly noAsistidosPct: number;
  readonly reprogramadosConteo: number;
  readonly reprogramadosPct: number;
  readonly totalTurnos: number;
}

export interface MetricaProfesionalAsistencia {
  readonly profesionalId: string;
  readonly profesionalNombre: string;
  readonly especialidad: string;
  readonly porcentajeAsistencia: number;
}

export interface EvolucionMesAsistencia {
  readonly mes: string;
  readonly asistidosPct: number;
  readonly noAsistidosPct: number;
  readonly reprogramadosPct: number;
}

export interface TopPacienteInasistencia {
  readonly pacienteId: string;
  readonly pacienteNombre: string;
  readonly dni: string;
  readonly turnosTotales: number;
  readonly inasistencias: number;
  readonly porcentajeInasistencia: number;
}
