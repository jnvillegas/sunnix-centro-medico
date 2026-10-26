"use client";

import React from "react";
import { ReportePreviewData } from "@/types/reportes";
import {
  X,
  Download,
  Printer,
  FileBarChart,
  Calendar,
} from "lucide-react";

interface ReportePreviewModalProps {
  readonly data: ReportePreviewData | null;
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export function ReportePreviewModal({
  data,
  isOpen,
  onClose,
}: ReportePreviewModalProps) {
  if (!isOpen || !data) {
    return null;
  }

  // Generador real de descarga CSV en el navegador
  const handleExportCSV = () => {
    const headers = data.columnas.map((c) => `"${c.label}"`).join(",");
    const rows = data.filas
      .map((fila) =>
        data.columnas
          .map((col) => {
            const val = String(fila[col.key] ?? "");
            return `"${val.replace(/"/g, '""')}"`;
          })
          .join(",")
      )
      .join("\n");

    const csvContent = "\uFEFF" + `${headers}\n${rows}`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `${data.reporteId.toLowerCase()}_${data.titulo.toLowerCase().replace(/\s+/g, "_")}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
          {/* Header del Modal */}
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-2xs">
                <FileBarChart className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                    {data.reporteId}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 capitalize">
                    {data.categoria}
                  </span>
                </div>
                <h2 className="text-base font-bold text-slate-900 mt-0.5">
                  {data.titulo}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-600">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{data.periodoTexto}</span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
                title="Cerrar ventana"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tabla de Datos del Reporte */}
          <div className="p-6 overflow-x-auto max-h-[60vh]">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {data.columnas.map((col) => (
                    <th
                      key={col.key}
                      className={`py-3 px-3.5 ${
                        col.align === "right"
                          ? "text-right"
                          : col.align === "center"
                          ? "text-center"
                          : "text-left"
                      }`}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.filas.map((fila, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                    {data.columnas.map((col) => {
                      const val = fila[col.key];
                      return (
                        <td
                          key={col.key}
                          className={`py-3 px-3.5 ${
                            col.align === "right"
                              ? "text-right"
                              : col.align === "center"
                              ? "text-center"
                              : "text-left"
                          } ${col.isMono ? "font-mono font-bold" : "font-medium text-slate-800"}`}
                        >
                          {val}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>

              {/* Fila de Totales si existe */}
              {data.totales && (
                <tfoot>
                  <tr className="border-t-2 border-slate-200 bg-slate-50/80 font-bold text-slate-900">
                    {data.columnas.map((col) => {
                      const val = data.totales?.[col.key] ?? "";
                      return (
                        <td
                          key={col.key}
                          className={`py-3 px-3.5 ${
                            col.align === "right"
                              ? "text-right"
                              : col.align === "center"
                              ? "text-center"
                              : "text-left"
                          } ${col.isMono ? "font-mono font-extrabold" : ""}`}
                        >
                          {val}
                        </td>
                      );
                    })}
                  </tr>
                </tfoot>
              )}
            </table>
          </div>

          {/* Footer de Acciones */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="text-[11px] text-slate-500">
              Mostrando {data.filas.length} registros consolidados para el período {data.periodoTexto}.
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>Imprimir</span>
              </button>

              <button
                type="button"
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar CSV</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
