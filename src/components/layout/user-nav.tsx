"use client";

import React, { useState, useRef, useEffect } from "react";
import { UserSessionProfile } from "@/types/navigation";
import {
  ChevronDown,
  User,
  Settings,
  ShieldCheck,
  LogOut,
  Bell,
} from "lucide-react";

interface UserNavProps {
  readonly user?: UserSessionProfile;
}

const DEFAULT_USER: UserSessionProfile = {
  id: "usr-001",
  name: "Marisol",
  role: "Administrador",
  initials: "MA",
};

export function UserNav({ user = DEFAULT_USER }: UserNavProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="flex items-center gap-3 p-1.5 pr-2.5 rounded-full hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500/20"
      >
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-600 to-teal-500 text-white flex items-center justify-center text-xs font-bold shadow-sm ring-2 ring-white">
          {user.initials}
        </div>
        <div className="hidden md:flex flex-col text-left">
          <span className="text-sm font-semibold text-slate-800 leading-tight">
            {user.name}
          </span>
          <span className="text-[11px] font-medium text-slate-500 leading-tight">
            {user.role}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-sky-600" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200/80 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
        >
          {/* Header profile info */}
          <div className="px-4 py-3 border-b border-slate-100">
            <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
              Sesión Activa
            </p>
            <p className="text-sm font-bold text-slate-800 mt-0.5">
              {user.name} Fernández
            </p>
            <p className="text-xs text-slate-500 truncate">
              marisol.admin@sunnix.med
            </p>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                ● {user.role}
              </span>
              <span className="text-[10px] text-slate-400">Sucursal Central</span>
            </div>
          </div>

          {/* Navigation actions */}
          <div className="py-1">
            <button
              type="button"
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-sky-600 transition-colors"
            >
              <User className="w-4 h-4 text-slate-400" />
              <span>Mi Perfil</span>
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-sky-600 transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>Configuración de Cuenta</span>
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-sky-600 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-slate-400" />
              <span>Registro de Auditoría</span>
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-sky-600 transition-colors"
            >
              <Bell className="w-4 h-4 text-slate-400" />
              <span>Preferencias de Notificaciones</span>
            </button>
          </div>

          <div className="border-t border-slate-100 my-1" />

          {/* Logout */}
          <div className="py-1">
            <button
              type="button"
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <LogOut className="w-4 h-4 text-rose-500" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
