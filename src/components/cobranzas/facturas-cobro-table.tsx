"use client";

import React, { useState, useMemo } from "react";
import { FacturaCobroItem } from "@/types/finanzas";
import {
  AlertCircle,
  Clock,
  CheckCircle2,
  CalendarClock,
  Search,
  MoreVertical,
  Receipt,
  Eye,
  CreditCard,
  User,
} from "lucide-react";

interface FacturasCobroTableProps {
  readonly facturas: readonly FacturaCobroItem[];
  readonly onSelectFactura: (factura: FacturaCobroItem) => void;
  readonly facturaSeleccionadaId?: string;
  readonly onCobrarRapido?: (factura: FacturaCobroItem) => void;
}

export function FacturasCobroTable({
  facturas,
  onSelectFactura,
  facturaSeleccionadaId,
  onCobrarRapido,
}: FacturasCobroTableProps) {
  const [busqueda, setBusqueda] = useState<string>("");
  const [soloVencidas, setSoloVencidas] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Filtrado reactivo
  const facturasFiltradas = useMemo(() => {
    return facturas.filter((fac) => {
      if (soloVencidas && fac.estado !== "vencida") {
        return false;
      }

      if (busqueda.trim() !== "") {
        const query = busqueda.toLowerCase().trim();
        const matchNumero = fac.numeroFactura.toLowerCase().includes(query);
        const matchPaciente = fac.pacienteNombre.toLowerCase().includes(query);
        const matchConcepto = fac.concepto.toLowerCase().includes(query);
        if (!matchNumero && !matchPaciente && !matchConcepto) {
          return false;
        }
      }

      return true;
    });
  }, [facturas, soloVencidas, busqueda]);

  const toggleSelectAll = () => {
    if (selectedIds.size === facturasFiltradas.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(facturasFiltradas.map((f) => f.id)));
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

  const allSelected =
    facturasFiltradas.length > 0 &&
    selectedIds.size === facturasFiltradas.length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Barra de Filtros y Switch Solo Vencidas */}
      <div className="p-4 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Buscador */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar por N° factura, paciente o concepto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Switch Solo Vencidas */}
        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer transition-colors select-none">
            <input
              type="checkbox"
              checked={soloVencidas}
              onChange={() => setSoloVencidas((prev) => !prev)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-500 relative"></div>
            <span className="text-xs font-bold text-slate-700">
              Solo facturas vencidas
            </span>
          </label>
        </div>
      </div>

      {/* Tabla de Facturas */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/75 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-4 w-10 text-center">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  aria-label="Seleccionar todas las facturas"
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer w-4 h-4"
                />
              </th>
              <th className="py-3 px-3">N° Factura</th>
              <th className="py-3 px-4">Paciente</th>
              <th className="py-3 px-4">Concepto</th>
              <th className="py-3 px-3 text-right">Monto Original</th>
              <th className="py-3 px-3">Vencimiento</th>
              <th className="py-3 px-3 text-center">Días Atraso</th>
              <th className="py-3 px-3 text-right">Interés Mora</th>
              <th className="py-3 px-4 text-right">Total a Cobrar</th>
              <th className="py-3 px-4">Estado</th>
              <th className="py-3 px-3 w-16 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {facturasFiltradas.length === 0 ? (
              <tr>
                <td colSpan={11} className="py-12 text-center text-slate-400">
                  <Receipt className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm font-semibold text-slate-600">
                    No se encontraron facturas con los filtros actuales
                  </p>
                </td>
              </tr>
            ) : (
              facturasFiltradas.map((fac) => {
                const isSelected = selectedIds.has(fac.id);
                const isRowActive = facturaSeleccionadaId === fac.id;
                const isMenuOpen = openMenuId === fac.id;

                return (
                  <tr
                    key={fac.id}
                    onClick={() => onSelectFactura(fac)}
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
                          toggleSelectRow(fac.id, e as unknown as React.MouseEvent)
                        }
                        aria-label={`Seleccionar ${fac.numeroFactura}`}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer w-4 h-4"
                      />
                    </td>

                    {/* N° Factura */}
                    <td className="py-3.5 px-3 font-mono font-bold text-blue-700 whitespace-nowrap">
                      {fac.numeroFactura}
                    </td>

                    {/* Paciente */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold flex items-center justify-center text-[10px] shrink-0">
                          <User className="w-3.5 h-3.5 text-slate-500" />
                        </div>
                        <span className="font-semibold text-slate-900 leading-snug">
                          {fac.pacienteNombre}
                        </span>
                      </div>
                    </td>

                    {/* Concepto */}
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800 leading-snug">
                        {fac.concepto}
                      </div>
                      {fac.especialidad && (
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          {fac.especialidad}
                        </span>
                      )}
                    </td>

                    {/* Monto Original */}
                    <td className="py-3.5 px-3 text-right font-mono font-medium text-slate-700 whitespace-nowrap">
                      ${fac.montoOriginal.toLocaleString("es-AR")}
                    </td>

                    {/* Vencimiento */}
                    <td className="py-3.5 px-3 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                      {fac.fechaVencimiento}
                    </td>

                    {/* Días Atraso */}
                    <td className="py-3.5 px-3 text-center whitespace-nowrap">
                      {fac.diasAtraso > 0 ? (
                        <span className="font-mono font-bold text-rose-600">
                          +{fac.diasAtraso} días
                        </span>
                      ) : fac.diasAtraso === 0 ? (
                        <span className="font-mono font-bold text-amber-600">
                          Hoy
                        </span>
                      ) : (
                        <span className="font-mono text-slate-400">
                          {fac.diasAtraso} días
                        </span>
                      )}
                    </td>

                    {/* Interés Mora */}
                    <td className="py-3.5 px-3 text-right font-mono whitespace-nowrap">
                      {fac.interesCalculado > 0 ? (
                        <span className="font-bold text-rose-600">
                          +${fac.interesCalculado.toLocaleString("es-AR")}
                        </span>
                      ) : (
                        <span className="text-slate-400">$0</span>
                      )}
                    </td>

                    {/* Total a Cobrar */}
                    <td className="py-3.5 px-4 text-right font-mono font-extrabold text-sm text-slate-900 whitespace-nowrap">
                      ${fac.totalACobrar.toLocaleString("es-AR")}
                    </td>

                    {/* Estado con Badges */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {fac.estado === "vencida" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                          <AlertCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Vencida</span>
                        </span>
                      )}

                      {fac.estado === "hoy_vence" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          <CalendarClock className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Hoy vence</span>
                        </span>
                      )}

                      {fac.estado === "por_vencer" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                          <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Por vencer</span>
                        </span>
                      )}

                      {fac.estado === "al_dia" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Al día</span>
                        </span>
                      )}

                      {fac.estado === "cobrada" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                          <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Cobrada</span>
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
                          setOpenMenuId(isMenuOpen ? null : fac.id)
                        }
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                        title="Acciones de comprobante"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {/* Menú Desplegable */}
                      {isMenuOpen && (
                        <div className="absolute right-3 top-10 w-44 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-30 animate-in fade-in zoom-in-95 duration-100 text-left">
                          <button
                            type="button"
                            onClick={() => {
                              onSelectFactura(fac);
                              setOpenMenuId(null);
                            }}
                            className="w-full px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5 text-slate-400" />
                            <span>Ver liquidación</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              onCobrarRapido?.(fac);
                              setOpenMenuId(null);
                            }}
                            className="w-full px-3 py-2 text-xs font-medium text-emerald-700 hover:bg-emerald-50 flex items-center gap-2 transition-colors border-t border-slate-100"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>Registrar cobro</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-slate-50/50 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
        <div>
          Mostrando <span className="font-semibold text-slate-800">{facturasFiltradas.length}</span> comprobantes
          {selectedIds.size > 0 && (
            <span className="ml-2 font-medium text-blue-600">
              ({selectedIds.size} seleccionados)
            </span>
          )}
        </div>
        <div className="text-[11px] text-slate-400">
          Haz clic en cualquier fila para inspeccionar el cálculo de mora y registrar cobro
        </div>
      </div>
    </div>
  );
}
