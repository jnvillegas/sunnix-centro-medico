"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { TurnoAgendaItem } from "@/types/agenda";
import {
  X,
  Calendar,
  Clock,
  Building2,
  Stethoscope,
  Edit2,
  CalendarSync,
  Trash2,
  ExternalLink,
  History,
} from "lucide-react";

interface TurnoDetalleDrawerProps {
  readonly turno: TurnoAgendaItem | null;
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onEditar?: (turno: TurnoAgendaItem) => void;
  readonly onReprogramar?: (turno: TurnoAgendaItem) => void;
  readonly onCancelar?: (turno: TurnoAgendaItem) => void;
}

export function TurnoDetalleDrawer({
  turno,
  isOpen,
  onClose,
  onEditar,
  onReprogramar,
  onCancelar,
}: TurnoDetalleDrawerProps) {
  const [activeTab, setActiveTab] = useState<"turno" | "historial">("turno");

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !turno) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col justify-between z-10 animate-in slide-in-from-right duration-200">
          {/* Header del Paciente */}
          <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-start justify-between">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-200 uppercase tracking-wide">
                ● {turno.tipo}
              </span>
              <h2 className="text-xl font-bold text-slate-900 leading-tight">
                {turno.pacienteNombre}
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-mono">DNI: {turno.pacienteDni}</span>
                <span>•</span>
                <span>{turno.pacienteEdad} años</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Selector de Pestañas Internas (Turno vs Historial) */}
          <div className="border-b border-slate-200 px-6 bg-white">
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setActiveTab("turno")}
                className={`py-3 text-xs font-bold border-b-2 transition-all ${
                  activeTab === "turno"
                    ? "border-sky-600 text-sky-600"
                    : "border-transparent text-slate-400 hover:text-slate-700"
                }`}
              >
                Detalle del Turno
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("historial")}
                className={`py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                  activeTab === "historial"
                    ? "border-sky-600 text-sky-600"
                    : "border-transparent text-slate-400 hover:text-slate-700"
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>Historial</span>
              </button>
            </div>
          </div>

          {/* Cuerpo del Drawer */}
          <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar flex-1 text-xs">
            {activeTab === "turno" ? (
              <div className="space-y-4">
                {/* Cuadrícula de Fecha y Horario */}
                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <div className="space-y-1">
                    <span className="text-slate-400 font-medium flex items-center gap-1 text-[11px]">
                      <Calendar className="w-3.5 h-3.5 text-sky-600" />
                      Fecha
                    </span>
                    <p className="text-xs font-bold text-slate-800">
                      12/05/2025
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400 font-medium flex items-center gap-1 text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-sky-600" />
                      Horario
                    </span>
                    <p className="text-xs font-bold text-slate-800 font-mono">
                      {turno.horaInicio} - {turno.horaFin} hs
                    </p>
                  </div>
                </div>

                {/* Profesional y Consultorio */}
                <div className="space-y-3 p-3.5 rounded-xl border border-slate-200/80">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                        Profesional a Cargo
                      </span>
                      <p className="text-xs font-bold text-slate-900">
                        {turno.profesionalNombre}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 pt-2 border-t border-slate-100">
                    <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                        Consultorio Asignado
                      </span>
                      <p className="text-xs font-bold text-slate-900">
                        {turno.consultorioNombre}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Motivo de la Cita */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Motivo de la Cita
                  </span>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-slate-800 font-medium">
                    {turno.motivo}
                  </div>
                </div>

                {/* Notas Clínicas */}
                {turno.notas && (
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Notas Clínicas / Administrativas
                    </span>
                    <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 leading-relaxed italic">
                      &ldquo;{turno.notas}&rdquo;
                    </div>
                  </div>
                )}

                {/* Link directo a Ficha 360 */}
                <div className="pt-2">
                  <Link
                    href={`/pacientes/${turno.pacienteId}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:text-sky-700 bg-sky-50 px-3 py-2 rounded-xl w-full justify-center transition-colors"
                  >
                    <span>Ver Ficha 360 del Paciente</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              /* Pestaña de Historial de Turnos */
              <div className="space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Últimas Atenciones en el Centro
                </span>
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">
                        Consulta Dermatología
                      </span>
                      <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Asistió
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      15/04/2025 • Dra. Laura García
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">
                        Control Clínico General
                      </span>
                      <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Asistió
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      10/02/2025 • Dr. Carlos Benítez
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Botones de Acción Inferior */}
          <div className="p-5 border-t border-slate-100 bg-slate-50 flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onEditar?.(turno)}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold bg-sky-600 text-white rounded-xl hover:bg-sky-700 shadow-sm transition-all"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Editar</span>
              </button>

              <button
                type="button"
                onClick={() => onReprogramar?.(turno)}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <CalendarSync className="w-3.5 h-3.5 text-slate-500" />
                <span>Reprogramar</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => onCancelar?.(turno)}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold bg-rose-50 border border-rose-200 text-rose-700 rounded-xl hover:bg-rose-100 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-500" />
              <span>Cancelar Turno</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
