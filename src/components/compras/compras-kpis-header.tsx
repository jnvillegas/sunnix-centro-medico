"use client";

import React from "react";
import { KpiComprasSummary } from "@/types/stock";
import { MOCK_COMPRAS_KPIS } from "@/lib/data/mock-stock";
import {
  Building2,
  FileCheck2,
  DollarSign,
  PackageCheck,
  Calculator,
} from "lucide-react";

interface ComprasKpisHeaderProps {
  readonly kpis?: KpiComprasSummary;
}

export function ComprasKpisHeader({ kpis = MOCK_COMPRAS_KPIS }: ComprasKpisHeaderProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {/* 1. Proveedores Activos */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between hover:border-slate-300 transition-all">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Proveedores Activos
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">
              {kpis.proveedoresActivos}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 block">
            Homologados en clínica
          </span>
        </div>

        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shadow-2xs shrink-0">
          <Building2 className="w-6 h-6 stroke-[2]" />
        </div>
      </div>

      {/* 2. Órdenes de Compra */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between hover:border-slate-300 transition-all">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Órdenes de Compra
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">
              {kpis.ordenesCompraConteo}
            </span>
            <span className="text-xs font-bold text-emerald-600">
              (Mes en curso)
            </span>
          </div>
          <span className="text-[11px] text-slate-400 block">
            4 pendientes de entrega
          </span>
        </div>

        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-2xs shrink-0">
          <FileCheck2 className="w-6 h-6 stroke-[2]" />
        </div>
      </div>

      {/* 3. Compras del Mes */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between hover:border-slate-300 transition-all">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Compras del Mes
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 font-mono">
              ${kpis.comprasMesMonto.toLocaleString("es-AR")}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 block">
            Facturación acumulada
          </span>
        </div>

        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shadow-2xs shrink-0">
          <DollarSign className="w-6 h-6 stroke-[2.5]" />
        </div>
      </div>

      {/* 4. Productos Comprados */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between hover:border-slate-300 transition-all">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Productos Comprados
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">
              {kpis.productosCompradosConteo}
            </span>
            <span className="text-xs font-bold text-amber-600">
              unidades
            </span>
          </div>
          <span className="text-[11px] text-slate-400 block">
            Ingresadas a stock
          </span>
        </div>

        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shadow-2xs shrink-0">
          <PackageCheck className="w-6 h-6 stroke-[2]" />
        </div>
      </div>

      {/* 5. Gasto Promedio */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between hover:border-slate-300 transition-all">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Gasto Promedio
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 font-mono">
              ${kpis.gastoPromedioMonto.toLocaleString("es-AR")}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 block">
            Por orden ejecutada
          </span>
        </div>

        <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 shadow-2xs shrink-0">
          <Calculator className="w-6 h-6 stroke-[2]" />
        </div>
      </div>
    </div>
  );
}
