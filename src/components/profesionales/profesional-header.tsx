"use client";

import React from "react";
import { ProfesionalDetalle } from "@/types/profesionales";
import {
  Stethoscope,
  CreditCard,
  Phone,
  Mail,
  Building2,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  ArrowRight,
  Edit3,
} from "lucide-react";

interface ProfesionalHeaderProps {
  readonly profesional: ProfesionalDetalle;
  readonly onVerAlquiler?: () => void;
  readonly onEditar?: () => void;
}

export function ProfesionalHeader({
  profesional,
  onVerAlquiler,
  onEditar,
}: ProfesionalHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Tarjeta Principal de Identificación */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 md:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Avatar e Identificación */}
          <div className="flex items-start sm:items-center gap-4 md:gap-5">
            <div className="relative shrink-0">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-tr from-sky-600 via-teal-500 to-indigo-500 p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full bg-[#0D1927] rounded-[14px] flex items-center justify-center text-white font-extrabold text-xl md:text-2xl shadow-inner">
                  {profesional.nombreCompleto
                    .split(" ")
                    .filter((p) => !p.startsWith("Dr"))
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
              </div>
              <span
                className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"
                title="Estado: Activo"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                  {profesional.nombreCompleto}
                </h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  ● Activo
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
                  {profesional.especialidad}
                </span>
              </div>

              {/* Fila de metadatos del médico */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 font-medium">
                  <Stethoscope className="w-3.5 h-3.5 text-sky-600" />
                  <span>Matrícula: <strong className="text-slate-800 font-mono">{profesional.matricula}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                  <span>DNI: <strong className="text-slate-800 font-mono">{profesional.dni}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>Consultorio Asignado: <strong className="text-slate-800">{profesional.consultorioAsignadoNombre}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{profesional.telefono}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-700">{profesional.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex items-center gap-2.5 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
            <button
              type="button"
              onClick={onEditar}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 shadow-xs transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5 text-slate-500" />
              <span>Editar legajo</span>
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-sky-600 text-white hover:bg-sky-700 shadow-sm transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Ver agenda</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 KPICards Superiores del Profesional */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* KPI 1: Alquiler de Consultorio */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Alquiler de Consultorio
              </span>
              <div className="p-2 rounded-lg bg-teal-50 text-teal-600">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-slate-900 font-mono">
                $ {profesional.montoAlquilerMensual.toLocaleString("es-AR")}
              </span>
              <span className="text-xs font-medium text-slate-500">/ mes</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Próximo vencimiento: <strong className="text-slate-700">{profesional.proximoVencimientoAlquiler}</strong>
            </p>
          </div>
          <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between">
            <button
              type="button"
              onClick={onVerAlquiler}
              className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700 transition-colors"
            >
              <span>Ver detalle</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Al día
            </span>
          </div>
        </div>

        {/* KPI 2: Facturación del Profesional */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Facturación Producida
              </span>
              <div className="p-2 rounded-lg bg-sky-50 text-sky-600">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-slate-900 font-mono">
                $ {profesional.facturacionMesActual.toLocaleString("es-AR")}
              </span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                +14% vs mes ant.
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Acumulado generado este mes en Sunnix
            </p>
          </div>
          <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between text-xs text-slate-500">
            <span>Consultas y cirugías</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          </div>
        </div>

        {/* KPI 3: Turnos del Mes */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Turnos Realizados
              </span>
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 font-mono">
                {profesional.turnosMesActual}
              </span>
              <span className="text-xs font-medium text-slate-500">
                pacientes atendidos este mes
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Promedio: 6 turnos diarios de atención
            </p>
          </div>
          <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between text-xs text-slate-500">
            <span>Tasa de puntualidad: 96%</span>
            <Clock className="w-3.5 h-3.5 text-sky-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
