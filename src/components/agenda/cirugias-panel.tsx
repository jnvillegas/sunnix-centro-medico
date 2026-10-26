"use client";

import React from "react";
import { CirugiaItem, EstadoCirugia } from "@/types/agenda";
import {
  Scissors,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  PlayCircle,
} from "lucide-react";

interface CirugiasPanelProps {
  readonly cirugias: readonly CirugiaItem[];
  readonly fechaTexto?: string;
  readonly onNuevaCirugia?: () => void;
}

export function CirugiasPanel({
  cirugias,
  fechaTexto = "12 de mayo de 2025",
  onNuevaCirugia,
}: CirugiasPanelProps) {
  const getBadgeStyle = (estado: EstadoCirugia) => {
    switch (estado) {
      case "programada":
        return {
          classes: "bg-emerald-50 text-emerald-700 border-emerald-200",
          icon: <CheckCircle2 className="w-3 h-3 text-emerald-600" />,
          label: "Programada",
        };
      case "en_curso":
        return {
          classes: "bg-sky-50 text-sky-700 border-sky-200",
          icon: <PlayCircle className="w-3 h-3 text-sky-600 animate-pulse" />,
          label: "En curso",
        };
      case "finalizada":
        return {
          classes: "bg-purple-50 text-purple-700 border-purple-200",
          icon: <CheckCircle2 className="w-3 h-3 text-purple-600" />,
          label: "Finalizada",
        };
      case "cancelada":
        return {
          classes: "bg-rose-50 text-rose-700 border-rose-200",
          icon: <AlertCircle className="w-3 h-3 text-rose-600" />,
          label: "Cancelada",
        };
    }
  };

  const cirugiasQ1 = cirugias.filter((c) => c.quirofanoNombre === "Quirófano 1");
  const cirugiasQ2 = cirugias.filter((c) => c.quirofanoNombre === "Quirófano 2");

  // Franjas de referencia horaria para el timeline
  const HORARIOS_TIMELINE = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"];

  // Calcula posición horizontal y ancho porcentual para una cirugía entre 08:00 (0%) y 18:00 (100%)
  const calcularEstiloBarra = (horaInicio: string, horaFin: string) => {
    const parseMinutos = (h: string) => {
      const [horas, mins] = h.split(":").map(Number);
      return horas * 60 + mins;
    };

    const inicioMin = parseMinutos(horaInicio);
    const finMin = parseMinutos(horaFin);
    const diaInicioMin = 8 * 60; // 08:00
    const diaFinMin = 18 * 60; // 18:00
    const rangoTotal = diaFinMin - diaInicioMin; // 600 min

    const leftPct = Math.max(0, ((inicioMin - diaInicioMin) / rangoTotal) * 100);
    const widthPct = Math.min(100 - leftPct, ((finMin - inicioMin) / rangoTotal) * 100);

    return {
      left: `${leftPct}%`,
      width: `${widthPct}%`,
    };
  };

  return (
    <div className="space-y-6">
      {/* 1. Cabecera Informativa con Botón + Nueva Cirugía */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 md:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-50 text-amber-600">
            <Scissors className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">
              Gestión Quirúrgica y Ocupación de Quirófanos
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Programá y gestioná los procedimientos quirúrgicos ambulatorios, quirófanos y equipos médicos.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onNuevaCirugia}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-amber-600 text-white hover:bg-amber-700 shadow-sm transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva cirugía</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 2. Tabla de Cirugías del Día (7 columnas) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-5 md:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-800">
              Intervenciones Programadas ({cirugias.length})
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              {fechaTexto}
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200/80">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px] font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Hora</th>
                  <th className="py-2.5 px-3">Paciente</th>
                  <th className="py-2.5 px-3">Procedimiento</th>
                  <th className="py-2.5 px-3">Cirujano</th>
                  <th className="py-2.5 px-3">Quirófano</th>
                  <th className="py-2.5 px-3">Duración</th>
                  <th className="py-2.5 px-3 text-right">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {cirugias.map((cx) => {
                  const badge = getBadgeStyle(cx.estado);

                  return (
                    <tr
                      key={cx.id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                        {cx.horaInicio}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="font-bold text-slate-800 block">
                          {cx.pacienteNombre}
                        </span>
                        {cx.pacienteDni && (
                          <span className="text-[10px] text-slate-400 font-mono">
                            {cx.pacienteDni}
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-slate-800">
                        {cx.procedimiento}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">
                        {cx.cirujanoNombre}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          {cx.quirofanoNombre}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-600">
                        {cx.duracionHoras} hs
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${badge.classes}`}
                        >
                          {badge.icon}
                          {badge.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Panel Cronológico Derecho (Vista de Quirófanos) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-5 md:p-6 shadow-xs space-y-5 flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-800">
                Vista de Quirófanos
              </h3>
              <p className="text-xs text-slate-500">
                Línea de tiempo de ocupación • {fechaTexto}
              </p>
            </div>

            {/* Cronograma Gráfico */}
            <div className="pt-4 space-y-6">
              {/* Eje de Horas */}
              <div className="relative border-b border-slate-200 pb-1">
                <div className="flex justify-between text-[10px] font-mono font-bold text-slate-400">
                  {HORARIOS_TIMELINE.map((h) => (
                    <span key={h}>{h}</span>
                  ))}
                </div>
              </div>

              {/* Fila Quirófano 1 */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">
                    Quirófano 1 (Cirugía General / Qx)
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {cirugiasQ1.length} procedimientos
                  </span>
                </div>
                <div className="relative h-12 bg-slate-100 rounded-xl overflow-hidden border border-slate-200/70">
                  {cirugiasQ1.map((cx) => {
                    const estilo = calcularEstiloBarra(cx.horaInicio, cx.horaFin);
                    const isFinalizada = cx.estado === "finalizada";

                    return (
                      <div
                        key={cx.id}
                        style={estilo}
                        title={`${cx.procedimiento} (${cx.horaInicio} - ${cx.horaFin})`}
                        className={`absolute top-1 bottom-1 rounded-lg px-2 py-1 text-[10px] font-semibold flex flex-col justify-center truncate border shadow-xs ${
                          isFinalizada
                            ? "bg-purple-100 text-purple-900 border-purple-300"
                            : "bg-emerald-100 text-emerald-900 border-emerald-300"
                        }`}
                      >
                        <span className="truncate font-bold">{cx.procedimiento}</span>
                        <span className="text-[9px] opacity-80 font-mono">
                          {cx.horaInicio} - {cx.horaFin}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Fila Quirófano 2 */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">
                    Quirófano 2 (Ambulatorio / Especialidades)
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {cirugiasQ2.length} procedimientos
                  </span>
                </div>
                <div className="relative h-12 bg-slate-100 rounded-xl overflow-hidden border border-slate-200/70">
                  {cirugiasQ2.map((cx) => {
                    const estilo = calcularEstiloBarra(cx.horaInicio, cx.horaFin);
                    const isEnCurso = cx.estado === "en_curso";

                    return (
                      <div
                        key={cx.id}
                        style={estilo}
                        title={`${cx.procedimiento} (${cx.horaInicio} - ${cx.horaFin})`}
                        className={`absolute top-1 bottom-1 rounded-lg px-2 py-1 text-[10px] font-semibold flex flex-col justify-center truncate border shadow-xs ${
                          isEnCurso
                            ? "bg-sky-100 text-sky-900 border-sky-300 ring-2 ring-sky-500/50"
                            : "bg-amber-100 text-amber-900 border-amber-300"
                        }`}
                      >
                        <span className="truncate font-bold">{cx.procedimiento}</span>
                        <span className="text-[9px] opacity-80 font-mono">
                          {cx.horaInicio} - {cx.horaFin}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Intervalo mínimo entre cirugías: 30 min (Esterilización)</span>
            <Clock className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
