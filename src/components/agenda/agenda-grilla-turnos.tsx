"use client";

import React from "react";
import {
  TurnoAgendaItem,
  ProfesionalFiltro,
  TipoTurnoAgenda,
} from "@/types/agenda";


interface AgendaGrillaTurnosProps {
  readonly profesionales: readonly ProfesionalFiltro[];
  readonly turnos: readonly TurnoAgendaItem[];
  readonly onSelectTurno: (turno: TurnoAgendaItem) => void;
  readonly selectedTurnoId?: string;
}

// Franjas horarias de 08:00 a 19:00 (cada 30 min)
const FRANJAS_HORARIAS_AGENDA: readonly string[] = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
];

export function AgendaGrillaTurnos({
  profesionales,
  turnos,
  onSelectTurno,
  selectedTurnoId,
}: AgendaGrillaTurnosProps) {
  // Función para obtener estilos de pastillas según especificación
  const getBadgeStyleByTipo = (tipo: TipoTurnoAgenda) => {
    switch (tipo) {
      case "Control":
        return "bg-emerald-50 text-emerald-900 border-l-4 border-emerald-500 hover:bg-emerald-100/80";
      case "Consulta":
      case "Primera consulta":
        return "bg-sky-50 text-sky-900 border-l-4 border-sky-500 hover:bg-sky-100/80";
      case "Electrocardiograma":
        return "bg-indigo-50 text-indigo-900 border-l-4 border-indigo-400 hover:bg-indigo-100/80";
      case "Procedimiento":
        return "bg-teal-50 text-teal-900 border-l-4 border-teal-500 hover:bg-teal-100/80";
      default:
        return "bg-slate-50 text-slate-800 border-l-4 border-slate-400 hover:bg-slate-100";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex-1 flex flex-col">
      {/* Contenedor con Scroll Horizontal Responsivo */}
      <div className="overflow-x-auto custom-scrollbar flex-1">
        <div className="min-w-[800px] select-none">
          {/* Cabecera de Columnas: Horario + Médicos Filtrados */}
          <div
            className="grid bg-slate-100/90 border-b border-slate-200 sticky top-0 z-10 text-xs font-semibold text-slate-700"
            style={{
              gridTemplateColumns: `80px repeat(${profesionales.length}, 1fr)`,
            }}
          >
            {/* Columna Horaria (Sticky Izquierda) */}
            <div className="p-3.5 bg-slate-100 border-r border-slate-200 flex items-center justify-center font-bold text-slate-500 uppercase text-[10px] sticky left-0 z-20">
              Hora
            </div>

            {/* Columnas de los Médicos */}
            {profesionales.map((med) => (
              <div
                key={med.id}
                className="p-3 border-r border-slate-200/80 last:border-r-0 flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${med.colorBg} text-white flex items-center justify-center text-[10px] font-bold shadow-2xs shrink-0`}
                  >
                    {med.avatarInitials}
                  </div>
                  <div className="truncate">
                    <p className="font-bold text-slate-900 text-xs truncate">
                      {med.nombre}
                    </p>
                    <p className="text-[10px] text-slate-500 font-normal truncate">
                      {med.especialidad}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-semibold text-slate-600 bg-white px-1.5 py-0.5 rounded border border-slate-200 shrink-0">
                  Cons. {med.consultorioId.replace("c-", "")}
                </span>
              </div>
            ))}
          </div>

          {/* Filas de Franjas Horarias */}
          <div className="divide-y divide-slate-100">
            {FRANJAS_HORARIAS_AGENDA.map((hora) => (
              <div
                key={hora}
                className="grid min-h-[64px] hover:bg-slate-50/40 transition-colors"
                style={{
                  gridTemplateColumns: `80px repeat(${profesionales.length}, 1fr)`,
                }}
              >
                {/* Etiqueta de Hora (Sticky Izquierda) */}
                <div className="p-2 border-r border-slate-200 bg-white sticky left-0 z-10 flex items-center justify-center text-xs font-mono font-bold text-slate-400">
                  {hora}
                </div>

                {/* Celdas por Médico */}
                {profesionales.map((med) => {
                  const turno = turnos.find(
                    (t) =>
                      t.profesionalId === med.id && t.horaInicio === hora
                  );

                  if (!turno) {
                    return (
                      <div
                        key={`${med.id}-${hora}`}
                        className="p-1 border-r border-slate-100 last:border-r-0 group/slot relative"
                      >
                        <div className="w-full h-full rounded-lg border border-dashed border-transparent hover:border-slate-300 hover:bg-slate-50/60 flex items-center justify-center transition-colors">
                          <span className="text-[10px] text-slate-300 opacity-0 group-hover/slot:opacity-100 transition-opacity">
                            + Disponible
                          </span>
                        </div>
                      </div>
                    );
                  }

                  const isSelected = selectedTurnoId === turno.id;

                  return (
                    <div
                      key={turno.id}
                      className="p-1 border-r border-slate-100 last:border-r-0"
                    >
                      <button
                        type="button"
                        onClick={() => onSelectTurno(turno)}
                        className={`w-full h-full text-left p-2 rounded-xl transition-all shadow-2xs flex flex-col justify-between ${getBadgeStyleByTipo(
                          turno.tipo
                        )} ${
                          isSelected
                            ? "ring-2 ring-sky-600 ring-offset-1 scale-[1.02] shadow-md z-10"
                            : ""
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-[10px] font-extrabold uppercase tracking-tight truncate">
                            {turno.tipo}
                          </span>
                          <span className="text-[10px] font-mono opacity-80 shrink-0">
                            {turno.horaInicio} - {turno.horaFin}
                          </span>
                        </div>

                        <div className="space-y-0.5 py-0.5">
                          <p className="text-xs font-bold truncate leading-tight">
                            {turno.pacienteNombre}
                          </p>
                          <p className="text-[10px] opacity-80 truncate">
                            {turno.motivo}
                          </p>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
