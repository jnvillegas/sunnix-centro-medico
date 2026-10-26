"use client";

import React, { useState } from "react";
import { AntiguedadSaldoItem } from "@/types/finanzas";
import { MOCK_ANTIGUEDAD_SALDOS } from "@/lib/data/mock-finanzas";
import {
  Percent,
  Calculator,
  CalendarDays,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";

interface MoraYAntiguedadPanelProps {
  readonly antiguedad?: readonly AntiguedadSaldoItem[];
  readonly tasaMensualBase?: number;
}

export function MoraYAntiguedadPanel({
  antiguedad = MOCK_ANTIGUEDAD_SALDOS,
  tasaMensualBase = 2.0,
}: MoraYAntiguedadPanelProps) {
  // Simulador interactivo de mora
  const [montoSimulado, setMontoSimulado] = useState<number>(50000);
  const [diasSimulados, setDiasSimulados] = useState<number>(20);
  const [tasaSimulada, setTasaSimulada] = useState<number>(tasaMensualBase);

  const tasaDiaria = tasaSimulada / (100 * 30);
  const interesSimulado = Math.round(montoSimulado * tasaDiaria * diasSimulados * 100) / 100;
  const totalSimulado = montoSimulado + interesSimulado;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* 1. Widget Motor de Mora y Simulador */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Calculator className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Parámetros del motor de mora
                </h3>
                <span className="text-[11px] text-slate-400">
                  Cálculo automático y proporcional diario
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200/80 rounded-xl text-xs font-bold font-mono">
              <Percent className="w-3.5 h-3.5" />
              <span>{tasaSimulada.toFixed(2)}% mensual</span>
            </div>
          </div>

          {/* Explicación Técnica y Regulatoria */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2 mb-4">
            <div className="flex items-center gap-2 text-slate-700 font-semibold">
              <ShieldAlert className="w-3.5 h-3.5 text-blue-600" />
              <span>Regla institucional de recargos punitorios</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Tasa diaria aplicada: <strong className="text-slate-700 font-mono">{(tasaSimulada / 30).toFixed(4)}%</strong> (proporcional sobre mes de 30 días). El interés se liquida a partir del día 1 posterior al vencimiento.
            </p>
          </div>

          {/* Simulador Interactivo */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Simulador rápido de liquidación
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <label className="text-[11px] text-slate-500 block mb-1">
                  Monto base ($)
                </label>
                <input
                  type="number"
                  value={montoSimulado}
                  onChange={(e) => setMontoSimulado(Math.max(0, Number(e.target.value)))}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-mono font-semibold text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-500 block mb-1">
                  Días de atraso
                </label>
                <input
                  type="number"
                  value={diasSimulados}
                  onChange={(e) => setDiasSimulados(Math.max(0, Number(e.target.value)))}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-mono font-semibold text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-500 block mb-1">
                  Tasa mensual (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={tasaSimulada}
                  onChange={(e) => setTasaSimulada(Math.max(0, Number(e.target.value)))}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-mono font-semibold text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Resultado de la Simulación */}
            <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
              <div>
                <span className="text-[11px] text-emerald-800 block">
                  Interés generado: <strong className="font-mono text-emerald-900">+${interesSimulado.toLocaleString("es-AR")}</strong>
                </span>
                <span className="text-xs font-bold text-emerald-900">
                  Total simulado:
                </span>
              </div>
              <span className="font-mono font-extrabold text-base text-emerald-700">
                ${totalSimulado.toLocaleString("es-AR")}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Actualización automática en toda la plataforma</span>
          <span className="text-blue-600 font-semibold hover:underline cursor-pointer">
            Editar política de tasas
          </span>
        </div>
      </div>

      {/* 2. Widget Antigüedad de Saldos */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <CalendarDays className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Antigüedad de saldos
                </h3>
                <span className="text-[11px] text-slate-400">
                  Distribución por tramos de vencimiento
                </span>
              </div>
            </div>

            <span className="text-xs font-mono font-bold text-purple-600">
              Total: $8.450.000
            </span>
          </div>

          {/* Barras de distribución de Antigüedad */}
          <div className="space-y-3.5">
            {antiguedad.map((item) => (
              <div key={item.tramo} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-semibold text-slate-800">
                      {item.tramo}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      ({item.dias})
                    </span>
                  </div>

                  <div className="text-right flex items-center gap-2 font-mono">
                    <span className="font-bold text-slate-900 text-xs">
                      ${item.monto.toLocaleString("es-AR")}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {item.porcentaje}%
                    </span>
                  </div>
                </div>

                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
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

        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Deuda crítica (&gt;60 días): 20% del total</span>
          <span className="text-rose-600 font-semibold hover:underline cursor-pointer flex items-center gap-1">
            <span>Iniciar gestión prejudicial</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
}
