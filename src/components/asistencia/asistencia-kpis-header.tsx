"use client";

import React from "react";
import { TurnoAsistenciaFila } from "@/types/asistencia";
import { Check, X, Clock, Calendar } from "lucide-react";

interface AsistenciaKpisHeaderProps {
  readonly turnos: readonly TurnoAsistenciaFila[];
}

export function AsistenciaKpisHeader({ turnos }: AsistenciaKpisHeaderProps) {
  const totalTurnos = turnos.length;
  const asistidosConteo = turnos.filter((t) => t.estado === "asistio").length;
  const noAsistidosConteo = turnos.filter((t) => t.estado === "no_asistio").length;
  const reprogramadosConteo = turnos.filter((t) => t.estado === "reprogramado").length;

  const asistidosPct = totalTurnos > 0 ? Math.round((asistidosConteo / totalTurnos) * 100) : 0;
  const noAsistidosPct = totalTurnos > 0 ? Math.round((noAsistidosConteo / totalTurnos) * 100) : 0;
  const reprogramadosPct = totalTurnos > 0 ? Math.round((reprogramadosConteo / totalTurnos) * 100) : 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Asistidos */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between hover:border-slate-300 transition-all">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Asistidos
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">
              {asistidosConteo}
            </span>
            <span className="text-xs font-bold text-emerald-600">
              ({asistidosPct}%)
            </span>
          </div>
          <span className="text-[11px] text-slate-400 block">
            Check-in completado
          </span>
        </div>

        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-2xs shrink-0">
          <Check className="w-6 h-6 stroke-[3]" />
        </div>
      </div>

      {/* 2. No Asistidos */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between hover:border-slate-300 transition-all">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            No Asistidos
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">
              {noAsistidosConteo}
            </span>
            <span className="text-xs font-bold text-rose-600">
              ({noAsistidosPct}%)
            </span>
          </div>
          <span className="text-[11px] text-slate-400 block">
            Ausentismo registrado
          </span>
        </div>

        <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shadow-2xs shrink-0">
          <X className="w-6 h-6 stroke-[3]" />
        </div>
      </div>

      {/* 3. Reprogramados */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between hover:border-slate-300 transition-all">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Reprogramados
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">
              {reprogramadosConteo}
            </span>
            <span className="text-xs font-bold text-amber-600">
              ({reprogramadosPct}%)
            </span>
          </div>
          <span className="text-[11px] text-slate-400 block">
            Con fecha asignada
          </span>
        </div>

        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shadow-2xs shrink-0">
          <Clock className="w-6 h-6 stroke-[2.5]" />
        </div>
      </div>

      {/* 4. Total Turnos */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between hover:border-slate-300 transition-all">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Total Turnos
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">
              {totalTurnos}
            </span>
            <span className="text-xs font-bold text-purple-600">
              (100%)
            </span>
          </div>
          <span className="text-[11px] text-slate-400 block">
            Agenda del día completa
          </span>
        </div>

        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shadow-2xs shrink-0">
          <Calendar className="w-6 h-6 stroke-[2]" />
        </div>
      </div>
    </div>
  );
}
