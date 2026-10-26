"use client";

import React from "react";
import {
  Search,
  ChevronDown,
  Download,
  Plus,
  ArrowLeftRight,
  Filter,
} from "lucide-react";

interface StockFiltrosBarProps {
  readonly busqueda: string;
  readonly onBusquedaChange: (query: string) => void;
  readonly categoriaSeleccionada: string;
  readonly onCategoriaChange: (categoria: string) => void;
  readonly estadoSeleccionado: string;
  readonly onEstadoChange: (estado: string) => void;
  readonly ubicacionSeleccionada: string;
  readonly onUbicacionChange: (ubicacion: string) => void;
  readonly soloStockBajo: boolean;
  readonly onToggleSoloStockBajo: () => void;
  readonly onExportar?: () => void;
  readonly onNuevoInsumo?: () => void;
  readonly onRegistrarMovimiento?: () => void;
}

const CATEGORIAS_OPCIONES: readonly { valor: string; etiqueta: string }[] = [
  { valor: "todas", etiqueta: "Todas las categorías" },
  { valor: "descartables", etiqueta: "Descartables" },
  { valor: "medicamentos", etiqueta: "Medicamentos" },
  { valor: "curaciones", etiqueta: "Curaciones" },
  { valor: "higiene", etiqueta: "Higiene y Desinfección" },
  { valor: "soluciones", etiqueta: "Soluciones y Sueros" },
  { valor: "otros", etiqueta: "Otros Insumos" },
];

const ESTADOS_OPCIONES: readonly { valor: string; etiqueta: string }[] = [
  { valor: "todos", etiqueta: "Todos los estados" },
  { valor: "normal", etiqueta: "Normal" },
  { valor: "stock_bajo", etiqueta: "Stock bajo" },
  { valor: "sin_stock", etiqueta: "Sin stock" },
];

const UBICACIONES_OPCIONES: readonly { valor: string; etiqueta: string }[] = [
  { valor: "todas", etiqueta: "Todas las ubicaciones" },
  { valor: "Depósito Central", etiqueta: "Depósito Central" },
  { valor: "Consultorio 1", etiqueta: "Consultorio 1" },
  { valor: "Consultorio 2", etiqueta: "Consultorio 2" },
  { valor: "Consultorio 3", etiqueta: "Consultorio 3" },
  { valor: "Consultorio 4", etiqueta: "Consultorio 4" },
  { valor: "Farmacia Interna", etiqueta: "Farmacia Interna" },
  { valor: "Depósito Quirúrgico", etiqueta: "Depósito Quirúrgico" },
];

export function StockFiltrosBar({
  busqueda,
  onBusquedaChange,
  categoriaSeleccionada,
  onCategoriaChange,
  estadoSeleccionado,
  onEstadoChange,
  ubicacionSeleccionada,
  onUbicacionChange,
  soloStockBajo,
  onToggleSoloStockBajo,
  onExportar,
  onNuevoInsumo,
  onRegistrarMovimiento,
}: StockFiltrosBarProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-4">
      {/* Fila Principal: Buscador, Switch Solo Stock Bajo y Botones de Acción */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Buscador */}
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar por código, nombre de insumo, proveedor..."
            value={busqueda}
            onChange={(e) => onBusquedaChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Switch Conmutador "Solo stock bajo" y Botones de Acción */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Switch "Solo stock bajo" */}
          <label className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer transition-colors select-none">
            <input
              type="checkbox"
              checked={soloStockBajo}
              onChange={onToggleSoloStockBajo}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500 relative"></div>
            <span className="text-xs font-bold text-slate-700">
              Solo stock bajo
            </span>
          </label>

          {/* Botón Exportar */}
          <button
            type="button"
            onClick={onExportar}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar</span>
          </button>

          {/* Botón Registrar Movimiento */}
          <button
            type="button"
            onClick={onRegistrarMovimiento}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 rounded-xl text-xs font-semibold transition-colors"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Registrar movimiento</span>
          </button>

          {/* Botón Nuevo Insumo */}
          <button
            type="button"
            onClick={onNuevoInsumo}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Nuevo insumo</span>
          </button>
        </div>
      </div>

      {/* Fila Secundaria: Filtros Rápidos de Desplegables */}
      <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-1 text-slate-400 font-semibold text-[11px] uppercase tracking-wider mr-1">
          <Filter className="w-3 h-3" />
          <span>Filtros:</span>
        </div>

        {/* Desplegable Categoría */}
        <div className="relative">
          <select
            value={categoriaSeleccionada}
            onChange={(e) => onCategoriaChange(e.target.value)}
            className="appearance-none pl-3 pr-8 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
          >
            {CATEGORIAS_OPCIONES.map((c) => (
              <option key={c.valor} value={c.valor}>
                {c.etiqueta}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Desplegable Estado */}
        <div className="relative">
          <select
            value={estadoSeleccionado}
            onChange={(e) => onEstadoChange(e.target.value)}
            className="appearance-none pl-3 pr-8 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
          >
            {ESTADOS_OPCIONES.map((e) => (
              <option key={e.valor} value={e.valor}>
                {e.etiqueta}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Desplegable Ubicación */}
        <div className="relative">
          <select
            value={ubicacionSeleccionada}
            onChange={(e) => onUbicacionChange(e.target.value)}
            className="appearance-none pl-3 pr-8 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
          >
            {UBICACIONES_OPCIONES.map((u) => (
              <option key={u.valor} value={u.valor}>
                {u.etiqueta}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
