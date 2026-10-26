"use client";

import React from "react";
import {
  VistaAgenda,
  PestanaAgendaPrincipal,
} from "@/types/agenda";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Scissors,
} from "lucide-react";

interface AgendaHeaderProps {
  readonly pestanaPrincipal: PestanaAgendaPrincipal;
  readonly onPestanaChange: (pestana: PestanaAgendaPrincipal) => void;
  readonly fechaTexto: string;
  readonly vista: VistaAgenda;
  readonly onVistaChange: (vista: VistaAgenda) => void;
  readonly onPrevFecha?: () => void;
  readonly onNextFecha?: () => void;
  readonly onNuevoTurno?: () => void;
  readonly onNuevaCirugia?: () => void;
}

export function AgendaHeader({
  pestanaPrincipal,
  onPestanaChange,
  fechaTexto,
  vista,
  onVistaChange,
  onPrevFecha,
  onNextFecha,
  onNuevoTurno,
  onNuevaCirugia,
}: AgendaHeaderProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* 1. Selector Conmutador Principal (Turnos vs Cirugías) */}
      <div className="flex items-center gap-3">
        <div className="inline-flex p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => onPestanaChange("turnos")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              pestanaPrincipal === "turnos"
                ? "bg-white text-slate-900 shadow-2xs font-bold"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Calendar className="w-4 h-4 text-sky-600" />
            <span>Turnos</span>
          </button>
          <button
            type="button"
            onClick={() => onPestanaChange("cirugias")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              pestanaPrincipal === "cirugias"
                ? "bg-white text-slate-900 shadow-2xs font-bold"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Scissors className="w-4 h-4 text-amber-600" />
            <span>Cirugías</span>
          </button>
        </div>

        {/* 2. Barra de Navegación de Fecha */}
        <div className="flex items-center bg-slate-100/80 rounded-xl p-1">
          <button
            type="button"
            onClick={onPrevFecha}
            className="p-1.5 rounded-lg hover:bg-white text-slate-600 transition-colors"
            title="Día anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 px-3 py-1 font-semibold text-xs text-slate-800">
            <span>{fechaTexto}</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-sky-100 text-sky-800">
              Hoy
            </span>
          </div>
          <button
            type="button"
            onClick={onNextFecha}
            className="p-1.5 rounded-lg hover:bg-white text-slate-600 transition-colors"
            title="Día siguiente"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Selector de Vista (Día / Semana / Mes) y Botón de Acción */}
      <div className="flex items-center gap-3 self-end md:self-auto">
        <div className="inline-flex p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => onVistaChange("dia")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              vista === "dia"
                ? "bg-white text-slate-900 shadow-2xs font-bold"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Día
          </button>
          <button
            type="button"
            onClick={() => onVistaChange("semana")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              vista === "semana"
                ? "bg-white text-slate-900 shadow-2xs font-bold"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Semana
          </button>
          <button
            type="button"
            onClick={() => onVistaChange("mes")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              vista === "mes"
                ? "bg-white text-slate-900 shadow-2xs font-bold"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Mes
          </button>
        </div>

        {/* 4. Botón Principal de Acción */}
        {pestanaPrincipal === "turnos" ? (
          <button
            type="button"
            onClick={onNuevoTurno}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-sky-600 text-white hover:bg-sky-700 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo turno</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onNuevaCirugia}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-amber-600 text-white hover:bg-amber-700 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          >
            <Scissors className="w-4 h-4" />
            <span>Nueva cirugía</span>
          </button>
        )}
      </div>
    </div>
  );
}
