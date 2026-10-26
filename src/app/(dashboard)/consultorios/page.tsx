"use client";

import React, { useState } from "react";
import {
  MOCK_CONSULTORIOS_INFO,
  MOCK_SLOTS_CONSULTORIOS,
  MOCK_KPI_OCUPACION,
} from "@/lib/data/mock-profesionales";
import { SlotConsultorio } from "@/types/profesionales";
import { KpiOcupacionBanner } from "@/components/consultorios/kpi-ocupacion-banner";
import { MatrizGrillaHoraria } from "@/components/consultorios/matriz-grilla-horaria";
import { DetalleTurnoDrawer } from "@/components/consultorios/detalle-turno-drawer";
import {
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  LayoutGrid,
  Users,
  CalendarDays,
  CalendarRange,
} from "lucide-react";

type ViewMode = "consultorio" | "profesional" | "dia" | "semana";

export default function ConsultoriosPage() {
  const [selectedSlot, setSelectedSlot] = useState<SlotConsultorio | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [currentDate] = useState<string>("Lunes, 12 de mayo de 2025");
  const [viewMode, setViewMode] = useState<ViewMode>("consultorio");

  const handleSelectSlot = (slot: SlotConsultorio) => {
    setSelectedSlot(slot);
    setIsDrawerOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Building2 className="w-3.5 h-3.5" />
              Ocupación Física de Espacios
            </span>
            <span className="text-xs text-slate-400 font-mono">Pantalla 05 • SPEC-003</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Matriz de Consultorios y Quirófanos
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitoreo en tiempo real de ocupación horaria, disponibilidad de quirófanos y turnos ambulatorios.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-sky-600 text-white hover:bg-sky-700 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Asignar Turno a Consultorio</span>
          </button>
        </div>
      </div>

      {/* 6 Tarjetas de Métricas de Ocupación */}
      <KpiOcupacionBanner kpis={MOCK_KPI_OCUPACION} />

      {/* Barra de Controles: Selector de Fecha + Selector de Vista */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Selector de Fecha */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 rounded-xl p-1">
            <button
              type="button"
              className="p-1.5 rounded-lg hover:bg-white text-slate-600 transition-colors"
              title="Día anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 px-3 py-1 font-semibold text-xs text-slate-800">
              <Calendar className="w-4 h-4 text-sky-600" />
              <span>{currentDate}</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-sky-100 text-sky-800">
                Hoy
              </span>
            </div>
            <button
              type="button"
              className="p-1.5 rounded-lg hover:bg-white text-slate-600 transition-colors"
              title="Día siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs de Selección de Vista */}
        <div className="inline-flex p-1 bg-slate-100 rounded-xl text-xs font-semibold self-start lg:self-auto overflow-x-auto">
          <button
            type="button"
            onClick={() => setViewMode("consultorio")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              viewMode === "consultorio"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Vista por consultorio</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("profesional")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              viewMode === "profesional"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Vista por profesional</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("dia")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              viewMode === "dia"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Vista por día</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("semana")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              viewMode === "semana"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <CalendarRange className="w-3.5 h-3.5" />
            <span>Vista por semana</span>
          </button>
        </div>
      </div>

      {/* Grilla Horaria Interactiva de Consultorios 1 al 6 */}
      <MatrizGrillaHoraria
        consultorios={MOCK_CONSULTORIOS_INFO}
        slots={MOCK_SLOTS_CONSULTORIOS}
        onSelectSlot={handleSelectSlot}
        selectedSlotId={selectedSlot?.id}
      />

      {/* Drawer Lateral Derecho de Detalle del Turno */}
      <DetalleTurnoDrawer
        slot={selectedSlot}
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedSlot(null);
        }}
      />
    </div>
  );
}
