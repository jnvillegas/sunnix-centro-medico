"use client";

import React from "react";
import { MembresiaDetalle } from "@/types/pacientes";
import {
  Users,
  Award,
  CheckCircle2,
  Calendar,
  PlusCircle,
} from "lucide-react";

interface MembresiaFamiliaresCardProps {
  readonly membresia?: MembresiaDetalle;
  readonly onAfiliar?: () => void;
  readonly onAgregarFamiliar?: () => void;
}

export function MembresiaFamiliaresCard({
  membresia,
  onAfiliar,
  onAgregarFamiliar,
}: MembresiaFamiliaresCardProps) {
  if (!membresia) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
          <Award className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-800">
            Paciente sin Membresía Activa
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
            Actualmente se atiende bajo modalidad particular o por cobertura estándar de su obra social.
          </p>
        </div>
        <button
          type="button"
          onClick={onAfiliar}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-teal-600 text-white hover:bg-teal-700 transition-colors shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Vincular a Plan de Membresía</span>
        </button>
      </div>
    );
  }

  const MAX_FAMILIARES = 4;
  const cupoAlcanzado = membresia.familiares.length >= MAX_FAMILIARES;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 md:p-6 shadow-xs space-y-6">
      {/* Header del Plan */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-800">
                {membresia.nombrePlan}
              </h2>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                ● Activa
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Código de socio: <strong>{membresia.codigo}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-slate-600">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>
              Válido hasta: <strong className="text-slate-800">{membresia.fechaVencimiento}</strong>
            </span>
          </div>
          <span className="px-2 py-1 rounded-lg bg-slate-100 text-slate-600 font-semibold text-[11px]">
            {membresia.familiares.length} / {MAX_FAMILIARES} integrantes
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna 1: Beneficios del Plan */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Beneficios Incluidos en el Plan
          </span>
          <div className="space-y-2">
            {membresia.beneficios.map((beneficio) => (
              <div
                key={beneficio}
                className="flex items-start gap-2 text-xs text-slate-700 bg-teal-50/40 border border-teal-100/80 p-2.5 rounded-xl"
              >
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">{beneficio}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Columna 2 y 3: Tabla de Familiares Dependientes */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              Grupo Familiar Registrado
            </span>
            <button
              type="button"
              disabled={cupoAlcanzado}
              onClick={onAgregarFamiliar}
              className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                cupoAlcanzado
                  ? "bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-white border-slate-300 text-sky-600 hover:bg-sky-50 hover:border-sky-300"
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{cupoAlcanzado ? "Cupo completo (4/4)" : "Agregar familiar"}</span>
            </button>
          </div>

          {/* Tabla de Integrantes */}
          <div className="overflow-x-auto rounded-xl border border-slate-200/80">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Integrante</th>
                  <th className="py-2.5 px-3">DNI</th>
                  <th className="py-2.5 px-3">Parentesco</th>
                  <th className="py-2.5 px-3 text-right">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {membresia.familiares.map((familiar) => (
                  <tr
                    key={familiar.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-sky-500 to-teal-500 text-white flex items-center justify-center font-bold text-[10px] shadow-2xs">
                          {familiar.nombreCompleto
                            .split(" ")
                            .map((p) => p[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <span className="font-semibold text-slate-800">
                          {familiar.nombreCompleto}
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-600">
                      {familiar.dni}
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          familiar.parentesco === "Titular"
                            ? "bg-sky-100 text-sky-800"
                            : familiar.parentesco === "Pareja"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {familiar.parentesco}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {familiar.estado ?? "Activo"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
