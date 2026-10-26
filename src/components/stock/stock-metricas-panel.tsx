"use client";

import React from "react";
import {
  MetricaCategoriaStock,
  ConsumoInsumoHistorico,
  InsumoItem,
} from "@/types/stock";
import {
  MOCK_METRICAS_CATEGORIA,
  MOCK_CONSUMO_HISTORICO,
  MOCK_INSUMOS,
} from "@/lib/data/mock-stock";
import {
  PieChart,
  AlertTriangle,
  TrendingUp,
  Boxes,
} from "lucide-react";

interface StockMetricasPanelProps {
  readonly metricasCategoria?: readonly MetricaCategoriaStock[];
  readonly consumoHistorico?: readonly ConsumoInsumoHistorico[];
  readonly insumosCriticos?: readonly InsumoItem[];
  readonly onSelectInsumo?: (insumo: InsumoItem) => void;
}

export function StockMetricasPanel({
  metricasCategoria = MOCK_METRICAS_CATEGORIA,
  consumoHistorico = MOCK_CONSUMO_HISTORICO,
  insumosCriticos,
  onSelectInsumo,
}: StockMetricasPanelProps) {
  const itemsCriticos =
    insumosCriticos ??
    MOCK_INSUMOS.filter(
      (i) => i.estado === "sin_stock" || i.estado === "stock_bajo"
    ).slice(0, 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* 1. Stock por Categoría */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <PieChart className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">
                Stock por categoría
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-slate-400">
              256 ítems
            </span>
          </div>

          {/* Barra Segmentada de Proporción General */}
          <div className="w-full h-3 rounded-full overflow-hidden flex shadow-2xs mb-4">
            {metricasCategoria.map((cat) => (
              <div
                key={cat.categoria}
                style={{
                  width: `${cat.porcentaje}%`,
                  backgroundColor: cat.color,
                }}
                title={`${cat.etiqueta}: ${cat.porcentaje}% (${cat.cantidad} u)`}
                className="h-full hover:opacity-90 transition-opacity"
              />
            ))}
          </div>

          {/* Lista detallada de Categorías con barras */}
          <div className="space-y-2.5">
            {metricasCategoria.map((cat) => (
              <div key={cat.categoria} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="font-medium text-slate-700">
                      {cat.etiqueta}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[11px]">
                    <span className="text-slate-400">({cat.cantidad} ítems)</span>
                    <span className="font-bold text-slate-800">
                      {cat.porcentaje}%
                    </span>
                  </div>
                </div>

                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${cat.porcentaje}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Categoría principal: Descartables</span>
          <span className="font-semibold text-slate-600">6 categorías</span>
        </div>
      </div>

      {/* 2. Insumos con Stock Bajo o Sin Stock */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">
                Insumos críticos en falta
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-amber-600 font-mono">
              58 afectados
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {itemsCriticos.map((item) => {
              const ratio =
                item.stockMinimo > 0
                  ? Math.min(
                      100,
                      Math.round((item.stockActual / item.stockMinimo) * 100)
                    )
                  : 0;

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectInsumo?.(item)}
                  className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between hover:bg-slate-50/70 rounded-xl px-1.5 transition-colors cursor-pointer"
                >
                  <div className="min-w-0 pr-3">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[10px] font-bold text-slate-500">
                        {item.codigo}
                      </span>
                      <span className="font-semibold text-xs text-slate-900 truncate">
                        {item.nombre}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 block truncate">
                      {item.ubicacion}
                    </span>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="flex items-baseline justify-end gap-1">
                      <span
                        className={`font-mono font-extrabold text-xs ${
                          item.estado === "sin_stock"
                            ? "text-rose-600"
                            : "text-amber-600"
                        }`}
                      >
                        {item.stockActual} u
                      </span>
                      <span className="text-[10px] text-slate-400">
                        / {item.stockMinimo} u
                      </span>
                    </div>

                    <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1 ml-auto">
                      <div
                        className={`h-full rounded-full ${
                          item.estado === "sin_stock"
                            ? "bg-rose-500"
                            : "bg-amber-500"
                        }`}
                        style={{ width: `${ratio}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <Boxes className="w-3.5 h-3.5 text-slate-400" />
            <span>Alerta de reposición automática</span>
          </div>
          <span className="text-blue-600 font-semibold hover:underline cursor-pointer">
            Ver todas las alertas
          </span>
        </div>
      </div>

      {/* 3. Consumo de Insumos (Consumo vs Compras vs Tendencia) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">
                Consumo de insumos
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-slate-400">
              Últimos 6 meses
            </span>
          </div>

          {/* Gráfico comparativo de barras mensuales */}
          <div className="pt-2 pb-1">
            <div className="h-36 flex items-end justify-between gap-2.5 px-2">
              {consumoHistorico.map((m) => {
                // Normalizado para altura visual máxima $1.500.000 = 100%
                const maxVal = 1500000;
                const consumoH = Math.round((m.consumoMonto / maxVal) * 100);
                const comprasH = Math.round((m.comprasMonto / maxVal) * 100);

                return (
                  <div
                    key={m.mes}
                    className="flex-1 flex flex-col items-center h-full justify-end group"
                  >
                    <div className="w-full flex items-end justify-center gap-1 h-[85%]">
                      {/* Barra Consumo (Morada) */}
                      <div
                        className="w-1/2 max-w-[14px] bg-purple-500 rounded-t-sm hover:brightness-110 transition-all"
                        style={{ height: `${consumoH}%` }}
                        title={`Consumo ${m.mes}: $${m.consumoMonto.toLocaleString("es-AR")}`}
                      />

                      {/* Barra Compras (Azul) */}
                      <div
                        className="w-1/2 max-w-[14px] bg-blue-500 rounded-t-sm hover:brightness-110 transition-all"
                        style={{ height: `${comprasH}%` }}
                        title={`Compras ${m.mes}: $${m.comprasMonto.toLocaleString("es-AR")}`}
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
        <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-center gap-5 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0" />
            <span className="text-slate-600 font-medium">Consumo mensual</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
            <span className="text-slate-600 font-medium">Compras realizadas</span>
          </div>
        </div>
      </div>
    </div>
  );
}
