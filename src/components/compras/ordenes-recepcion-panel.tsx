"use client";

import React, { useState } from "react";
import {
  OrdenCompraItem,
  RecepcionMercaderiaItem,
  RubroGastoItem,
} from "@/types/stock";
import {
  MOCK_ORDENES_COMPRA,
  MOCK_RECEPCIONES,
  MOCK_RUBROS_GASTO,
} from "@/lib/data/mock-stock";
import {
  ShoppingCart,
  PackageCheck,
  PieChart,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  FileText,
} from "lucide-react";

interface OrdenesRecepcionPanelProps {
  readonly ordenes?: readonly OrdenCompraItem[];
  readonly recepciones?: readonly RecepcionMercaderiaItem[];
  readonly rubros?: readonly RubroGastoItem[];
  readonly onVerOC?: (oc: OrdenCompraItem) => void;
  readonly onVerRecepcion?: (rc: RecepcionMercaderiaItem) => void;
}

export function OrdenesRecepcionPanel({
  ordenes = MOCK_ORDENES_COMPRA,
  recepciones = MOCK_RECEPCIONES,
  rubros = MOCK_RUBROS_GASTO,
  onVerOC,
  onVerRecepcion,
}: OrdenesRecepcionPanelProps) {
  const [activeTab, setActiveTab] = useState<"ordenes" | "recepciones">("ordenes");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* 1 & 2. Tabla de Órdenes de Compra / Recepciones (Ocupa 2 columnas en pantallas grandes) */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShoppingCart className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">
                Circuito de adquisiciones y recepciones
              </h3>
            </div>

            {/* Sub-tabs para alternar entre Órdenes y Recepciones */}
            <div className="inline-flex p-1 bg-slate-100 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab("ordenes")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === "ordenes"
                    ? "bg-white text-slate-900 shadow-2xs font-bold"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Órdenes de Compra ({ordenes.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("recepciones")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === "recepciones"
                    ? "bg-white text-slate-900 shadow-2xs font-bold"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <PackageCheck className="w-3.5 h-3.5" />
                <span>Recepción de Mercadería ({recepciones.length})</span>
              </button>
            </div>
          </div>

          {/* VISTA 1: Órdenes de Compra */}
          {activeTab === "ordenes" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-2.5 px-2">N° Orden</th>
                    <th className="py-2.5 px-3">Proveedor</th>
                    <th className="py-2.5 px-2">Fecha</th>
                    <th className="py-2.5 px-3 text-right">Monto Total</th>
                    <th className="py-2.5 px-3 text-center">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {ordenes.map((oc) => (
                    <tr
                      key={oc.id}
                      onClick={() => onVerOC?.(oc)}
                      className="hover:bg-slate-50/70 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-2 font-mono font-bold text-blue-700 whitespace-nowrap">
                        {oc.numeroOrden}
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-800 whitespace-nowrap">
                        {oc.proveedorNombre}
                      </td>
                      <td className="py-3 px-2 font-mono text-slate-500 whitespace-nowrap text-[11px]">
                        {oc.fecha}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                        ${oc.montoTotal.toLocaleString("es-AR")}
                      </td>
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        {oc.estado === "recepcionada" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Recepcionada</span>
                          </span>
                        )}
                        {oc.estado === "en_transito" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                            <Truck className="w-3 h-3" />
                            <span>En tránsito</span>
                          </span>
                        )}
                        {oc.estado === "pendiente" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                            <Clock className="w-3 h-3" />
                            <span>Pendiente</span>
                          </span>
                        )}
                        {oc.estado === "cancelada" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                            <XCircle className="w-3 h-3" />
                            <span>Cancelada</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* VISTA 2: Recepción de Mercadería */}
          {activeTab === "recepciones" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-2.5 px-2">Remito / ID</th>
                    <th className="py-2.5 px-2">Fecha</th>
                    <th className="py-2.5 px-2">Orden Ref.</th>
                    <th className="py-2.5 px-3">Proveedor</th>
                    <th className="py-2.5 px-2 text-center">Ítems Contados</th>
                    <th className="py-2.5 px-3 text-center">Conformidad</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recepciones.map((rc) => (
                    <tr
                      key={rc.id}
                      onClick={() => onVerRecepcion?.(rc)}
                      className="hover:bg-slate-50/70 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-2 font-mono font-bold text-slate-700 whitespace-nowrap">
                        {rc.id.toUpperCase()}
                      </td>
                      <td className="py-3 px-2 font-mono text-slate-500 whitespace-nowrap text-[11px]">
                        {rc.fecha}
                      </td>
                      <td className="py-3 px-2 font-mono font-semibold text-blue-600 whitespace-nowrap">
                        {rc.ordenCompraNumero}
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-800 whitespace-nowrap">
                        {rc.proveedorNombre}
                      </td>
                      <td className="py-3 px-2 text-center font-mono font-bold text-slate-700 whitespace-nowrap">
                        {rc.itemsContados} u
                      </td>
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        {rc.estado === "completa" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Completa</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                            <Clock className="w-3 h-3" />
                            <span>Parcial</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Actualizado hace 15 minutos</span>
          <span className="text-blue-600 font-semibold hover:underline cursor-pointer">
            Exportar historial completo
          </span>
        </div>
      </div>

      {/* 3. Gráfico de Compras por Rubro */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <PieChart className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">
                Compras por rubro
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-slate-400">
              Mes actual
            </span>
          </div>

          <div className="space-y-3.5">
            {rubros.map((item) => (
              <div key={item.rubro} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-semibold text-slate-800 truncate max-w-[160px]">
                      {item.rubro}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-slate-900 block">
                      ${item.monto.toLocaleString("es-AR")}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      ({item.porcentaje}%)
                    </span>
                  </div>
                </div>

                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
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

        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Total compras: $2.450.000</span>
          <span className="font-semibold text-slate-700">4 rubros activos</span>
        </div>
      </div>
    </div>
  );
}
