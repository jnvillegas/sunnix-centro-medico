"use client";

import React from "react";
import {
  Calendar,
  ChevronDown,
  Download,
  Scissors,
  Stethoscope,
} from "lucide-react";

interface AsistenciaFiltrosBarProps {
  readonly fecha: string;
  readonly onFechaChange?: (fecha: string) => void;
  readonly profesionalSeleccionado: string;
  readonly onProfesionalChange: (profesional: string) => void;
  readonly especialidadSeleccionada: string;
  readonly onEspecialidadChange: (especialidad: string) => void;
  readonly tabSeleccionada: "turnos" | "cirugias";
  readonly onTabChange: (tab: "turnos" | "cirugias") => void;
  readonly onExportar?: () => void;
}

const PROFESIONALES_OPCIONES: readonly string[] = [
  "Todos los profesionales",
  "Dra. Laura García",
  "Dr. Roberto López",
  "Dra. Elena Martínez",
  "Dr. Juan Ruiz",
];

const ESPECIALIDADES_OPCIONES: readonly string[] = [
  "Todas las especialidades",
  "Clínica Médica",
  "Cardiología",
  "Dermatología",
  "Traumatología",
];

export function AsistenciaFiltrosBar({
  fecha,
  onFechaChange,
  profesionalSeleccionado,
  onProfesionalChange,
  especialidadSeleccionada,
  onEspecialidadChange,
  tabSeleccionada,
  onTabChange,
  onExportar,
}: AsistenciaFiltrosBarProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      {/* Izquierda: Conmutador Turnos / Cirugías y Selector de Fecha */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Tabs secundarias: Turnos vs Cirugías */}
        <div className="inline-flex p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => onTabChange("turnos")}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
              tabSeleccionada === "turnos"
                ? "bg-white text-slate-900 shadow-2xs font-bold"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5 text-blue-600" />
            <span>Turnos</span>
          </button>
          <button
            type="button"
            onClick={() => onTabChange("cirugias")}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
              tabSeleccionada === "cirugias"
                ? "bg-white text-slate-900 shadow-2xs font-bold"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Scissors className="w-3.5 h-3.5 text-slate-500" />
            <span>Cirugías</span>
          </button>
        </div>

        {/* Selector de Fecha */}
        <div className="relative inline-flex items-center">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors">
            <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
            <input
              type="text"
              value={fecha}
              onChange={(e) => onFechaChange?.(e.target.value)}
              className="w-24 bg-transparent border-none p-0 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-0"
              title="Fecha de consulta"
            />
          </div>
        </div>
      </div>

      {/* Derecha: Desplegables de Profesional, Especialidad y Botón Exportar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Desplegable Profesional */}
        <div className="relative">
          <select
            value={profesionalSeleccionado}
            onChange={(e) => onProfesionalChange(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
          >
            {PROFESIONALES_OPCIONES.map((prof) => (
              <option key={prof} value={prof}>
                {prof}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Desplegable Especialidad */}
        <div className="relative">
          <select
            value={especialidadSeleccionada}
            onChange={(e) => onEspecialidadChange(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
          >
            {ESPECIALIDADES_OPCIONES.map((esp) => (
              <option key={esp} value={esp}>
                {esp}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Botón Exportar Sunnix Blue */}
        <button
          type="button"
          onClick={onExportar}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
        >
          <Download className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Exportar</span>
        </button>
      </div>
    </div>
  );
}
