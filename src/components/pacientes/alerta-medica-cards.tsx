"use client";

import React from "react";
import { PacienteDetalle } from "@/types/pacientes";
import {
  ShieldAlert,
  Award,
  CreditCard,
  Droplet,
  ExternalLink,
  Edit2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface AlertaMedicaCardsProps {
  readonly paciente: PacienteDetalle;
  readonly onVerMembresia?: () => void;
  readonly onVerCredencial?: () => void;
  readonly onEditarGrupoSanguineo?: () => void;
}

export function AlertaMedicaCards({
  paciente,
  onVerMembresia,
  onVerCredencial,
  onEditarGrupoSanguineo,
}: AlertaMedicaCardsProps) {
  const { alertaMedica, membresia } = paciente;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Membresía Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Membresía Sunnix
            </span>
            <div className="p-1.5 rounded-lg bg-teal-50 text-teal-600">
              <Award className="w-4 h-4" />
            </div>
          </div>

          {membresia ? (
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-slate-900">
                  {membresia.nombrePlan}
                </span>
                <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Activa
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Cód: {membresia.codigo}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Vto: <strong className="text-slate-700">{membresia.fechaVencimiento}</strong>
              </p>
            </div>
          ) : (
            <div>
              <span className="text-sm font-semibold text-slate-700">
                Particular / Sin membresía
              </span>
              <p className="text-xs text-slate-400 mt-1">
                No posee plan de salud contratado
              </p>
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between">
          <button
            type="button"
            onClick={onVerMembresia}
            className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700 transition-colors"
          >
            <span>Ver detalles</span>
            <ExternalLink className="w-3 h-3" />
          </button>
          {membresia && (
            <span className="text-[10px] text-slate-400">
              {membresia.familiares.length} integrantes
            </span>
          )}
        </div>
      </div>

      {/* 2. Alergias Críticas Card (Highlighted in Red) */}
      <div className="bg-white rounded-xl border border-rose-200 p-4 shadow-xs flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute top-0 left-0 right-0 h-1 bg-rose-500" />
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
              Alergias Críticas
            </span>
            <span className="p-1 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold px-1.5">
              Alerta Médica
            </span>
          </div>

          <div className="min-h-[46px] flex flex-wrap gap-1.5 items-center">
            {alertaMedica.alergias.length > 0 ? (
              alertaMedica.alergias.map((alergia) => (
                <span
                  key={alergia}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs"
                >
                  <AlertCircle className="w-3 h-3 text-rose-500" />
                  {alergia}
                </span>
              ))
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Sin alergias declaradas
              </span>
            )}
          </div>
        </div>

        <div className="pt-2 border-t border-rose-100 mt-2 text-[10px] text-rose-600/80 font-medium">
          Destaque prioritario en prescripción y quirófano
        </div>
      </div>

      {/* 3. Obra Social / Cobertura Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Obra Social / Prepaga
            </span>
            <div className="p-1.5 rounded-lg bg-sky-50 text-sky-600">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-slate-900">
                {paciente.obraSocial}
              </span>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-sky-100 text-sky-800">
                Plan 310
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Afiliado:{" "}
              <strong className="text-slate-800 font-mono">
                {paciente.numeroAfiliado}
              </strong>
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between">
          <button
            type="button"
            onClick={onVerCredencial}
            className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700 transition-colors"
          >
            <span>Ver credencial</span>
            <ExternalLink className="w-3 h-3" />
          </button>
          <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Habilitada
          </span>
        </div>
      </div>

      {/* 4. Grupo Sanguíneo Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Grupo Sanguíneo
            </span>
            <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
              <Droplet className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
              {alertaMedica.grupoSanguineo}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Factor Rh Positivo
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Receptor compatible: A+, A-, O+, O-
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between">
          <button
            type="button"
            onClick={onEditarGrupoSanguineo}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <Edit2 className="w-3 h-3 text-slate-400" />
            <span>Actualizar</span>
          </button>
          <span className="text-[10px] text-slate-400">Verificado en lab</span>
        </div>
      </div>
    </div>
  );
}
