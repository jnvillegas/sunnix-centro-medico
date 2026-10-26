"use client";

import React, { useState } from "react";
import { TurnoPaciente, EstadoTurnoPaciente } from "@/types/pacientes";
import {
  Calendar,
  Clock,
  User,
  Building2,
  CheckCircle2,
  AlertCircle,
  XCircle,
  CalendarDays,
  History,
} from "lucide-react";

interface TurnosWidgetProps {
  readonly prosimosTurnos?: readonly TurnoPaciente[];
  readonly historialTurnos?: readonly TurnoPaciente[];
}

export function TurnosWidget({
  prosimosTurnos = [],
  historialTurnos = [],
}: TurnosWidgetProps) {
  const [activeTab, setActiveTab] = useState<"proximos" | "historial">("proximos");

  const getBadgeStyle = (estado: EstadoTurnoPaciente) => {
    switch (estado) {
      case "confirmado":
        return {
          classes: "bg-sky-50 text-sky-700 border-sky-200",
          icon: <CheckCircle2 className="w-3 h-3 text-sky-600" />,
          label: "Confirmado",
        };
      case "pendiente":
        return {
          classes: "bg-amber-50 text-amber-700 border-amber-200",
          icon: <AlertCircle className="w-3 h-3 text-amber-600" />,
          label: "Pendiente",
        };
      case "asistio":
        return {
          classes: "bg-emerald-50 text-emerald-700 border-emerald-200",
          icon: <CheckCircle2 className="w-3 h-3 text-emerald-600" />,
          label: "Asistió",
        };
      case "no_asistio":
        return {
          classes: "bg-rose-50 text-rose-700 border-rose-200",
          icon: <XCircle className="w-3 h-3 text-rose-600" />,
          label: "No asistió",
        };
      default:
        return {
          classes: "bg-slate-50 text-slate-700 border-slate-200",
          icon: <Clock className="w-3 h-3 text-slate-400" />,
          label: estado,
        };
    }
  };

  const listaActual = activeTab === "proximos" ? prosimosTurnos : historialTurnos;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 md:p-6 shadow-xs space-y-5">
      {/* Header con tabs de conmutación */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-sky-50 text-sky-600">
            <Calendar className="w-4 h-4" />
          </div>
          <h2 className="text-base font-bold text-slate-800">
            Agenda y Atención del Paciente
          </h2>
        </div>

        {/* Tab pills */}
        <div className="inline-flex p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("proximos")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "proximos"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Próximos Turnos ({prosimosTurnos.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("historial")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "historial"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Historial ({historialTurnos.length})</span>
          </button>
        </div>
      </div>

      {/* Lista de Turnos */}
      {listaActual.length === 0 ? (
        <div className="text-center py-8 text-xs text-slate-400">
          No hay turnos registrados en este período.
        </div>
      ) : (
        <div className="space-y-3">
          {listaActual.map((turno) => {
            const badge = getBadgeStyle(turno.estado);

            return (
              <div
                key={turno.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-slate-300 transition-colors gap-3"
              >
                {/* Info principal: Especialidad, médico, consultorio */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">
                      {turno.especialidad}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${badge.classes}`}
                    >
                      {badge.icon}
                      {badge.label}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                    <div className="flex items-center gap-1 font-medium text-slate-700">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{turno.profesional}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{turno.consultorio}</span>
                    </div>
                  </div>

                  {turno.motivo && (
                    <p className="text-[11px] text-slate-500 pt-0.5">
                      Motivo: <span className="text-slate-700">{turno.motivo}</span>
                    </p>
                  )}
                </div>

                {/* Fecha y Hora en pill destacada */}
                <div className="flex items-center sm:flex-col sm:items-end justify-between shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/50">
                  <span className="text-xs font-bold text-slate-900">
                    {turno.fecha}
                  </span>
                  {turno.hora && (
                    <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100">
                      {turno.hora}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
