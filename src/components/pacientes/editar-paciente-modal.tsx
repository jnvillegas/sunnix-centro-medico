"use client";

import React, { useState } from "react";
import { PacienteDetalle } from "@/types/pacientes";
import { pacienteFormSchema, PacienteFormData } from "@/lib/data/mock-pacientes";
import { X, Save, AlertCircle, CheckCircle2 } from "lucide-react";

interface EditarPacienteModalProps {
  readonly paciente: PacienteDetalle;
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSave: (updated: PacienteDetalle) => void;
}

export function EditarPacienteModal({
  paciente,
  isOpen,
  onClose,
  onSave,
}: EditarPacienteModalProps) {
  const [formData, setFormData] = useState<PacienteFormData>({
    nombreCompleto: paciente.nombreCompleto,
    dni: paciente.dni,
    fechaNacimiento: paciente.fechaNacimiento,
    telefono: paciente.telefono,
    email: paciente.email,
    direccion: paciente.direccion,
    obraSocial: paciente.obraSocial,
    numeroAfiliado: paciente.numeroAfiliado,
    contactoEmergenciaNombre: paciente.contactoEmergenciaNombre,
    contactoEmergenciaTelefono: paciente.contactoEmergenciaTelefono,
    grupoSanguineo: paciente.alertaMedica.grupoSanguineo,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof PacienteFormData, string>>>({});
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleChange = (field: keyof PacienteFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field error on change
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Zod validation
    const result = pacienteFormSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof PacienteFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof PacienteFormData;
        if (fieldName && !fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    // Prepare updated patient object
    const updatedPatient: PacienteDetalle = {
      ...paciente,
      nombreCompleto: result.data.nombreCompleto,
      dni: result.data.dni,
      fechaNacimiento: result.data.fechaNacimiento,
      telefono: result.data.telefono,
      email: result.data.email,
      direccion: result.data.direccion,
      obraSocial: result.data.obraSocial,
      numeroAfiliado: result.data.numeroAfiliado,
      contactoEmergenciaNombre: result.data.contactoEmergenciaNombre,
      contactoEmergenciaTelefono: result.data.contactoEmergenciaTelefono,
      alertaMedica: {
        ...paciente.alertaMedica,
        grupoSanguineo: result.data.grupoSanguineo,
      },
    };

    onSave(updatedPatient);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-base font-bold text-slate-800">
              Editar Datos del Paciente
            </h3>
            <p className="text-xs text-slate-500">
              Actualización de datos filiatorios y cobertura médica con validación Zod.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success message */}
        {showSuccessToast && (
          <div className="m-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Datos guardados exitosamente.</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nombre Completo */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 block">
                Nombre Completo *
              </label>
              <input
                type="text"
                value={formData.nombreCompleto}
                onChange={(e) => handleChange("nombreCompleto", e.target.value)}
                className={`w-full px-3 py-2 text-xs rounded-xl border ${
                  errors.nombreCompleto
                    ? "border-rose-400 bg-rose-50/50"
                    : "border-slate-300 focus:border-sky-500"
                } focus:outline-none focus:ring-2 focus:ring-sky-500/20`}
              />
              {errors.nombreCompleto && (
                <p className="text-[11px] text-rose-600 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3" /> {errors.nombreCompleto}
                </p>
              )}
            </div>

            {/* DNI */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 block">
                DNI / Documento *
              </label>
              <input
                type="text"
                value={formData.dni}
                onChange={(e) => handleChange("dni", e.target.value)}
                className={`w-full px-3 py-2 text-xs rounded-xl border ${
                  errors.dni
                    ? "border-rose-400 bg-rose-50/50"
                    : "border-slate-300 focus:border-sky-500"
                } focus:outline-none focus:ring-2 focus:ring-sky-500/20`}
              />
              {errors.dni && (
                <p className="text-[11px] text-rose-600 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3" /> {errors.dni}
                </p>
              )}
            </div>

            {/* Fecha Nacimiento */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 block">
                Fecha de Nacimiento *
              </label>
              <input
                type="date"
                value={formData.fechaNacimiento}
                onChange={(e) => handleChange("fechaNacimiento", e.target.value)}
                className={`w-full px-3 py-2 text-xs rounded-xl border ${
                  errors.fechaNacimiento
                    ? "border-rose-400 bg-rose-50/50"
                    : "border-slate-300 focus:border-sky-500"
                } focus:outline-none focus:ring-2 focus:ring-sky-500/20`}
              />
              {errors.fechaNacimiento && (
                <p className="text-[11px] text-rose-600 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3" /> {errors.fechaNacimiento}
                </p>
              )}
            </div>

            {/* Teléfono */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 block">
                Teléfono de Contacto *
              </label>
              <input
                type="text"
                value={formData.telefono}
                onChange={(e) => handleChange("telefono", e.target.value)}
                className={`w-full px-3 py-2 text-xs rounded-xl border ${
                  errors.telefono
                    ? "border-rose-400 bg-rose-50/50"
                    : "border-slate-300 focus:border-sky-500"
                } focus:outline-none focus:ring-2 focus:ring-sky-500/20`}
              />
              {errors.telefono && (
                <p className="text-[11px] text-rose-600 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3" /> {errors.telefono}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 block">
                Correo Electrónico *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={`w-full px-3 py-2 text-xs rounded-xl border ${
                  errors.email
                    ? "border-rose-400 bg-rose-50/50"
                    : "border-slate-300 focus:border-sky-500"
                } focus:outline-none focus:ring-2 focus:ring-sky-500/20`}
              />
              {errors.email && (
                <p className="text-[11px] text-rose-600 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3" /> {errors.email}
                </p>
              )}
            </div>

            {/* Domicilio */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 block">
                Domicilio Postal *
              </label>
              <input
                type="text"
                value={formData.direccion}
                onChange={(e) => handleChange("direccion", e.target.value)}
                className={`w-full px-3 py-2 text-xs rounded-xl border ${
                  errors.direccion
                    ? "border-rose-400 bg-rose-50/50"
                    : "border-slate-300 focus:border-sky-500"
                } focus:outline-none focus:ring-2 focus:ring-sky-500/20`}
              />
              {errors.direccion && (
                <p className="text-[11px] text-rose-600 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3" /> {errors.direccion}
                </p>
              )}
            </div>

            {/* Obra Social */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 block">
                Obra Social / Prepaga *
              </label>
              <input
                type="text"
                value={formData.obraSocial}
                onChange={(e) => handleChange("obraSocial", e.target.value)}
                className={`w-full px-3 py-2 text-xs rounded-xl border ${
                  errors.obraSocial
                    ? "border-rose-400 bg-rose-50/50"
                    : "border-slate-300 focus:border-sky-500"
                } focus:outline-none focus:ring-2 focus:ring-sky-500/20`}
              />
              {errors.obraSocial && (
                <p className="text-[11px] text-rose-600 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3" /> {errors.obraSocial}
                </p>
              )}
            </div>

            {/* Número Afiliado */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 block">
                N° de Afiliado *
              </label>
              <input
                type="text"
                value={formData.numeroAfiliado}
                onChange={(e) => handleChange("numeroAfiliado", e.target.value)}
                className={`w-full px-3 py-2 text-xs rounded-xl border ${
                  errors.numeroAfiliado
                    ? "border-rose-400 bg-rose-50/50"
                    : "border-slate-300 focus:border-sky-500"
                } focus:outline-none focus:ring-2 focus:ring-sky-500/20`}
              />
              {errors.numeroAfiliado && (
                <p className="text-[11px] text-rose-600 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3" /> {errors.numeroAfiliado}
                </p>
              )}
            </div>

            {/* Grupo Sanguíneo */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 block">
                Grupo Sanguíneo *
              </label>
              <select
                value={formData.grupoSanguineo}
                onChange={(e) => handleChange("grupoSanguineo", e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 bg-white"
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            {/* Contacto Emergencia Nombre */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 block">
                Contacto de Emergencia (Nombre) *
              </label>
              <input
                type="text"
                value={formData.contactoEmergenciaNombre}
                onChange={(e) =>
                  handleChange("contactoEmergenciaNombre", e.target.value)
                }
                className={`w-full px-3 py-2 text-xs rounded-xl border ${
                  errors.contactoEmergenciaNombre
                    ? "border-rose-400 bg-rose-50/50"
                    : "border-slate-300 focus:border-sky-500"
                } focus:outline-none focus:ring-2 focus:ring-sky-500/20`}
              />
              {errors.contactoEmergenciaNombre && (
                <p className="text-[11px] text-rose-600 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3" /> {errors.contactoEmergenciaNombre}
                </p>
              )}
            </div>

            {/* Contacto Emergencia Teléfono */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 block">
                Contacto de Emergencia (Teléfono) *
              </label>
              <input
                type="text"
                value={formData.contactoEmergenciaTelefono}
                onChange={(e) =>
                  handleChange("contactoEmergenciaTelefono", e.target.value)
                }
                className={`w-full px-3 py-2 text-xs rounded-xl border ${
                  errors.contactoEmergenciaTelefono
                    ? "border-rose-400 bg-rose-50/50"
                    : "border-slate-300 focus:border-sky-500"
                } focus:outline-none focus:ring-2 focus:ring-sky-500/20`}
              />
              {errors.contactoEmergenciaTelefono && (
                <p className="text-[11px] text-rose-600 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3" /> {errors.contactoEmergenciaTelefono}
                </p>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold bg-sky-600 text-white rounded-xl hover:bg-sky-700 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Guardar Cambios</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
