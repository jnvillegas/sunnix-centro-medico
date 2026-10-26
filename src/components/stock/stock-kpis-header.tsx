"use client";

import React from "react";
import { KpiStockSummary } from "@/types/stock";
import { MOCK_STOCK_KPIS } from "@/lib/data/mock-stock";
import {
  Boxes,
  CheckCircle2,
  AlertTriangle,
  Bell,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";

interface StockKpisHeaderProps {
  readonly kpis?: KpiStockSummary;
}

export function StockKpisHeader({ kpis = MOCK_STOCK_KPIS }: StockKpisHeaderProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {/* 1. Total de Insumos */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between hover:border-slate-300 transition-all">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Total Insumos
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">
              {kpis.totalInsumos}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 block">
            En inventario central
          </span>
        </div>

        <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-2xs shrink-0">
          <Boxes className="w-6 h-6 stroke-[2]" />
        </div>
      </div>

      {/* 2. Con Stock Normal */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between hover:border-slate-300 transition-all">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Stock Normal
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">
              {kpis.stockNormalConteo}
            </span>
            <span className="text-xs font-bold text-emerald-600">
              ({kpis.stockNormalPct}%)
            </span>
          </div>
          <span className="text-[11px] text-slate-400 block">
            Nivel óptimo operativo
          </span>
        </div>

        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-2xs shrink-0">
          <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
        </div>
      </div>

      {/* 3. Stock Bajo */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between hover:border-slate-300 transition-all">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Stock Bajo
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">
              {kpis.stockBajoConteo}
            </span>
            <span className="text-xs font-bold text-amber-600">
              ({kpis.stockBajoPct}%)
            </span>
          </div>
          <span className="text-[11px] text-slate-400 block">
            Requiere reposición
          </span>
        </div>

        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shadow-2xs shrink-0">
          <AlertTriangle className="w-6 h-6 stroke-[2.5]" />
        </div>
      </div>

      {/* 4. Sin Stock */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between hover:border-slate-300 transition-all">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Sin Stock
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">
              {kpis.sinStockConteo}
            </span>
            <span className="text-xs font-bold text-rose-600">
              ({kpis.sinStockPct}%)
            </span>
          </div>
          <span className="text-[11px] text-slate-400 block">
            Falta crítica en clínica
          </span>
        </div>

        <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shadow-2xs shrink-0">
          <Bell className="w-6 h-6 stroke-[2.5]" />
        </div>
      </div>

      {/* 5. Consumo del Mes */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between hover:border-slate-300 transition-all">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Consumo Mes
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 font-mono">
              ${kpis.consumoMes.toLocaleString("es-AR")}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-purple-600">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{kpis.consumoMesTendenciaPct}% vs. mes anterior</span>
          </div>
        </div>

        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shadow-2xs shrink-0">
          <ShoppingCart className="w-6 h-6 stroke-[2]" />
        </div>
      </div>
    </div>
  );
}
