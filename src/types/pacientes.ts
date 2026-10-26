export type TipoMembresia = "individual" | "familiar";
export type EstadoMembresia = "activa" | "vencida" | "suspendida";

export type EstadoTurnoPaciente = "confirmado" | "pendiente" | "asistio" | "no_asistio";

export interface FamiliarDependiente {
  readonly id: string;
  readonly nombreCompleto: string;
  readonly dni: string;
  readonly parentesco: "Titular" | "Pareja" | "Hijo" | "Otro";
  readonly estado?: "Activo" | "Inactivo";
}

export interface MembresiaDetalle {
  readonly id: string;
  readonly codigo: string; // ej: FAM-000125
  readonly nombrePlan: string;
  readonly tipo: TipoMembresia;
  readonly estado: EstadoMembresia;
  readonly fechaVencimiento: string; // Formato YYYY-MM-DD
  readonly beneficios: readonly string[];
  readonly familiares: readonly FamiliarDependiente[];
}

export interface AlertaMedica {
  readonly alergias: readonly string[];
  readonly enfermedadesPreexistentes: readonly string[];
  readonly medicamentosHabituales: readonly string[];
  readonly grupoSanguineo: string; // ej: A+, O-
  readonly observaciones?: string;
}

export interface TurnoPaciente {
  readonly id: string;
  readonly fecha: string;
  readonly hora?: string;
  readonly especialidad: string;
  readonly profesional: string;
  readonly consultorio: string;
  readonly estado: EstadoTurnoPaciente;
  readonly motivo?: string;
}

export interface PacienteDetalle {
  readonly id: string;
  readonly nombreCompleto: string;
  readonly dni: string;
  readonly edad: number;
  readonly fechaNacimiento: string;
  readonly telefono: string;
  readonly email: string;
  readonly direccion: string;
  readonly obraSocial: string;
  readonly numeroAfiliado: string;
  readonly contactoEmergenciaNombre: string;
  readonly contactoEmergenciaTelefono: string;
  readonly alertaMedica: AlertaMedica;
  readonly membresia?: MembresiaDetalle;
  readonly estado?: "activo" | "inactivo";
  readonly prosimosTurnos?: readonly TurnoPaciente[];
  readonly historialTurnos?: readonly TurnoPaciente[];
}
