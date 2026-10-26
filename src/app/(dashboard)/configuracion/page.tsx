"use client";

import React, { useState } from "react";
import {
  Building2,
  Clock,
  Percent,
  Mail,
  Phone,
  MapPin,
  Save,
  CheckCircle2,
} from "lucide-react";

export default function ConfiguracionPage() {
  const [guardado, setGuardado] = useState<boolean>(false);
  const [nombreCentro, setNombreCentro] = useState<string>("Centro Médico Sunnix");
  const [cuit, setCuit] = useState<string>("30-71458921-9");
  const [direccion, setDireccion] = useState<string>("Av. Santa Fe 3250, CABA");
  const [telefono, setTelefono] = useState<string>("+54 11 4821-9900");
  const [email, setEmail] = useState<string>("administracion@sunnixmed.com.ar");
  const [tasaMora, setTasaMora] = useState<number>(2.0);
  const [horarioApertura, setHorarioApertura] = useState<string>("08:00");
  const [horarioCierre, setHorarioCierre] = useState<string>("20:00");

  const handleGuardar = (e: React.FormEvent) => {
    e.preventDefault();
    setGuardado(true);
    setTimeout(() => setGuardado(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* 1. Cabecera */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              Sistema y Operaciones
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 mt-2">
            Configuración del Centro Médico
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Parámetros institucionales, horarios operativos y reglas de cobranza y mora.
          </p>
        </div>

        {guardado && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-semibold animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Cambios guardados con éxito</span>
          </div>
        )}
      </div>

      <form onSubmit={handleGuardar} className="space-y-6">
        {/* 2. Datos Institucionales */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Building2 className="w-5 h-5 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900">
              Datos Institucionales de la Clínica
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Razón Social / Nombre Comercial
              </label>
              <input
                type="text"
                value={nombreCentro}
                onChange={(e) => setNombreCentro(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                CUIT Institucional
              </label>
              <input
                type="text"
                value={cuit}
                onChange={(e) => setCuit(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Dirección Principal
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Teléfono de Administración
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. Parámetros Operativos y Horarios */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Clock className="w-5 h-5 text-indigo-600" />
            <h2 className="text-sm font-bold text-slate-900">
              Horarios de Atención y Agenda
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Horario de Apertura
              </label>
              <input
                type="time"
                value={horarioApertura}
                onChange={(e) => setHorarioApertura(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Horario de Cierre
              </label>
              <input
                type="time"
                value={horarioCierre}
                onChange={(e) => setHorarioCierre(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* 4. Reglas Financieras y Cálculo de Mora */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Percent className="w-5 h-5 text-amber-600" />
            <h2 className="text-sm font-bold text-slate-900">
              Parámetros de Finanzas y Mora Diaria
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tasa Mensual de Interés Punitorio (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="30"
                  value={tasaMora}
                  onChange={(e) => setTasaMora(parseFloat(e.target.value) || 0)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <p className="text-2xs text-slate-400 mt-1">
                Equivale a {(tasaMora / 30).toFixed(3)}% diario aplicado en el módulo de Cobranzas.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email para Avisos de Cobranza
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 5. Botón de Guardado */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs hover:shadow-sm transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Configuración</span>
          </button>
        </div>
      </form>
    </div>
  );
}
