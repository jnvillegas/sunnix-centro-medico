"use client";

import React from "react";
import { SlotConsultorio, TipoSlotAgenda, ConsultorioInfo } from "@/types/profesionales";
import { Lock } from "lucide-react";

interface MatrizGrillaHorariaProps {
  readonly consultorios: readonly ConsultorioInfo[];
  readonly slots: readonly SlotConsultorio[];
  readonly onSelectSlot: (slot: SlotConsultorio) => void;
  readonly selectedSlotId?: string;
}

// Generación de franjas horarias de 08:00 a 17:30 (cada 30 min hasta 18:00)
const FRANJAS_HORARIAS: readonly string[] = [
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
];

export function MatrizGrillaHoraria({
  consultorios,
  slots,
  onSelectSlot,
  selectedSlotId,
}: MatrizGrillaHorariaProps) {
  // Función para obtener estilos exactos definidos en SPEC-003
  const getSlotStyle = (tipo: TipoSlotAgenda) => {
    switch (tipo) {
      case "consulta":
        return "bg-emerald-100 text-emerald-800 border-l-4 border-emerald-500 hover:bg-emerald-200/80";
      case "control":
        return "bg-purple-100 text-purple-800 border-l-4 border-purple-500 hover:bg-purple-200/80";
      case "procedimiento":
        return "bg-sky-100 text-sky-800 border-l-4 border-sky-500 hover:bg-sky-200/80";
      case "cirugia_menor":
        return "bg-amber-100 text-amber-800 border-l-4 border-amber-500 hover:bg-amber-200/80";
      case "bloqueado":
        return "bg-slate-200 text-slate-600 border-l-4 border-slate-400 hover:bg-slate-300/80 cursor-not-allowed";
      default:
        return "bg-slate-100 text-slate-700 border-l-4 border-slate-300";
    }
  };

  const getTipoLabel = (tipo: TipoSlotAgenda) => {
    switch (tipo) {
      case "consulta":
        return "Consulta";
      case "control":
        return "Control";
      case "procedimiento":
        return "Procedimiento";
      case "cirugia_menor":
        return "Cirugía menor";
      case "bloqueado":
        return "Bloqueado";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col">
      {/* Referencia de colores / Leyenda */}
      <div className="p-4 bg-slate-50/80 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
          Tipología de Turnos:
        </span>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-emerald-500 border border-emerald-600" />
            <span className="text-slate-600 font-medium">Consulta</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-purple-500 border border-purple-600" />
            <span className="text-slate-600 font-medium">Control</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-sky-500 border border-sky-600" />
            <span className="text-slate-600 font-medium">Procedimiento</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-amber-500 border border-amber-600" />
            <span className="text-slate-600 font-medium">Cirugía menor</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-slate-400 border border-slate-500" />
            <span className="text-slate-600 font-medium">Bloqueado / Mant.</span>
          </div>
        </div>
      </div>

      {/* Contenedor con Scroll Horizontal Responsivo */}
      <div className="overflow-x-auto custom-scrollbar">
        <div className="min-w-[900px] select-none">
          {/* Encabezado de Columnas (Consultorio 1 al 6) */}
          <div className="grid grid-cols-[80px_repeat(6,1fr)] bg-slate-100/80 border-b border-slate-200 sticky top-0 z-10 text-xs font-semibold text-slate-700">
            {/* Columna de Horario (Sticky Izquierda) */}
            <div className="p-3 bg-slate-100 border-r border-slate-200 flex items-center justify-center font-bold text-slate-500 uppercase text-[10px] sticky left-0 z-20">
              Hora
            </div>

            {/* Columnas Consultorio 1 a 6 */}
            {consultorios.map((c) => (
              <div
                key={c.numero}
                className="p-3 border-r border-slate-200/80 last:border-r-0 text-center space-y-0.5"
              >
                <div className="flex items-center justify-center gap-1.5">
                  <span className="font-bold text-slate-900 text-xs">
                    {c.nombre}
                  </span>
                  {c.esQuirofano && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                      Qx
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-500 font-normal truncate">
                  {c.profesionalActual ?? "Disponible"}
                </p>
              </div>
            ))}
          </div>

          {/* Filas Horarias */}
          <div className="divide-y divide-slate-100">
            {FRANJAS_HORARIAS.map((hora) => (
              <div
                key={hora}
                className="grid grid-cols-[80px_repeat(6,1fr)] min-h-[58px] hover:bg-slate-50/40 transition-colors"
              >
                {/* Columna Horaria (Sticky a la izquierda) */}
                <div className="p-2 border-r border-slate-200 bg-white sticky left-0 z-10 flex items-center justify-center text-xs font-mono font-bold text-slate-400">
                  {hora}
                </div>

                {/* Celdas para cada Consultorio (1 al 6) */}
                {consultorios.map((c) => {
                  // Buscar si hay un slot que comience en esta hora en este consultorio
                  const slot = slots.find(
                    (s) =>
                      s.consultorioNumero === c.numero && s.horaInicio === hora
                  );

                  if (!slot) {
                    return (
                      <div
                        key={`${c.numero}-${hora}`}
                        className="p-1 border-r border-slate-100 last:border-r-0 group/cell relative"
                      >
                        <div className="w-full h-full rounded-lg border border-dashed border-transparent hover:border-slate-300 hover:bg-slate-50/80 flex items-center justify-center transition-colors">
                          <span className="text-[10px] text-slate-300 opacity-0 group-hover/cell:opacity-100 transition-opacity">
                            + Libre
                          </span>
                        </div>
                      </div>
                    );
                  }

                  const isSelected = selectedSlotId === slot.id;

                  return (
                    <div
                      key={slot.id}
                      className="p-1 border-r border-slate-100 last:border-r-0"
                    >
                      <button
                        type="button"
                        onClick={() => onSelectSlot(slot)}
                        className={`w-full h-full text-left p-2 rounded-lg transition-all shadow-2xs flex flex-col justify-between ${getSlotStyle(
                          slot.tipo
                        )} ${
                          isSelected
                            ? "ring-2 ring-sky-600 ring-offset-1 scale-[1.02] shadow-md z-10"
                            : ""
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-[10px] font-extrabold uppercase tracking-tight">
                            {getTipoLabel(slot.tipo)}
                          </span>
                          <span className="text-[10px] font-mono opacity-80">
                            {slot.horaInicio} - {slot.horaFin}
                          </span>
                        </div>

                        {slot.tipo === "bloqueado" ? (
                          <div className="flex items-center gap-1 text-[11px] font-medium py-1">
                            <Lock className="w-3 h-3 text-slate-500 shrink-0" />
                            <span className="truncate">{slot.motivo}</span>
                          </div>
                        ) : (
                          <div className="space-y-0.5 py-0.5">
                            <p className="text-xs font-bold truncate leading-tight">
                              {slot.pacienteNombre}
                            </p>
                            <p className="text-[10px] opacity-80 truncate">
                              {slot.profesionalNombre}
                            </p>
                          </div>
                        )}
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
