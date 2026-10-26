"use client";

import React, { useState } from "react";
import { TurnoAsistenciaFila } from "@/types/asistencia";
import {
  X,
  AlertTriangle,
  Calendar,
  Clock,
  FileText,
  History,
  CheckCircle2,
  XCircle,
  Activity,
  Phone,
  Mail,
} from "lucide-react";

interface PacienteAsistenciaDrawerProps {
  readonly turno: TurnoAsistenciaFila | null;
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onReprogramar?: (turnoId: string) => void;
  readonly onJustificar?: (turnoId: string) => void;
}

export function PacienteAsistenciaDrawer({
  turno,
  isOpen,
  onClose,
  onReprogramar,
  onJustificar,
}: PacienteAsistenciaDrawerProps) {
  const [activeTab, setActiveTab] = useState<"turnos" | "historial" | "notas">("turnos");

  if (!isOpen || !turno) {
    return null;
  }

  const tieneAlertaAusentismo = turno.inasistenciasPrevias >= 3;

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
              <div className="w-12 h-12 rounded-full bg-blue-100 border border-blue-200 text-blue-700 font-bold flex items-center justify-center text-sm shadow-xs shrink-0">
                {turno.pacienteNombre
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  {turno.pacienteNombre}
                </h2>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mt-0.5">
                  <span className="font-mono">DNI {turno.pacienteDni}</span>
                  <span>•</span>
                  <span>{turno.pacienteEdad} años</span>
                </div>
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

          {/* Contenido con scroll */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {/* Pastilla Azul: Frecuencia de visitas */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/80 text-xs font-semibold">
              <Activity className="w-3.5 h-3.5 text-blue-600" />
              <span>
                Frecuencia de visitas: {turno.frecuenciaVisitas ?? "1 vez cada 2 meses"}
              </span>
            </div>

            {/* BANNER DE ALERTA ÁMBAR (Inasistencias frecuentes) */}
            {tieneAlertaAusentismo && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 shadow-xs">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-amber-900">
                    Paciente con inasistencias frecuentes
                  </h4>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    {turno.inasistenciasPrevias} turnos no asistidos en los últimos 6 meses. Se recomienda confirmar telefónicamente con 48 hs de antelación.
                  </p>
                </div>
              </div>
            )}

            {/* Tabs de Navegación del Drawer */}
            <div className="flex border-b border-slate-200">
              <button
                type="button"
                onClick={() => setActiveTab("turnos")}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all ${
                  activeTab === "turnos"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Turnos</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("historial")}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all ${
                  activeTab === "historial"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>Historial</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("notas")}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all ${
                  activeTab === "notas"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Notas</span>
              </button>
            </div>

            {/* TAB: Turnos Previos */}
            {activeTab === "turnos" && (
              <div className="space-y-3">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Citas registradas
                </div>

                <div className="space-y-2.5">
                  {/* Cita actual */}
                  <div className="p-3 rounded-xl border border-blue-200 bg-blue-50/30 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-slate-900">
                          Hoy - {turno.hora} hs
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-bold">
                          Actual
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {turno.especialidad} • {turno.profesionalNombre}
                      </p>
                    </div>

                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        turno.estado === "asistio"
                          ? "bg-emerald-100 text-emerald-700"
                          : turno.estado === "no_asistio"
                          ? "bg-rose-100 text-rose-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {turno.estado === "asistio"
                        ? "Asistió"
                        : turno.estado === "no_asistio"
                        ? "No asistió"
                        : "Reprogramado"}
                    </span>
                  </div>

                  {/* Citas históricas simuladas */}
                  <div className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-xs text-slate-800">
                        22/04/2025 - 10:30 hs
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Clínica Médica • Dra. Laura García
                      </p>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 flex items-center gap-1">
                      <XCircle className="w-3 h-3" />
                      <span>No asistió</span>
                    </span>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-xs text-slate-800">
                        15/03/2025 - 09:00 hs
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Cardiología • Dr. Roberto López
                      </p>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Asistió</span>
                    </span>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-xs text-slate-800">
                        02/02/2025 - 11:15 hs
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Clínica Médica • Dra. Laura García
                      </p>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 flex items-center gap-1">
                      <XCircle className="w-3 h-3" />
                      <span>No asistió</span>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Historial Analítico */}
            {activeTab === "historial" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[11px] text-slate-500 font-medium block">
                      Turnos Totales
                    </span>
                    <span className="text-xl font-bold text-slate-900 font-mono mt-0.5 block">
                      {8}
                    </span>
                  </div>

                  <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
                    <span className="text-[11px] text-rose-700 font-medium block">
                      Inasistencias
                    </span>
                    <span className="text-xl font-bold text-rose-700 font-mono mt-0.5 block">
                      {turno.inasistenciasPrevias}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600 font-medium">Tasa de ausentismo</span>
                    <span className="font-bold text-rose-600">50%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full rounded-full w-1/2" />
                  </div>
                  <span className="text-[11px] text-slate-400 block">
                    4 de 8 turnos perdidos en los últimos 180 días
                  </span>
                </div>

                <div className="p-3 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                  <div className="font-semibold text-slate-800">Contacto del paciente</div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>+54 11 4899-2310</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>maria.diaz@ejemplo.com</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Notas Administrativas */}
            {activeTab === "notas" && (
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-700">Recepción General</span>
                    <span className="text-slate-400">12/05/2025 09:15</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Se intentó llamar 15 minutos posterior a la hora pautada. Teléfono sonó sin respuesta. Se envía mensaje recordatorio por mail.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-700">Secretaría Médica</span>
                    <span className="text-slate-400">22/04/2025 10:45</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Inasistencia no informada. Se libera el consultorio para sobreturno espontáneo.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer de Acciones del Drawer */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => onJustificar?.(turno.id)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
            >
              Justificar inasistencia
            </button>

            <button
              type="button"
              onClick={() => onReprogramar?.(turno.id)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reprogramar turno</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
