"use client";

import React from "react";
import { ReporteCatalogoItem } from "@/types/reportes";
import {
  Calendar,
  UserCheck,
  Stethoscope,
  Activity,
  Building2,
  Scissors,
  Users,
  CreditCard,
  Receipt,
  DollarSign,
  ArrowDownLeft,
  Clock,
  FileCheck2,
  Boxes,
  TrendingUp,
  ShoppingCart,
  HeartPulse,
  ShieldCheck,
  Eye,
  Download,
  LucideIcon,
  HelpCircle,
} from "lucide-react";

interface CatalogoReportesGridProps {
  readonly reportes: readonly ReporteCatalogoItem[];
  readonly onVerReporte: (reporte: ReporteCatalogoItem) => void;
  readonly onExportarReporte?: (reporte: ReporteCatalogoItem) => void;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Calendar,
  UserCheck,
  Stethoscope,
  Activity,
  Building2,
  Scissors,
  Users,
  CreditCard,
  Receipt,
  DollarSign,
  ArrowDownLeft,
  Clock,
  FileCheck2,
  Boxes,
  TrendingUp,
  ShoppingCart,
  HeartPulse,
  ShieldCheck,
};

export function CatalogoReportesGrid({
  reportes,
  onVerReporte,
  onExportarReporte,
}: CatalogoReportesGridProps) {
  if (reportes.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-xs">
        <HelpCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
        <h3 className="text-sm font-semibold text-slate-800">
          No se encontraron reportes
        </h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
          No hay reportes que coincidan con la búsqueda o la categoría seleccionada.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {reportes.map((reporte) => {
        const IconComponent = ICON_MAP[reporte.iconName] ?? Activity;

        const categoriaColor =
          reporte.categoria === "clinica"
            ? "bg-blue-50 text-blue-700 border-blue-200/80"
            : reporte.categoria === "infraestructura"
            ? "bg-purple-50 text-purple-700 border-purple-200/80"
            : reporte.categoria === "finanzas"
            ? "bg-emerald-50 text-emerald-700 border-emerald-200/80"
            : "bg-amber-50 text-amber-700 border-amber-200/80";

        const iconBg =
          reporte.categoria === "clinica"
            ? "bg-blue-100 text-blue-600"
            : reporte.categoria === "infraestructura"
            ? "bg-purple-100 text-purple-600"
            : reporte.categoria === "finanzas"
            ? "bg-emerald-100 text-emerald-600"
            : "bg-amber-100 text-amber-600";

        return (
          <div
            key={reporte.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header de la Tarjeta */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${iconBg}`}
                  >
                    <IconComponent className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] font-bold text-slate-400 block">
                      #{String(reporte.numero).padStart(2, "0")} • {reporte.id}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {reporte.titulo}
                    </h3>
                  </div>
                </div>

                <span
                  className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${categoriaColor}`}
                >
                  {reporte.categoriaEtiqueta}
                </span>
              </div>

              {/* Estructura en 2 Bloques Clave: "Qué muestra" y "Para qué sirve" */}
              <div className="space-y-3 pt-2 border-t border-slate-100 text-xs">
                {/* 1. Qué debería mostrar */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Qué debería mostrar
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    {reporte.queMuestra}
                  </p>
                </div>

                {/* 2. Para qué le sirve */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
                    Para qué le sirve
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed bg-blue-50/40 p-2.5 rounded-xl border border-blue-100/60">
                    {reporte.utilidadNegocio}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer de Acciones del Reporte */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => onExportarReporte?.(reporte)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
                title="Exportar CSV directo"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar CSV</span>
              </button>

              <button
                type="button"
                onClick={() => onVerReporte(reporte)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Ver reporte</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
