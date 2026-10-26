"use client";

import React, { useState } from "react";
import {
  TurnoAsistenciaFila,
  EstadoAsistencia,
} from "@/types/asistencia";
import {
  Check,
  X,
  Clock,
  MoreVertical,
  CheckCircle2,
  XCircle,
  CalendarClock,
  User,
} from "lucide-react";

interface AsistenciaTablaProps {
  readonly turnos: readonly TurnoAsistenciaFila[];
  readonly onSelectTurno: (turno: TurnoAsistenciaFila) => void;
  readonly onUpdateEstado: (turnoId: string, nuevoEstado: EstadoAsistencia, nota?: string) => void;
  readonly turnoSeleccionadoId?: string;
}

export function AsistenciaTabla({
  turnos,
  onSelectTurno,
  onUpdateEstado,
  turnoSeleccionadoId,
}: AsistenciaTablaProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const toggleSelectAll = () => {
    if (selectedIds.size === turnos.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(turnos.map((t) => t.id)));
    }
  };

  const toggleSelectRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  const handleActionClick = (
    turnoId: string,
    nuevoEstado: EstadoAsistencia,
    e: React.MouseEvent,
    nota?: string
  ) => {
    e.stopPropagation();
    onUpdateEstado(turnoId, nuevoEstado, nota);
    setOpenMenuId(null);
  };

  if (turnos.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-xs">
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
          <User className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-semibold text-slate-800 mb-1">
          No hay turnos registrados
        </h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          No se encontraron turnos con los filtros seleccionados para este día. Intenta cambiar el profesional o la especialidad.
        </p>
      </div>
    );
  }

  const allSelected = turnos.length > 0 && selectedIds.size === turnos.length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/75 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-4 w-10 text-center">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  aria-label="Seleccionar todos los turnos"
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer w-4 h-4"
                />
              </th>
              <th className="py-3 px-3">Hora</th>
              <th className="py-3 px-4">Paciente</th>
              <th className="py-3 px-4">Profesional</th>
              <th className="py-3 px-4">Especialidad</th>
              <th className="py-3 px-3">Tipo</th>
              <th className="py-3 px-4">Estado</th>
              <th className="py-3 px-3 w-16 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {turnos.map((turno) => {
              const isSelected = selectedIds.has(turno.id);
              const isRowActive = turnoSeleccionadoId === turno.id;
              const isMenuOpen = openMenuId === turno.id;

              return (
                <tr
                  key={turno.id}
                  onClick={() => onSelectTurno(turno)}
                  className={`cursor-pointer transition-colors hover:bg-blue-50/40 ${
                    isRowActive ? "bg-blue-50/80 border-l-4 border-l-blue-600" : ""
                  }`}
                >
                  {/* Checkbox */}
                  <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => toggleSelectRow(turno.id, e as unknown as React.MouseEvent)}
                      aria-label={`Seleccionar turno de ${turno.pacienteNombre}`}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer w-4 h-4"
                    />
                  </td>

                  {/* Hora */}
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-800 whitespace-nowrap">
                    {turno.hora} hs
                  </td>

                  {/* Paciente con Avatar */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs shrink-0 shadow-2xs">
                        {turno.pacienteNombre
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                          <span>{turno.pacienteNombre}</span>
                          {turno.inasistenciasPrevias >= 3 && (
                            <span
                              title="Paciente con inasistencias frecuentes (3+ en los últimos 6 meses)"
                              className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"
                            />
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">
                          DNI {turno.pacienteDni}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Profesional */}
                  <td className="py-3.5 px-4 font-medium text-slate-800 whitespace-nowrap">
                    {turno.profesionalNombre}
                  </td>

                  {/* Especialidad */}
                  <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                    {turno.especialidad}
                  </td>

                  {/* Tipo */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span className="inline-flex px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                      {turno.tipo}
                    </span>
                  </td>

                  {/* Badges de Estado */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {turno.estado === "asistio" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Asistió</span>
                      </span>
                    )}

                    {turno.estado === "no_asistio" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                        <X className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>No asistió</span>
                      </span>
                    )}

                    {turno.estado === "reprogramado" && (
                      <div className="inline-flex flex-col">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Reprogramado</span>
                        </span>
                        {turno.notaEstado && (
                          <span className="text-[10px] text-amber-700/80 font-medium mt-0.5 pl-1">
                            {turno.notaEstado}
                          </span>
                        )}
                      </div>
                    )}
                  </td>

                  {/* Acciones */}
                  <td
                    className="py-3.5 px-3 text-center relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenMenuId(isMenuOpen ? null : turno.id)}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      title="Acciones del turno"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {/* Menú Desplegable de Conmutación de Estado */}
                    {isMenuOpen && (
                      <div className="absolute right-3 top-10 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-30 animate-in fade-in zoom-in-95 duration-100 text-left">
                        <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Cambiar estado
                        </div>

                        <button
                          type="button"
                          onClick={(e) => handleActionClick(turno.id, "asistio", e)}
                          className="w-full px-3 py-2 text-xs font-medium text-emerald-700 hover:bg-emerald-50 flex items-center gap-2 transition-colors"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Marcar Asistió</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleActionClick(turno.id, "no_asistio", e)}
                          className="w-full px-3 py-2 text-xs font-medium text-rose-700 hover:bg-rose-50 flex items-center gap-2 transition-colors"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Marcar No asistió</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) =>
                            handleActionClick(
                              turno.id,
                              "reprogramado",
                              e,
                              "Reprogramado para 16/05"
                            )
                          }
                          className="w-full px-3 py-2 text-xs font-medium text-amber-700 hover:bg-amber-50 flex items-center gap-2 transition-colors"
                        >
                          <CalendarClock className="w-3.5 h-3.5" />
                          <span>Reprogramar turno</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer de Tabla con Conteo */}
      <div className="px-4 py-3 bg-slate-50/50 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
        <div>
          Mostrando <span className="font-semibold text-slate-800">{turnos.length}</span> turnos
          {selectedIds.size > 0 && (
            <span className="ml-2 font-medium text-blue-600">
              ({selectedIds.size} seleccionados)
            </span>
          )}
        </div>
        <div className="text-[11px] text-slate-400">
          Haz clic en cualquier fila para inspeccionar el historial y ausentismo del paciente
        </div>
      </div>
    </div>
  );
}
