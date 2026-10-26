export type VistaAgenda = "dia" | "semana" | "mes";

export type PestanaAgendaPrincipal = "turnos" | "cirugias";

export type EstadoCirugia = "programada" | "en_curso" | "finalizada" | "cancelada";

export type TipoTurnoAgenda =
  | "Control"
  | "Consulta"
  | "Primera consulta"
  | "Procedimiento"
  | "Electrocardiograma";

export interface TurnoAgendaItem {
  readonly id: string;
  readonly pacienteId: string;
  readonly pacienteNombre: string;
  readonly pacienteDni: string;
  readonly pacienteEdad: number;
  readonly profesionalId: string;
  readonly profesionalNombre: string;
  readonly consultorioId: string;
  readonly consultorioNombre: string;
  readonly fecha: string; // YYYY-MM-DD
  readonly horaInicio: string; // "08:00"
  readonly horaFin: string; // "08:30"
  readonly tipo: TipoTurnoAgenda;
  readonly motivo: string;
  readonly notas?: string;
  readonly estado?: "confirmado" | "pendiente" | "atendido" | "cancelado";
}

export interface CirugiaItem {
  readonly id: string;
  readonly fecha: string; // YYYY-MM-DD
  readonly horaInicio: string; // "08:00"
  readonly horaFin: string; // "10:00"
  readonly pacienteNombre: string;
  readonly pacienteDni?: string;
  readonly procedimiento: string;
  readonly cirujanoNombre: string;
  readonly quirofanoNombre: "Quirófano 1" | "Quirófano 2";
  readonly duracionHoras: number; // ej: 2.0
  readonly estado: EstadoCirugia;
}

export interface ProfesionalFiltro {
  readonly id: string;
  readonly nombre: string;
  readonly especialidad: string;
  readonly consultorioId: string;
  readonly avatarInitials: string;
  readonly colorBg: string;
}

export interface ConsultorioFiltro {
  readonly id: string;
  readonly numero: number;
  readonly nombre: string;
}

export interface FiltrosAgendaState {
  readonly fechaSeleccionada: string;
  readonly profesionalesIds: readonly string[];
  readonly consultoriosIds: readonly string[];
  readonly vista: VistaAgenda;
  readonly pestanaPrincipal: PestanaAgendaPrincipal;
}
