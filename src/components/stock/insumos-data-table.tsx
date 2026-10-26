"use client";

import React, { useState } from "react";
import { InsumoItem } from "@/types/stock";
import {
  CheckCircle2,
  AlertTriangle,
  Bell,
  MoreVertical,
  Package,
  PlusCircle,
  MinusCircle,
  ShoppingCart,
  Eye,
} from "lucide-react";

interface InsumosDataTableProps {
  readonly insumos: readonly InsumoItem[];
  readonly onSelectInsumo: (insumo: InsumoItem) => void;
  readonly insumoSeleccionadoId?: string;
  readonly onRegistrarEntrada?: (insumo: InsumoItem) => void;
  readonly onRegistrarSalida?: (insumo: InsumoItem) => void;
  readonly onCrearOC?: (insumo: InsumoItem) => void;
}

export function InsumosDataTable({
  insumos,
  onSelectInsumo,
  insumoSeleccionadoId,
  onRegistrarEntrada,
  onRegistrarSalida,
  onCrearOC,
}: InsumosDataTableProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const toggleSelectAll = () => {
    if (selectedIds.size === insumos.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(insumos.map((i) => i.id)));
    }
  };

  const toggleSelectRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  const handleAction = (
    action: () => void,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    action();
    setOpenMenuId(null);
  };

  if (insumos.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-xs">
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
          <Package className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-semibold text-slate-800 mb-1">
          No se encontraron insumos
        </h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          No hay artículos que coincidan con los criterios de búsqueda o filtros seleccionados. Intenta restablecer los filtros o el switch de stock bajo.
        </p>
      </div>
    );
  }

  const allSelected = insumos.length > 0 && selectedIds.size === insumos.length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/75 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-4 w-10 text-center">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  aria-label="Seleccionar todos los insumos"
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer w-4 h-4"
                />
              </th>
              <th className="py-3 px-3">Código</th>
              <th className="py-3 px-4">Insumo</th>
              <th className="py-3 px-3">Categoría</th>
              <th className="py-3 px-3">Presentación</th>
              <th className="py-3 px-3 text-center">Stock Actual</th>
              <th className="py-3 px-3 text-center">Stock Mínimo</th>
              <th className="py-3 px-4">Ubicación</th>
              <th className="py-3 px-3">Última Compra</th>
              <th className="py-3 px-4">Estado</th>
              <th className="py-3 px-3 w-16 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {insumos.map((item) => {
              const isSelected = selectedIds.has(item.id);
              const isRowActive = insumoSeleccionadoId === item.id;
              const isMenuOpen = openMenuId === item.id;

              return (
                <tr
                  key={item.id}
                  onClick={() => onSelectInsumo(item)}
                  className={`cursor-pointer transition-colors hover:bg-blue-50/40 ${
                    isRowActive ? "bg-blue-50/80 border-l-4 border-l-blue-600" : ""
                  }`}
                >
                  {/* Checkbox */}
                  <td
                    className="py-3.5 px-4 text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) =>
                        toggleSelectRow(item.id, e as unknown as React.MouseEvent)
                      }
                      aria-label={`Seleccionar insumo ${item.codigo}`}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer w-4 h-4"
                    />
                  </td>

                  {/* Código */}
                  <td className="py-3.5 px-3 font-mono font-bold text-blue-700 whitespace-nowrap">
                    {item.codigo}
                  </td>

                  {/* Insumo */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900 leading-snug">
                      {item.nombre}
                    </div>
                    {item.notas && (
                      <span className="text-[11px] text-slate-400 block truncate max-w-xs mt-0.5">
                        {item.notas}
                      </span>
                    )}
                  </td>

                  {/* Categoría */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span className="inline-flex px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 capitalize">
                      {item.categoria}
                    </span>
                  </td>

                  {/* Presentación */}
                  <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                    {item.presentacion}
                  </td>

                  {/* Stock Actual */}
                  <td className="py-3.5 px-3 text-center whitespace-nowrap">
                    <span
                      className={`font-mono font-extrabold text-sm ${
                        item.estado === "sin_stock"
                          ? "text-rose-600"
                          : item.estado === "stock_bajo"
                          ? "text-amber-600"
                          : "text-slate-800"
                      }`}
                    >
                      {item.stockActual}
                    </span>
                  </td>

                  {/* Stock Mínimo */}
                  <td className="py-3.5 px-3 text-center font-mono font-medium text-slate-500 whitespace-nowrap">
                    {item.stockMinimo}
                  </td>

                  {/* Ubicación */}
                  <td className="py-3.5 px-4 text-slate-600 text-[11px] whitespace-nowrap">
                    {item.ubicacion}
                  </td>

                  {/* Última Compra */}
                  <td className="py-3.5 px-3 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                    {item.ultimaCompraFecha}
                  </td>

                  {/* Badges de Semáforo */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {item.estado === "normal" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Normal</span>
                      </span>
                    )}

                    {item.estado === "stock_bajo" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                        <AlertTriangle className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Stock bajo</span>
                      </span>
                    )}

                    {item.estado === "sin_stock" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                        <Bell className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Sin stock</span>
                      </span>
                    )}
                  </td>

                  {/* Acciones */}
                  <td
                    className="py-3.5 px-3 text-center relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenuId(isMenuOpen ? null : item.id)
                      }
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      title="Acciones de insumo"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {/* Menú Desplegable */}
                    {isMenuOpen && (
                      <div className="absolute right-3 top-10 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-30 animate-in fade-in zoom-in-95 duration-100 text-left">
                        <button
                          type="button"
                          onClick={(e) =>
                            handleAction(() => onSelectInsumo(item), e)
                          }
                          className="w-full px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5 text-slate-400" />
                          <span>Ver detalle / Ficha</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) =>
                            handleAction(
                              () => onRegistrarEntrada?.(item),
                              e
                            )
                          }
                          className="w-full px-3 py-2 text-xs font-medium text-emerald-700 hover:bg-emerald-50 flex items-center gap-2 transition-colors"
                        >
                          <PlusCircle className="w-3.5 h-3.5" />
                          <span>Registrar entrada</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) =>
                            handleAction(
                              () => onRegistrarSalida?.(item),
                              e
                            )
                          }
                          className="w-full px-3 py-2 text-xs font-medium text-amber-700 hover:bg-amber-50 flex items-center gap-2 transition-colors"
                        >
                          <MinusCircle className="w-3.5 h-3.5" />
                          <span>Registrar consumo</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) =>
                            handleAction(() => onCrearOC?.(item), e)
                          }
                          className="w-full px-3 py-2 text-xs font-medium text-blue-700 hover:bg-blue-50 flex items-center gap-2 transition-colors border-t border-slate-100"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Crear Orden de Compra</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer de Tabla con Conteo */}
      <div className="px-4 py-3 bg-slate-50/50 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
        <div>
          Mostrando <span className="font-semibold text-slate-800">{insumos.length}</span> insumos
          {selectedIds.size > 0 && (
            <span className="ml-2 font-medium text-blue-600">
              ({selectedIds.size} seleccionados)
            </span>
          )}
        </div>
        <div className="text-[11px] text-slate-400">
          Haz clic en cualquier fila para inspeccionar ficha técnica, proveedor y movimientos
        </div>
      </div>
    </div>
  );
}
