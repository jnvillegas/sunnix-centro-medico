"use client";

import React from "react";
import { PacienteDetalle } from "@/types/pacientes";
import {
  User,
  CreditCard,
  Calendar,
  Phone,
  Mail,
  MapPin,
  HeartPulse,
  Pill,
  FileText,
  AlertCircle,
} from "lucide-react";

interface DatosPersonalesCardProps {
  readonly paciente: PacienteDetalle;
}

export function DatosPersonalesCard({ paciente }: DatosPersonalesCardProps) {
  const { alertaMedica } = paciente;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Columna Izquierda: Datos Filiatorios y Personales */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 md:p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <div className="p-1.5 rounded-lg bg-sky-50 text-sky-600">
            <User className="w-4 h-4" />
          </div>
          <h2 className="text-base font-bold text-slate-800">
            Datos Filiatorios y Contacto
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-slate-400 font-medium">Documento Único (DNI)</span>
            <div className="flex items-center gap-2 font-semibold text-slate-800 text-sm">
              <CreditCard className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{paciente.dni}</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 font-medium">Fecha de Nacimiento & Edad</span>
            <div className="flex items-center gap-2 font-semibold text-slate-800 text-sm">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              <span>
                {paciente.fechaNacimiento} ({paciente.edad} años)
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 font-medium">Teléfono Principal</span>
            <div className="flex items-center gap-2 font-semibold text-slate-800 text-sm">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{paciente.telefono}</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 font-medium">Correo Electrónico</span>
            <div className="flex items-center gap-2 font-semibold text-slate-800 text-sm truncate">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="truncate">{paciente.email}</span>
            </div>
          </div>

          <div className="sm:col-span-2 space-y-1">
            <span className="text-slate-400 font-medium">Domicilio Declarado</span>
            <div className="flex items-center gap-2 font-semibold text-slate-800 text-sm">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{paciente.direccion}</span>
            </div>
          </div>

          <div className="sm:col-span-2 pt-2 border-t border-slate-100 space-y-1">
            <span className="text-slate-400 font-medium">Contacto de Emergencia</span>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 gap-2">
              <div className="flex items-center gap-2 font-semibold text-slate-800 text-xs">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{paciente.contactoEmergenciaNombre}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-sky-700 font-semibold bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                <Phone className="w-3 h-3 text-sky-600" />
                <span>{paciente.contactoEmergenciaTelefono}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Columna Derecha: Antecedentes Clínicos y Medicación */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 md:p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <div className="p-1.5 rounded-lg bg-teal-50 text-teal-600">
            <HeartPulse className="w-4 h-4" />
          </div>
          <h2 className="text-base font-bold text-slate-800">
            Antecedentes Médicos y Tratamiento
          </h2>
        </div>

        {/* Enfermedades Preexistentes */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Enfermedades Preexistentes / Patologías Crónicas
          </span>
          <div className="flex flex-wrap gap-2">
            {alertaMedica.enfermedadesPreexistentes.length > 0 ? (
              alertaMedica.enfermedadesPreexistentes.map((patologia) => (
                <span
                  key={patologia}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  {patologia}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400">
                Sin patologías preexistentes registradas
              </span>
            )}
          </div>
        </div>

        {/* Medicación Habitual */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Medicación Habitual y Posología
          </span>
          <div className="space-y-1.5">
            {alertaMedica.medicamentosHabituales.length > 0 ? (
              alertaMedica.medicamentosHabituales.map((med) => (
                <div
                  key={med}
                  className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200/70 text-xs"
                >
                  <Pill className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">{med}</span>
                </div>
              ))
            ) : (
              <span className="text-xs text-slate-400">
                No toma medicación habitual actualmente
              </span>
            )}
          </div>
        </div>

        {/* Observaciones Médicas */}
        {alertaMedica.observaciones && (
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              Observaciones Clínicas del Especialista
            </span>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-600 leading-relaxed italic">
              &ldquo;{alertaMedica.observaciones}&rdquo;
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
