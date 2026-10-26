"use client";

import React, { useState } from "react";
import { MovimientoTesoreria } from "@/types/finanzas";
import {
  MOCK_MOVIMIENTOS_INGRESOS,
  MOCK_MOVIMIENTOS_EGRESOS,
} from "@/lib/data/mock-finanzas";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  Banknote,
  Building,
  CheckCircle2,
  FileCheck2,
} from "lucide-react";

interface TablasMovimientosPanelProps {
  readonly ingresos?: readonly MovimientoTesoreria[];
  readonly egresos?: readonly MovimientoTesoreria[];
  readonly onVerMovimiento?: (mov: MovimientoTesoreria) => void;
}

export function TablasMovimientosPanel({
  ingresos = MOCK_MOVIMIENTOS_INGRESOS,
  egresos = MOCK_MOVIMIENTOS_EGRESOS,
  onVerMovimiento,
}: TablasMovimientosPanelProps) {
  const [activeTab, setActiveTab] = useState<"ingresos" | "egresos">("ingresos");

  const movimientosActuales = activeTab === "ingresos" ? ingresos : egresos;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                activeTab === "ingresos"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-rose-50 text-rose-600"
              }`}
            >
              {activeTab === "ingresos" ? (
                <ArrowDownLeft className="w-4 h-4" />
              ) : (
                <ArrowUpRight className="w-4 h-4" />
              )}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Libro diario de tesorería
              </h3>
              <span className="text-[11px] text-slate-400">
                Últimos movimientos asentados en caja y bancos
              </span>
            </div>
          </div>

          {/* Sub-tabs Conmutador Ingresos / Egresos */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab("ingresos")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === "ingresos"
                  ? "bg-white text-emerald-700 shadow-2xs font-bold"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-600" />
              <span>Ingresos ({ingresos.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("egresos")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === "egresos"
                  ? "bg-white text-rose-700 shadow-2xs font-bold"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <ArrowUpRight className="w-3.5 h-3.5 text-rose-600" />
              <span>Egresos ({egresos.length})</span>
            </button>
          </div>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/75 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-2.5 px-3">Fecha y Hora</th>
                <th className="py-2.5 px-4">Concepto</th>
                <th className="py-2.5 px-3">Categoría</th>
                <th className="py-2.5 px-4">
                  {activeTab === "ingresos" ? "Paciente / Origen" : "Proveedor / Destino"}
                </th>
                <th className="py-2.5 px-3">Medio de Pago</th>
                <th className="py-2.5 px-4 text-right">Monto</th>
                <th className="py-2.5 px-3 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {movimientosActuales.map((mov) => (
                <tr
                  key={mov.id}
                  onClick={() => onVerMovimiento?.(mov)}
                  className="hover:bg-slate-50/70 cursor-pointer transition-colors"
                >
                  {/* Fecha */}
                  <td className="py-3 px-3 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                    {mov.fecha}
                  </td>

                  {/* Concepto */}
                  <td className="py-3 px-4 font-semibold text-slate-900 whitespace-nowrap">
                    {mov.concepto}
                  </td>

                  {/* Categoría */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="inline-flex px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                      {mov.categoria}
                    </span>
                  </td>

                  {/* Origen / Destino */}
                  <td className="py-3 px-4 text-slate-700 whitespace-nowrap">
                    {mov.origenODestino}
                  </td>

                  {/* Medio de Pago */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 text-slate-600 capitalize">
                      {mov.medioPago === "transferencia" ? (
                        <Building className="w-3.5 h-3.5 text-blue-500" />
                      ) : mov.medioPago === "tarjeta" ? (
                        <CreditCard className="w-3.5 h-3.5 text-purple-500" />
                      ) : mov.medioPago === "efectivo" ? (
                        <Banknote className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <FileCheck2 className="w-3.5 h-3.5 text-slate-500" />
                      )}
                      <span>{mov.medioPago}</span>
                    </span>
                  </td>

                  {/* Monto */}
                  <td className="py-3 px-4 text-right font-mono font-bold text-sm whitespace-nowrap">
                    <span
                      className={
                        mov.tipo === "ingreso"
                          ? "text-emerald-600"
                          : "text-rose-600"
                      }
                    >
                      {mov.tipo === "ingreso" ? "+" : "-"}$
                      {mov.monto.toLocaleString("es-AR")}
                    </span>
                  </td>

                  {/* Estado */}
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                        mov.tipo === "ingreso"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-blue-50 text-blue-700 border-blue-200"
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{mov.estado}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <div>
          Mostrando {movimientosActuales.length} movimientos de {activeTab}
        </div>
        <span className="text-blue-600 font-semibold hover:underline cursor-pointer">
          Descargar libro diario (PDF / Excel)
        </span>
      </div>
    </div>
  );
}
