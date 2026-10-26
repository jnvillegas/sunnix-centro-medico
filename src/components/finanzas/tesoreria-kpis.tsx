"use client";

import React from "react";
import { KpiTesoreriaSummary } from "@/types/finanzas";
import { MOCK_TESORERIA_KPIS } from "@/lib/data/mock-finanzas";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Receipt,
  CreditCard,
  Plus,
} from "lucide-react";

interface TesoreriaKpisProps {
  readonly kpis?: KpiTesoreriaSummary;
  readonly onNuevoMovimiento?: () => void;
}

export function TesoreriaKpis({
  kpis = MOCK_TESORERIA_KPIS,
  onNuevoMovimiento,
}: TesoreriaKpisProps) {
  return (
    <div className="space-y-4">
      {/* Botón de acción rápida superior */}
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Resumen ejecutivo del período
        </h2>
        <button
          type="button"
          onClick={onNuevoMovimiento}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>+ Nuevo movimiento</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* 1. Ingresos Totales */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between hover:border-slate-300 transition-all">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Ingresos Totales
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900 font-mono">
                ${kpis.ingresosTotales.toLocaleString("es-AR")}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
              <TrendingUp className="w-3 h-3" />
              <span>+{kpis.ingresosTendenciaPct}% vs. mes anterior</span>
            </div>
          </div>

          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-2xs shrink-0">
            <TrendingUp className="w-6 h-6 stroke-[2.5]" />
          </div>
        </div>

        {/* 2. Egresos Totales */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between hover:border-slate-300 transition-all">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Egresos Totales
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900 font-mono">
                ${kpis.egresosTotales.toLocaleString("es-AR")}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-rose-600">
              <TrendingDown className="w-3 h-3" />
              <span>+{kpis.egresosTendenciaPct}% vs. mes anterior</span>
            </div>
          </div>

          <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shadow-2xs shrink-0">
            <TrendingDown className="w-6 h-6 stroke-[2.5]" />
          </div>
        </div>

        {/* 3. Resultado del Mes */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between hover:border-slate-300 transition-all">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Resultado del Mes
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900 font-mono">
                ${kpis.resultadoMes.toLocaleString("es-AR")}
              </span>
            </div>
            <span className="text-[11px] font-bold text-blue-600 block">
              Rentabilidad: {kpis.rentabilidadPct}%
            </span>
          </div>

          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shadow-2xs shrink-0">
            <DollarSign className="w-6 h-6 stroke-[2.5]" />
          </div>
        </div>

        {/* 4. Cuentas por Cobrar */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between hover:border-slate-300 transition-all">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Cuentas por Cobrar
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900 font-mono">
                ${kpis.cuentasPorCobrarMonto.toLocaleString("es-AR")}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 block">
              {kpis.cuentasPorCobrarComprobantes} comprobantes emitidos
            </span>
          </div>

          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shadow-2xs shrink-0">
            <Receipt className="w-6 h-6 stroke-[2]" />
          </div>
        </div>

        {/* 5. Cuentas por Pagar */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between hover:border-slate-300 transition-all">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Cuentas por Pagar
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900 font-mono">
                ${kpis.cuentasPorPagarMonto.toLocaleString("es-AR")}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 block">
              {kpis.cuentasPorPagarComprobantes} facturas a proveedores
            </span>
          </div>

          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shadow-2xs shrink-0">
            <CreditCard className="w-6 h-6 stroke-[2]" />
          </div>
        </div>
      </div>
    </div>
  );
}
