"use client";

import React from "react";
import { ResumenEjecutivoStrip as IResumenEjecutivoStrip } from "@/types/reportes";
import { MOCK_RESUMEN_EJECUTIVO_STRIP } from "@/lib/data/mock-reportes";
import {
  Calendar,
  UserCheck,
  TrendingUp,
  TrendingDown,
  PieChart,
} from "lucide-react";

interface ResumenEjecutivoStripProps {
  readonly resumen?: IResumenEjecutivoStrip;
}

export function ResumenEjecutivoStrip({
  resumen = MOCK_RESUMEN_EJECUTIVO_STRIP,
}: ResumenEjecutivoStripProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2.5">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Consolidado mensual de inteligencia operativa
        </span>
        <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
          Período auditado: Mayo 2025
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* 1. Turnos Totales */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-medium block">
              Turnos Totales
            </span>
            <span className="text-xl font-extrabold text-slate-900 font-mono">
              {resumen.turnosTotales.toLocaleString("es-AR")}
            </span>
          </div>
        </div>

        {/* 2. Asistencia Global */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <UserCheck className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-medium block">
              Asistencia Global
            </span>
            <span className="text-xl font-extrabold text-emerald-600 font-mono">
              {resumen.porcentajeAsistenciaGlobal}%
            </span>
          </div>
        </div>

        {/* 3. Facturación Total */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-medium block">
              Facturación Total
            </span>
            <span className="text-xl font-extrabold text-slate-900 font-mono">
              ${resumen.facturacionTotal.toLocaleString("es-AR")}
            </span>
          </div>
        </div>

        {/* 4. Egresos Operativos */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <TrendingDown className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-medium block">
              Egresos Operativos
            </span>
            <span className="text-xl font-extrabold text-slate-900 font-mono">
              ${resumen.egresosTotales.toLocaleString("es-AR")}
            </span>
          </div>
        </div>

        {/* 5. Margen Neto */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0">
            <PieChart className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-medium block">
              Margen de Rentabilidad
            </span>
            <span className="text-xl font-extrabold text-cyan-700 font-mono">
              {resumen.margenRentabilidadPct}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
