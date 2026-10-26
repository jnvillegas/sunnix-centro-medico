"use client";

import React from "react";
import { DiaAgendaSemanal } from "@/types/profesionales";
import {
  Clock,
  Building2,
  CheckCircle2,
  XCircle,
  Edit2,
  CalendarDays,
} from "lucide-react";

interface AgendaSemanalTableProps {
  readonly agenda: readonly DiaAgendaSemanal[];
  readonly onModificarDia?: (dia: DiaAgendaSemanal) => void;
}

export function AgendaSemanalTable({
  agenda,
  onModificarDia,
}: AgendaSemanalTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 md:p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-sky-50 text-sky-600">
            <CalendarDays className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">
              Agenda Semanal Fija y Disponibilidad
            </h3>
            <p className="text-xs text-slate-500">
              Franjas horarias fijas contratadas y asignadas a consultorios.
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
          3 días activos por semana
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200/80">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px] font-semibold">
            <tr>
              <th className="py-3 px-4">Día de la Semana</th>
              <th className="py-3 px-4">Franja Horaria</th>
              <th className="py-3 px-4">Consultorio Asignado</th>
              <th className="py-3 px-4">Estado</th>
              <th className="py-3 px-4 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {agenda.map((item) => (
              <tr
                key={item.dia}
                className="hover:bg-slate-50/80 transition-colors"
              >
                <td className="py-3 px-4">
                  <span className="font-bold text-slate-900">{item.dia}</span>
                </td>
                <td className="py-3 px-4">
                  {item.activo ? (
                    <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                      <Clock className="w-3.5 h-3.5 text-sky-600" />
                      <span>{item.horario}</span>
                    </div>
                  ) : (
                    <span className="text-slate-400 font-normal">Sin atención</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  {item.activo ? (
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <Building2 className="w-3.5 h-3.5 text-teal-600" />
                      <span>{item.consultorioNombre}</span>
                    </div>
                  ) : (
                    <span className="text-slate-400 font-normal">-</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  {item.activo ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Activo
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-500 border border-slate-200">
                      <XCircle className="w-3 h-3 text-slate-400" />
                      Inactivo
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    type="button"
                    onClick={() => onModificarDia?.(item)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700 transition-colors"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Modificar</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
