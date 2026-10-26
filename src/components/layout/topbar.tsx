"use client";

import React, { useState } from "react";
import {
  Search,
  Calendar,
  Bell,
  Menu,
  ChevronDown,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { UserNav } from "@/components/layout/user-nav";

interface TopbarProps {
  readonly onOpenMobileMenu?: () => void;
}

export function Topbar({ onOpenMobileMenu }: TopbarProps) {
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [selectedDate] = useState<string>("Lunes, 12 de mayo de 2025");

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Left section: Hamburger button & Quick search */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          aria-label="Abrir menú de navegación"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Input */}
        <div className="relative w-full max-w-md hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar paciente por DNI, médico o turno..."
            className="w-full pl-10 pr-16 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
          />
          <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
            <kbd className="inline-flex items-center px-1.5 py-0.5 border border-slate-200 rounded text-[10px] font-mono text-slate-400 bg-white">
              Ctrl K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right section: Date Picker, Notifications & User Nav */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Date / Period Selector */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer text-slate-700">
          <Calendar className="w-4 h-4 text-sky-600" />
          <span className="text-xs font-semibold text-slate-700">
            {selectedDate}
          </span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-sky-100 text-sky-800">
            Hoy
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications((prev) => !prev)}
            className="relative p-2 rounded-full text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            aria-label="Ver notificaciones del sistema"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-xs">
              3
            </span>
          </button>

          {/* Quick Notifications Popover */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Notificaciones Operativas
                </h4>
                <span className="text-[10px] font-semibold text-sky-600 hover:underline cursor-pointer">
                  Marcar leídas
                </span>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                <div className="p-3 hover:bg-slate-50 transition-colors flex gap-2.5 items-start">
                  <span className="p-1.5 rounded-full bg-amber-50 text-amber-600 shrink-0">
                    <AlertTriangle className="w-3.5 h-3.5" />
                  </span>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-800">
                      Insumo bajo stock mínimo
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Guantes de látex talle M (Quedan 12 unidades).
                    </p>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" /> Hace 15 min
                    </span>
                  </div>
                </div>
                <div className="p-3 hover:bg-slate-50 transition-colors flex gap-2.5 items-start">
                  <span className="p-1.5 rounded-full bg-emerald-50 text-emerald-600 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-800">
                      Orden de compra recepcionada
                    </p>
                    <p className="text-[11px] text-slate-500">
                      OC #1042 ingresada por Droguería Central.
                    </p>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" /> Hace 1 hora
                    </span>
                  </div>
                </div>
                <div className="p-3 hover:bg-slate-50 transition-colors flex gap-2.5 items-start">
                  <span className="p-1.5 rounded-full bg-sky-50 text-sky-600 shrink-0">
                    <Calendar className="w-3.5 h-3.5" />
                  </span>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-800">
                      Quirófano 1 preparado
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Cirugía menor programada para las 14:00 hs.
                    </p>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" /> Hace 2 horas
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-slate-200 hidden sm:block" />

        {/* User Navigation Component */}
        <UserNav />
      </div>
    </header>
  );
}
