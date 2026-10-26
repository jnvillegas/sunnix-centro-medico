"use client";

import React, { useState } from "react";
import {
  ProfesionalFiltro,
  ConsultorioFiltro,
} from "@/types/agenda";
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Building2,
  Check,
} from "lucide-react";

interface AgendaSidebarFiltrosProps {
  readonly profesionales: readonly ProfesionalFiltro[];
  readonly consultorios: readonly ConsultorioFiltro[];
  readonly selectedProfesionalesIds: readonly string[];
  readonly selectedConsultoriosIds: readonly string[];
  readonly onToggleProfesional: (id: string) => void;
  readonly onSelectAllProfesionales: () => void;
  readonly onToggleConsultorio: (id: string) => void;
  readonly selectedDay?: number;
  readonly onSelectDay?: (day: number) => void;
}

// Días de Mayo 2025: 1 de Mayo fue Jueves. Días totales: 31.
const DAYS_OF_WEEK = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"];
// Offset para mayo 2025: 4 días vacíos antes del 1 de mayo (Dom, Lun, Mar, Mié)
const CALENDAR_OFFSET = 4;
const TOTAL_DAYS = 31;

export function AgendaSidebarFiltros({
  profesionales,
  consultorios,
  selectedProfesionalesIds,
  selectedConsultoriosIds,
  onToggleProfesional,
  onSelectAllProfesionales,
  onToggleConsultorio,
  selectedDay = 12,
  onSelectDay,
}: AgendaSidebarFiltrosProps) {
  const [calendarMonth] = useState<string>("Mayo 2025");

  const allProfesionalesSelected =
    profesionales.length > 0 &&
    profesionales.every((p) => selectedProfesionalesIds.includes(p.id));

  return (
    <div className="w-full lg:w-64 space-y-5 select-none shrink-0">
      {/* 1. Mini Calendario Mensual */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <span className="text-xs font-bold text-slate-800">
            {calendarMonth}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title="Mes anterior"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title="Mes siguiente"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Grilla del mini calendario */}
        <div className="grid grid-cols-7 gap-1 pt-3 text-center">
          {DAYS_OF_WEEK.map((d) => (
            <span
              key={d}
              className="text-[10px] font-bold text-slate-400 uppercase"
            >
              {d}
            </span>
          ))}

          {/* Días vacíos de offset */}
          {Array.from({ length: CALENDAR_OFFSET }).map((_, idx) => (
            <span key={`empty-${idx}`} className="h-6" />
          ))}

          {/* Días del mes (1 al 31) */}
          {Array.from({ length: TOTAL_DAYS }).map((_, idx) => {
            const dayNumber = idx + 1;
            const isToday = dayNumber === selectedDay;

            return (
              <button
                key={dayNumber}
                type="button"
                onClick={() => onSelectDay?.(dayNumber)}
                className={`h-6 w-6 mx-auto rounded-full text-xs font-medium flex items-center justify-center transition-all ${
                  isToday
                    ? "bg-sky-600 text-white font-bold shadow-2xs"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {dayNumber}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Filtro de Profesionales */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <Users className="w-3.5 h-3.5 text-sky-600" />
            <span>Profesionales</span>
          </div>
          <button
            type="button"
            onClick={onSelectAllProfesionales}
            className="text-[11px] font-semibold text-sky-600 hover:text-sky-700"
          >
            {allProfesionalesSelected ? "Deseleccionar" : "Todos"}
          </button>
        </div>

        <div className="space-y-2">
          {profesionales.map((med) => {
            const isChecked = selectedProfesionalesIds.includes(med.id);

            return (
              <label
                key={med.id}
                className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                    isChecked
                      ? "bg-sky-600 border-sky-600 text-white"
                      : "border-slate-300 bg-white group-hover:border-slate-400"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleProfesional(med.id)}
                    className="sr-only"
                  />
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>

                {/* Avatar pequeño */}
                <div
                  className={`w-6 h-6 rounded-lg bg-gradient-to-tr ${med.colorBg} text-white flex items-center justify-center text-[10px] font-bold shadow-2xs shrink-0`}
                >
                  {med.avatarInitials}
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold text-slate-800 truncate">
                    {med.nombre}
                  </span>
                  <span className="text-[10px] text-slate-400 truncate">
                    {med.especialidad}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* 3. Filtro de Consultorios */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-3">
        <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100 text-xs font-bold text-slate-800">
          <Building2 className="w-3.5 h-3.5 text-teal-600" />
          <span>Consultorios</span>
        </div>

        <div className="space-y-2">
          {consultorios.map((c) => {
            const isChecked = selectedConsultoriosIds.includes(c.id);

            return (
              <label
                key={c.id}
                className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                    isChecked
                      ? "bg-teal-600 border-teal-600 text-white"
                      : "border-slate-300 bg-white group-hover:border-slate-400"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleConsultorio(c.id)}
                    className="sr-only"
                  />
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className="text-xs font-medium text-slate-700">
                  {c.nombre}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
