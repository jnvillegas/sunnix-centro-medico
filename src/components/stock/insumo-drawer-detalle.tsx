"use client";

import React, { useState } from "react";
import { InsumoItem } from "@/types/stock";
import {
  X,
  Package,
  Building2,
  AlertTriangle,
  CheckCircle2,
  Bell,
  Calendar,
  Layers,
  MapPin,
  ArrowDownLeft,
  ArrowUpRight,
  ShoppingCart,
  FileText,
} from "lucide-react";

interface InsumoDrawerDetalleProps {
  readonly insumo: InsumoItem | null;
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onCrearOC?: (insumo: InsumoItem) => void;
  readonly onRegistrarMovimiento?: (insumo: InsumoItem) => void;
}

export function InsumoDrawerDetalle({
  insumo,
  isOpen,
  onClose,
  onCrearOC,
  onRegistrarMovimiento,
}: InsumoDrawerDetalleProps) {
  const [activeTab, setActiveTab] = useState<"detalle" | "movimientos" | "proveedor">("detalle");

  if (!isOpen || !insumo) {
    return null;
  }

  const stockRatioPct =
    insumo.stockMinimo > 0
      ? Math.min(100, Math.round((insumo.stockActual / insumo.stockMinimo) * 100))
      : 100;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200">
          {/* Header del Drawer */}
          <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/70 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shadow-xs shrink-0">
                <Package className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                    {insumo.codigo}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 capitalize">
                    {insumo.categoria}
                  </span>
                </div>
                <h2 className="text-base font-bold text-slate-900 mt-1 leading-snug">
                  {insumo.nombre}
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
              title="Cerrar panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Contenido scrolleable */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {/* Tarjeta de Nivel de Stock y Semáforo */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-medium block">
                    Stock en existencia
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl font-extrabold text-slate-900 font-mono">
                      {insumo.stockActual} u
                    </span>
                    <span className="text-xs text-slate-500">
                      / mín. {insumo.stockMinimo} u
                    </span>
                  </div>
                </div>

                {insumo.estado === "normal" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Normal</span>
                  </span>
                )}

                {insumo.estado === "stock_bajo" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Stock bajo</span>
                  </span>
                )}

                {insumo.estado === "sin_stock" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 border border-rose-200">
                    <Bell className="w-3.5 h-3.5" />
                    <span>Sin stock</span>
                  </span>
                )}
              </div>

              {/* Barra de Cobertura */}
              <div className="space-y-1">
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      insumo.estado === "sin_stock"
                        ? "bg-rose-500 w-0"
                        : insumo.estado === "stock_bajo"
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                    }`}
                    style={{ width: `${stockRatioPct}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>0 u</span>
                  <span>{stockRatioPct}% de cobertura mínima</span>
                  <span>{insumo.stockMinimo} u</span>
                </div>
              </div>
            </div>

            {/* Tabs de Navegación del Drawer */}
            <div className="flex border-b border-slate-200">
              <button
                type="button"
                onClick={() => setActiveTab("detalle")}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all ${
                  activeTab === "detalle"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Detalle</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("movimientos")}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all ${
                  activeTab === "movimientos"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <ArrowDownLeft className="w-3.5 h-3.5" />
                <span>Movimientos</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("proveedor")}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all ${
                  activeTab === "proveedor"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Proveedor</span>
              </button>
            </div>

            {/* TAB: Detalle */}
            {activeTab === "detalle" && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">
                      Presentación
                    </span>
                    <span className="font-semibold text-slate-800 mt-0.5 block">
                      {insumo.presentacion}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">
                      Precio de Compra
                    </span>
                    <span className="font-mono font-bold text-slate-900 mt-0.5 block">
                      ${insumo.precioCompraReferencia.toLocaleString("es-AR")}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <span className="text-[11px] text-slate-400 block">
                        Ubicación física asignada
                      </span>
                      <span className="font-medium text-slate-800">
                        {insumo.ubicacion}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-slate-600 pt-2 border-t border-slate-200/80">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                    <div>
                      <span className="text-[11px] text-slate-400 block">
                        Fecha última compra
                      </span>
                      <span className="font-mono font-medium text-slate-700">
                        {insumo.ultimaCompraFecha}
                      </span>
                    </div>
                  </div>
                </div>

                {insumo.notas && (
                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-amber-900">
                    <div className="flex items-center gap-1.5 font-bold text-[11px] mb-1 text-amber-800">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Observaciones de uso</span>
                    </div>
                    <p className="text-xs leading-relaxed">{insumo.notas}</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB: Movimientos */}
            {activeTab === "movimientos" && (
              <div className="space-y-3">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Últimos despachos y recepciones
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <ArrowDownLeft className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-semibold text-slate-800">
                          Recepción OC-00023
                        </span>
                        <span className="text-[11px] text-slate-400 block">
                          10/05/2025 • Ingreso a depósito
                        </span>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-emerald-600">
                      +50 u
                    </span>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-semibold text-slate-800">
                          Despacho a Quirófano 1
                        </span>
                        <span className="text-[11px] text-slate-400 block">
                          08/05/2025 • Cirugía Programada
                        </span>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-amber-600">
                      -20 u
                    </span>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-semibold text-slate-800">
                          Consumo Guardia Médica
                        </span>
                        <span className="text-[11px] text-slate-400 block">
                          05/05/2025 • Reposición de consultorios
                        </span>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-amber-600">
                      -18 u
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Proveedor */}
            {activeTab === "proveedor" && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <span className="font-bold text-slate-900 text-sm">
                      {insumo.proveedorHabitualNombre}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-slate-600 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Condición comercial:</span>
                      <span className="font-semibold text-slate-800">
                        Cuenta corriente 30 días
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tiempo de entrega:</span>
                      <span className="font-semibold text-slate-800">
                        48 a 72 horas hábiles
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Contacto comercial:</span>
                      <span className="font-semibold text-slate-800">
                        Esteban Quiroga (+54 11 4782-9900)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-blue-900 text-xs flex items-center justify-between">
                  <div>
                    <span className="font-bold block">Último precio acordado</span>
                    <span className="text-blue-700 text-[11px]">
                      Vigente desde 04/05/2025
                    </span>
                  </div>
                  <span className="font-mono font-extrabold text-base text-blue-700">
                    ${insumo.precioCompraReferencia.toLocaleString("es-AR")}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Footer de Acciones */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => onRegistrarMovimiento?.(insumo)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
            >
              Registrar movimiento
            </button>

            <button
              type="button"
              onClick={() => onCrearOC?.(insumo)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Generar Orden de Compra</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
