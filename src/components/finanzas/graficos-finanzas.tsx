"use client";

import React from "react";
import {
  EvolucionFinancieraMes,
  DistribucionEgresoItem,
  ResumenCategoriaIngresoItem,
} from "@/types/finanzas";
import {
  MOCK_EVOLUCION_FINANCIERA,
  MOCK_DISTRIBUCION_EGRESOS,
  MOCK_RESUMEN_CATEGORIA_INGRESOS,
} from "@/lib/data/mock-finanzas";
import {
  TrendingUp,
  PieChart,
  BadgeDollarSign,
} from "lucide-react";

interface GraficosFinanzasProps {
  readonly evolucion?: readonly EvolucionFinancieraMes[];
  readonly egresos?: readonly DistribucionEgresoItem[];
  readonly ingresosPorCategoria?: readonly ResumenCategoriaIngresoItem[];
}

export function GraficosFinanzas({
  evolucion = MOCK_EVOLUCION_FINANCIERA,
  egresos = MOCK_DISTRIBUCION_EGRESOS,
  ingresosPorCategoria = MOCK_RESUMEN_CATEGORIA_INGRESOS,
}: GraficosFinanzasProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* 1. Evolución Mensual Comparativa */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">
                Evolución de flujo de fondos
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-slate-400">
              Últimos 6 meses
            </span>
          </div>

          {/* Gráfico de barras duales */}
          <div className="pt-2 pb-1">
            <div className="h-40 flex items-end justify-between gap-2 px-1">
              {evolucion.map((m) => {
                const maxVal = 13000000;
                const hIngresos = Math.round((m.ingresos / maxVal) * 100);
                const hEgresos = Math.round((m.egresos / maxVal) * 100);

                return (
                  <div
                    key={m.mes}
                    className="flex-1 flex flex-col items-center h-full justify-end group"
                  >
                    <div className="w-full flex items-end justify-center gap-1 h-[85%]">
                      {/* Barra Ingresos (Verde) */}
                      <div
                        className="w-1/2 max-w-[14px] bg-emerald-500 rounded-t-sm hover:brightness-110 transition-all"
                        style={{ height: `${hIngresos}%` }}
                        title={`Ingresos ${m.mes}: $${m.ingresos.toLocaleString("es-AR")}`}
                      />

                      {/* Barra Egresos (Roja) */}
                      <div
                        className="w-1/2 max-w-[14px] bg-rose-500 rounded-t-sm hover:brightness-110 transition-all"
                        style={{ height: `${hEgresos}%` }}
                        title={`Egresos ${m.mes}: $${m.egresos.toLocaleString("es-AR")}`}
                      />
                    </div>

                    <span className="text-[11px] font-bold text-slate-600 mt-2">
                      {m.mes}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Leyenda */}
        <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-center gap-6 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
            <span className="text-slate-600 font-medium">Ingresos</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
            <span className="text-slate-600 font-medium">Egresos</span>
          </div>
        </div>
      </div>

      {/* 2. Donut / Distribución de Egresos */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <PieChart className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">
                Distribución de egresos
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-rose-600 font-mono">
              $7.320.000
            </span>
          </div>

          {/* Barra Segmentada de Proporción General */}
          <div className="w-full h-3 rounded-full overflow-hidden flex shadow-2xs mb-3.5">
            {egresos.map((item) => (
              <div
                key={item.categoria}
                style={{
                  width: `${item.porcentaje}%`,
                  backgroundColor: item.color,
                }}
                title={`${item.categoria}: ${item.porcentaje}% ($${item.monto.toLocaleString("es-AR")})`}
                className="h-full hover:opacity-90 transition-opacity"
              />
            ))}
          </div>

          <div className="space-y-2">
            {egresos.map((item) => (
              <div key={item.categoria} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium text-slate-700">
                      {item.categoria}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[11px]">
                    <span className="text-slate-400">
                      ${item.monto.toLocaleString("es-AR")}
                    </span>
                    <span className="font-bold text-slate-800">
                      {item.porcentaje}%
                    </span>
                  </div>
                </div>

                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${item.porcentaje}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Gasto principal: Insumos (32%)</span>
          <span className="font-semibold text-slate-600">6 centros de costo</span>
        </div>
      </div>

      {/* 3. Resumen por Categoría de Ingresos */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <BadgeDollarSign className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">
                Ingresos por prestación
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 font-mono">
              $12.450.000
            </span>
          </div>

          {/* Barra Segmentada de Proporción General */}
          <div className="w-full h-3 rounded-full overflow-hidden flex shadow-2xs mb-3.5">
            {ingresosPorCategoria.map((item) => (
              <div
                key={item.categoria}
                style={{
                  width: `${item.porcentaje}%`,
                  backgroundColor: item.color,
                }}
                title={`${item.categoria}: ${item.porcentaje}% ($${item.monto.toLocaleString("es-AR")})`}
                className="h-full hover:opacity-90 transition-opacity"
              />
            ))}
          </div>

          <div className="space-y-2">
            {ingresosPorCategoria.map((item) => (
              <div key={item.categoria} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium text-slate-700">
                      {item.categoria}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[11px]">
                    <span className="text-slate-400">
                      ${item.monto.toLocaleString("es-AR")}
                    </span>
                    <span className="font-bold text-slate-800">
                      {item.porcentaje}%
                    </span>
                  </div>
                </div>

                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${item.porcentaje}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Mayor generador: Consultas médicas</span>
          <span className="font-semibold text-slate-600">43% de ingresos</span>
        </div>
      </div>
    </div>
  );
}
