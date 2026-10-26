"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem, SubMenuItem } from "@/types/navigation";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Stethoscope,
  Building2,
  Package,
  ShoppingCart,
  Wallet,
  Receipt,
  FileBarChart,
  Settings,
  ChevronDown,
  X,
  Sparkles,
  LucideIcon,
} from "lucide-react";

interface SidebarProps {
  readonly isMobileOpen?: boolean;
  readonly onCloseMobile?: () => void;
}

// Icon mapping dictionary with strict typing (No 'any')
const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  Calendar,
  Users,
  Stethoscope,
  Building2,
  Package,
  ShoppingCart,
  Wallet,
  Receipt,
  FileBarChart,
  Settings,
};

export const NAVIGATION_ITEMS: readonly NavItem[] = [
  {
    title: "Inicio",
    href: "/",
    iconName: "LayoutDashboard",
  },
  {
    title: "Agenda",
    href: "/agenda",
    iconName: "Calendar",
    badge: "Hoy",
    subItems: [
      { title: "Agenda de Turnos", href: "/agenda" },
      { title: "Control de Asistencia", href: "/asistencia", badge: "KPI" },
      { title: "Cirugías & Quirófano", href: "/cirugias" },
    ],
  },
  {
    title: "Pacientes",
    href: "/pacientes",
    iconName: "Users",
    subItems: [
      { title: "Padrón de Pacientes", href: "/pacientes" },
      { title: "Membresías Familiares", href: "/membresias" },
    ],
  },
  {
    title: "Consultorios",
    href: "/consultorios",
    iconName: "Building2",
    subItems: [
      { title: "Ocupación y Grilla", href: "/consultorios" },
      { title: "Profesionales Médicos", href: "/profesionales" },
    ],
  },
  {
    title: "Insumos y Stock",
    href: "/stock",
    iconName: "Package",
    badge: 3,
  },
  {
    title: "Compras",
    href: "/compras",
    iconName: "ShoppingCart",
    subItems: [
      { title: "Órdenes de Compra", href: "/compras" },
      { title: "Recepción de Proveedores", href: "/compras/proveedores" },
    ],
  },
  {
    title: "Finanzas",
    href: "/finanzas",
    iconName: "Wallet",
    subItems: [
      { title: "Ingresos y Egresos", href: "/finanzas" },
      { title: "Facturación Médica", href: "/facturacion" },
    ],
  },
  {
    title: "Cobranzas",
    href: "/cobranzas",
    iconName: "Receipt",
    badge: "Mora",
    subItems: [
      { title: "Cuentas por Cobrar", href: "/cobranzas" },
      { title: "Cuentas por Pagar", href: "/cuentas-por-pagar" },
    ],
  },
  {
    title: "Reportes",
    href: "/reportes",
    iconName: "FileBarChart",
  },
  {
    title: "Configuración",
    href: "/configuracion",
    iconName: "Settings",
  },
];

export function Sidebar({ isMobileOpen = false, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();

  // Route-matched accordion calculation
  const routeMatchedTitle = NAVIGATION_ITEMS.find((item) => {
    if (!item.subItems) return false;
    return (
      pathname === item.href ||
      item.subItems.some((sub) => pathname === sub.href)
    );
  })?.title ?? null;

  // Track user manual expansion override
  const [userExpandedAccordion, setUserExpandedAccordion] = useState<string | null | undefined>(undefined);
  const [prevPathname, setPrevPathname] = useState<string>(pathname);

  // Reset user override when route changes so active accordion reflects new route
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setUserExpandedAccordion(undefined);
  }

  const openAccordion = userExpandedAccordion !== undefined ? userExpandedAccordion : routeMatchedTitle;

  const handleToggleAccordion = (title: string) => {
    setUserExpandedAccordion((current) => {
      const effectiveCurrent = current !== undefined ? current : routeMatchedTitle;
      return effectiveCurrent === title ? null : title;
    });
  };

  const isLinkActive = (href: string): boolean => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const isSubItemActive = (href: string): boolean => {
    return pathname === href;
  };

  const renderBadge = (badge?: string | number, isPrimaryActive = false) => {
    if (badge === undefined) return null;

    if (typeof badge === "number") {
      return (
        <span
          className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
            isPrimaryActive
              ? "bg-white text-sky-700"
              : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
          }`}
        >
          {badge}
        </span>
      );
    }

    if (badge === "Mora") {
      return (
        <span
          className={`ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded tracking-wide ${
            isPrimaryActive
              ? "bg-white text-sky-700"
              : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
          }`}
        >
          {badge}
        </span>
      );
    }

    return (
      <span
        className={`ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded ${
          isPrimaryActive
            ? "bg-white text-sky-700"
            : "bg-sky-500/20 text-sky-300 border border-sky-500/30"
        }`}
      >
        {badge}
      </span>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0D1927] text-slate-300 select-none">
      {/* Brand Header */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800/80 shrink-0">
        <Link
          href="/"
          onClick={onCloseMobile}
          className="flex items-center gap-3 group focus:outline-none"
        >
          {/* Logo SVG Corporativo Sunnix */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 via-teal-500 to-emerald-400 p-0.5 shadow-md flex items-center justify-center transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-[#0D1927] rounded-[10px] flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-teal-400 fill-current"
              >
                <path d="M10.5 4.5a1.5 1.5 0 0 1 3 0v4.5h4.5a1.5 1.5 0 0 1 0 3H13.5v4.5a1.5 1.5 0 0 1-3 0V12H6a1.5 1.5 0 0 1 0-3h4.5V4.5z" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-wider text-white text-base leading-none font-sans">
                SUNNIX
              </span>
              <span className="text-[10px] px-1 py-0.2 rounded bg-sky-500/20 text-sky-400 font-semibold border border-sky-500/30 leading-tight">
                PRO
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-400 tracking-tight leading-tight mt-0.5">
              Centro Médico
            </span>
          </div>
        </Link>

        {/* Mobile close button */}
        {onCloseMobile && (
          <button
            type="button"
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Cerrar barra lateral"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Menu (Scrollable) */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto custom-scrollbar">
        <p className="px-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Módulos Clínicos
        </p>

        {NAVIGATION_ITEMS.map((item) => {
          const Icon = ICON_MAP[item.iconName] ?? LayoutDashboard;
          const hasSubItems = Boolean(item.subItems && item.subItems.length > 0);
          const isAccordionOpen = openAccordion === item.title;
          const isCurrentActive = isLinkActive(item.href);

          if (!hasSubItems) {
            return (
              <Link
                key={item.title}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                  isCurrentActive
                    ? "bg-sky-600 text-white font-semibold shadow-sm border-l-4 border-sky-300"
                    : "text-slate-400 hover:text-white hover:bg-[#1E293B]/60"
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isCurrentActive
                      ? "text-white"
                      : "text-slate-400 group-hover:text-white"
                  }`}
                />
                <span className="truncate">{item.title}</span>
                {renderBadge(item.badge, isCurrentActive)}
              </Link>
            );
          }

          // Accordion Item
          return (
            <div key={item.title} className="space-y-1">
              <button
                type="button"
                onClick={() => handleToggleAccordion(item.title)}
                aria-expanded={isAccordionOpen}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                  isCurrentActive && !isAccordionOpen
                    ? "bg-[#1E293B] text-sky-400 font-semibold border-l-4 border-sky-500"
                    : "text-slate-400 hover:text-white hover:bg-[#1E293B]/60"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isCurrentActive
                        ? "text-sky-400"
                        : "text-slate-400 group-hover:text-white"
                    }`}
                  />
                  <span className="truncate">{item.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  {renderBadge(item.badge, false)}
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      isAccordionOpen ? "rotate-180 text-white" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Submenu Accordion Panel */}
              {isAccordionOpen && item.subItems && (
                <div className="pl-4 pr-1 py-1 space-y-1 border-l-2 border-slate-800 ml-4 animate-in fade-in slide-in-from-top-1 duration-150">
                  {item.subItems.map((sub: SubMenuItem) => {
                    const isSubActive = isSubItemActive(sub.href);
                    return (
                      <Link
                        key={sub.title}
                        href={sub.href}
                        onClick={onCloseMobile}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                          isSubActive
                            ? "bg-sky-600 text-white font-semibold shadow-xs"
                            : "text-slate-400 hover:text-slate-200 hover:bg-[#1E293B]/40"
                        }`}
                      >
                        <span className="truncate">{sub.title}</span>
                        {renderBadge(sub.badge, isSubActive)}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer System Status Card */}
      <div className="p-3 border-t border-slate-800/80 shrink-0">
        <div className="p-2.5 rounded-xl bg-[#132235] border border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-teal-400 font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Centro Médico Activo</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Sunnix OS v1.0 • Quirófano 1 en línea
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 z-40 shadow-xl border-r border-slate-900">
        {sidebarContent}
      </aside>

      {/* Mobile Off-canvas Drawer & Backdrop */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={onCloseMobile}
            aria-hidden="true"
          />

          {/* Off-canvas sidebar */}
          <div className="fixed inset-y-0 left-0 w-64 max-w-full shadow-2xl z-50 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
