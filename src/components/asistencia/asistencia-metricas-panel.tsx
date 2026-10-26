"use client";

import React from "react";
import {
  MetricaProfesionalAsistencia,
  EvolucionMesAsistencia,
  TopPacienteInasistencia,
} from "@/types/asistencia";
import {
  MOCK_METRICAS_PROFESIONALES,
  MOCK_EVOLUCION_ASISTENCIA,
  MOCK_TOP_INASISTENCIAS,
} from "@/lib/data/mock-asistencia";
import {
  TrendingUp,
  UserCheck,
  AlertOctagon,
  Users,
} from "lucide-react";

interface AsistenciaMetricasPanelProps {
  readonly metricasProfesionales?: readonly MetricaProfesionalAsistencia[];
  readonly evolucionAsistencia?: readonly EvolucionMesAsistencia[];
  readonly topInasistencias?: readonly TopPacienteInasistencia[];
  readonly onSelectPacienteInasistencia?: (pacienteId: string) => void;
}

export function AsistenciaMetricasPanel({
  metricasProfesionales = MOCK_METRICAS_PROFESIONALES,
  evolucionAsistencia = MOCK_EVOLUCION_ASISTENCIA,
  topInasistencias = MOCK_TOP_INASISTENCIAS,
  onSelectPacienteInasistencia,
}: AsistenciaMetricasPanelProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* 1. Asistencia por Profesional */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <UserCheck className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">
                Asistencia por profesional
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-slate-400">
              Mes actual
            </span>
          </div>

          <div className="space-y-4">
            {metricasProfesionales.map((item) => {
              const pct = item.porcentajeAsistencia;
              const barColor =
                pct >= 85
                  ? "bg-emerald-500"
                  : pct >= 75
                  ? "bg-blue-500"
                  : "bg-amber-500";
              const textColor =
                pct >= 85
                  ? "text-emerald-700"
                  : pct >= 75
                  ? "text-blue-700"
                  : "text-amber-700";

              return (
                <div key={item.profesionalId} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-slate-800">
                        {item.profesionalNombre}
                      </span>
                      <span className="text-[11px] text-slate-400 ml-1.5">
                        ({item.especialidad})
                      </span>
                    </div>
                    <span className={`font-mono font-bold ${textColor}`}>
                      {pct}%
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Meta institucional: &gt; 80%</span>
          <span className="font-semibold text-slate-600">Promedio: 79.5%</span>
        </div>
      </div>

      {/* 2. Evolución de Asistencia (Barras Apiladas) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">
                Evolución de asistencia
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-slate-400">
              Últimos 6 meses
            </span>
          </div>

          {/* Gráfico de barras apiladas verticales */}
          <div className="pt-2 pb-1">
            <div className="h-36 flex items-end justify-between gap-3 px-2">
              {evolucionAsistencia.map((item) => (
                <div
                  key={item.mes}
                  className="flex-1 flex flex-col items-center h-full justify-end group"
                >
                  <div className="w-full max-w-[36px] flex flex-col-reverse rounded-t-lg overflow-hidden h-[85%] bg-slate-100 shadow-2xs">
                    {/* Verde: Asistidos */}
                    <div
                      className="bg-emerald-500 transition-all hover:brightness-105"
                      style={{ height: `${item.asistidosPct}%` }}
                      title={`Asistidos: ${item.asistidosPct}%`}
                    />
                    {/* Ámbar: Reprogramados */}
                    <div
                      className="bg-amber-400 transition-all hover:brightness-105"
                      style={{ height: `${item.reprogramadosPct}%` }}
                      title={`Reprogramados: ${item.reprogramadosPct}%`}
                    />
                    {/* Rojo: No Asistidos */}
                    <div
                      className="bg-rose-500 transition-all hover:brightness-105"
                      style={{ height: `${item.noAsistidosPct}%` }}
                      title={`No asistidos: ${item.noAsistidosPct}%`}
                    />
                  </div>

                  <span className="text-[11px] font-bold text-slate-600 mt-2">
                    {item.mes}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leyenda */}
        <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-center gap-4 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
            <span className="text-slate-600 font-medium">Asistidos</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
            <span className="text-slate-600 font-medium">No asistidos</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
            <span className="text-slate-600 font-medium">Reprogramados</span>
          </div>
        </div>
      </div>

      {/* 3. Top Pacientes con Inasistencias */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <AlertOctagon className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">
                Top pacientes con inasistencias
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-slate-400">
              Recurrentes
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {topInasistencias.map((paciente) => (
              <div
                key={paciente.pacienteId}
                onClick={() => onSelectPacienteInasistencia?.(paciente.pacienteId)}
                className="py-3 first:pt-0 last:pb-0 flex items-center justify-between hover:bg-slate-50/60 rounded-xl px-1.5 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200 text-rose-700 font-bold flex items-center justify-center text-xs shrink-0">
                    {paciente.pacienteNombre
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-slate-900">
                      {paciente.pacienteNombre}
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">
                      DNI {paciente.dni}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                    {paciente.inasistencias} ausencias ({paciente.porcentajeInasistencia}%)
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    de {paciente.turnosTotales} turnos
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>Alerta activa para &ge; 3 faltas</span>
          </div>
          <span className="text-blue-600 font-semibold hover:underline cursor-pointer">
            Ver auditoría completa
          </span>
        </div>
      </div>
    </div>
  );
}
