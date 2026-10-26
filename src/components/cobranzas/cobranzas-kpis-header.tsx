"use client";

import React from "react";
import { KpiCobranzasSummary } from "@/types/finanzas";
import { MOCK_COBRANZAS_KPIS } from "@/lib/data/mock-finanzas";
import {
  Receipt,
  AlertCircle,
  Clock,
  CheckCircle2,
} from "lucide-react";

interface CobranzasKpisHeaderProps {
  readonly kpis?: KpiCobranzasSummary;
}

export function CobranzasKpisHeader({
  kpis = MOCK_COBRANZAS_KPIS,
}: CobranzasKpisHeaderProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total por Cobrar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between hover:border-slate-300 transition-all">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Total por Cobrar
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">
              ${kpis.totalPorCobrar.toLocaleString("es-AR")}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 block">
            {kpis.totalFacturas} facturas emitidas
          </span>
        </div>

        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shadow-2xs shrink-0">
          <Receipt className="w-6 h-6 stroke-[2]" />
        </div>
      </div>

      {/* 2. Vencidas */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between hover:border-slate-300 transition-all">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Vencidas (En Mora)
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">
              ${kpis.vencidasMonto.toLocaleString("es-AR")}
            </span>
          </div>
          <span className="text-[11px] font-bold text-rose-600 block">
            {kpis.vencidasFacturas} facturas con recargo punitorio
          </span>
        </div>

        <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shadow-2xs shrink-0">
          <AlertCircle className="w-6 h-6 stroke-[2.5]" />
        </div>
      </div>

      {/* 3. Por Vencer (Próx. 7 días) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between hover:border-slate-300 transition-all">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Por Vencer (7 días)
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">
              ${kpis.porVencerMonto.toLocaleString("es-AR")}
            </span>
          </div>
          <span className="text-[11px] font-bold text-amber-600 block">
            {kpis.porVencerFacturas} facturas en seguimiento
          </span>
        </div>

        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shadow-2xs shrink-0">
          <Clock className="w-6 h-6 stroke-[2.5]" />
        </div>
      </div>

      {/* 4. Al Día */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between hover:border-slate-300 transition-all">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Al Día (Sin Vencer)
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">
              ${kpis.alDiaMonto.toLocaleString("es-AR")}
            </span>
          </div>
          <span className="text-[11px] font-bold text-emerald-600 block">
            {kpis.alDiaFacturas} facturas en plazo
          </span>
        </div>

        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-2xs shrink-0">
          <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
        </div>
      </div>
    </div>
  );
}
