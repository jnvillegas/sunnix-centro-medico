"use client";

import React from "react";
import { PeriodoFiltro, CategoriaReporte } from "@/types/reportes";
import {
  Search,
  Calendar,
  Layers,
  Activity,
  Building2,
  DollarSign,
  Boxes,
} from "lucide-react";

interface ReportesFiltroBarProps {
  readonly periodoSeleccionado: PeriodoFiltro;
  readonly onPeriodoChange: (periodo: PeriodoFiltro) => void;
  readonly categoriaSeleccionada: "todos" | CategoriaReporte;
  readonly onCategoriaChange: (categoria: "todos" | CategoriaReporte) => void;
  readonly busqueda: string;
  readonly onBusquedaChange: (query: string) => void;
  readonly conteos: {
    readonly todos: number;
    readonly clinica: number;
    readonly infraestructura: number;
    readonly finanzas: number;
    readonly suministros: number;
  };
}

const PERIODOS_OPCIONES: readonly { valor: PeriodoFiltro; label: string }[] = [
  { valor: "hoy", label: "Hoy" },
  { valor: "semana", label: "Esta semana" },
  { valor: "mes", label: "Mes actual" },
  { valor: "ano", label: "Año" },
  { valor: "personalizado", label: "Personalizado" },
];

export function ReportesFiltroBar({
  periodoSeleccionado,
  onPeriodoChange,
  categoriaSeleccionada,
  onCategoriaChange,
  busqueda,
  onBusquedaChange,
  conteos,
}: ReportesFiltroBarProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-4">
      {/* Fila Superior: Buscador y Selector de Período */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Buscador */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar reporte por título, contenido o utilidad..."
            value={busqueda}
            onChange={(e) => onBusquedaChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Selector de Período */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold overflow-x-auto">
          <Calendar className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1 shrink-0" />
          {PERIODOS_OPCIONES.map((p) => (
            <button
              key={p.valor}
              type="button"
              onClick={() => onPeriodoChange(p.valor)}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                periodoSeleccionado === p.valor
                  ? "bg-white text-slate-900 shadow-2xs font-bold"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Fila Inferior: Chips de Categorías */}
      <div className="flex items-center gap-2 overflow-x-auto pt-3 border-t border-slate-100 text-xs">
        <button
          type="button"
          onClick={() => onCategoriaChange("todos")}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all font-semibold whitespace-nowrap ${
            categoriaSeleccionada === "todos"
              ? "bg-slate-900 text-white shadow-xs"
              : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Todos ({conteos.todos})</span>
        </button>

        <button
          type="button"
          onClick={() => onCategoriaChange("clinica")}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all font-semibold whitespace-nowrap ${
            categoriaSeleccionada === "clinica"
              ? "bg-blue-600 text-white shadow-xs"
              : "bg-blue-50/70 hover:bg-blue-100 text-blue-700 border border-blue-200/80"
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Gestión Médica ({conteos.clinica})</span>
        </button>

        <button
          type="button"
          onClick={() => onCategoriaChange("infraestructura")}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all font-semibold whitespace-nowrap ${
            categoriaSeleccionada === "infraestructura"
              ? "bg-purple-600 text-white shadow-xs"
              : "bg-purple-50/70 hover:bg-purple-100 text-purple-700 border border-purple-200/80"
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Infraestructura ({conteos.infraestructura})</span>
        </button>

        <button
          type="button"
          onClick={() => onCategoriaChange("finanzas")}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all font-semibold whitespace-nowrap ${
            categoriaSeleccionada === "finanzas"
              ? "bg-emerald-600 text-white shadow-xs"
              : "bg-emerald-50/70 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/80"
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>Finanzas ({conteos.finanzas})</span>
        </button>

        <button
          type="button"
          onClick={() => onCategoriaChange("suministros")}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all font-semibold whitespace-nowrap ${
            categoriaSeleccionada === "suministros"
              ? "bg-amber-600 text-white shadow-xs"
              : "bg-amber-50/70 hover:bg-amber-100 text-amber-700 border border-amber-200/80"
          }`}
        >
          <Boxes className="w-3.5 h-3.5" />
          <span>Suministros ({conteos.suministros})</span>
        </button>
      </div>
    </div>
  );
}
