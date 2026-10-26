"use client";

import React from "react";
import { KpiOcupacionData } from "@/types/profesionales";
import {
  Building2,
  PieChart,
  CheckCircle2,
  Clock,
  DoorOpen,
  DollarSign,
} from "lucide-react";

interface KpiOcupacionBannerProps {
  readonly kpis: KpiOcupacionData;
}

export function KpiOcupacionBanner({ kpis }: KpiOcupacionBannerProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
      {/* 1. Consultorios Totales */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 truncate">
            Consultorios
          </span>
          <div className="p-1 rounded-lg bg-slate-100 text-slate-600">
            <Building2 className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="text-xl font-extrabold text-slate-900 font-mono">
          {kpis.consultoriosTotales}
        </div>
        <span className="text-[11px] text-emerald-700 font-medium">
          {kpis.consultoriosHabilitados} habilitados
        </span>
      </div>

      {/* 2. Ocupación Hoy */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 truncate">
            Ocupación Hoy
          </span>
          <div className="p-1 rounded-lg bg-sky-50 text-sky-600">
            <PieChart className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="text-xl font-extrabold text-sky-700 font-mono">
          {kpis.ocupacionPorcentaje}%
        </div>
        <span className="text-[11px] text-slate-500">
          28 de {kpis.turnosTotales} turnos
        </span>
      </div>

      {/* 3. Turnos Confirmados */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 truncate">
            Confirmados
          </span>
          <div className="p-1 rounded-lg bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="text-xl font-extrabold text-slate-900 font-mono">
          {kpis.turnosConfirmados}
        </div>
        <span className="text-[11px] text-emerald-600 font-semibold">
          {kpis.turnosConfirmadosPct}% del total
        </span>
      </div>

      {/* 4. Turnos Pendientes */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 truncate">
            Pendientes
          </span>
          <div className="p-1 rounded-lg bg-amber-50 text-amber-600">
            <Clock className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="text-xl font-extrabold text-slate-900 font-mono">
          {kpis.turnosPendientes}
        </div>
        <span className="text-[11px] text-amber-700 font-semibold">
          {kpis.turnosPendientesPct}% por confirmar
        </span>
      </div>

      {/* 5. Consultorios Libres */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 truncate">
            Libres Ahora
          </span>
          <div className="p-1 rounded-lg bg-teal-50 text-teal-600">
            <DoorOpen className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="text-xl font-extrabold text-teal-700 font-mono">
          {kpis.consultoriosLibres}
        </div>
        <span className="text-[11px] text-slate-500">
          Disponible ahora
        </span>
      </div>

      {/* 6. Ingresos por Alquiler Hoy */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 truncate">
            Ingresos Alquiler
          </span>
          <div className="p-1 rounded-lg bg-indigo-50 text-indigo-600">
            <DollarSign className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="text-xl font-extrabold text-slate-900 font-mono truncate">
          ${(kpis.ingresosAlquilerHoy / 1000).toFixed(0)}k
        </div>
        <span className="text-[11px] text-indigo-600 font-semibold truncate">
          $ {kpis.ingresosAlquilerHoy.toLocaleString("es-AR")} hoy
        </span>
      </div>
    </div>
  );
}
