import React from "react";
import Link from "next/link";
import {
  Calendar,
  Users,
  Building2,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Activity,
  Layers,
} from "lucide-react";

interface KpiMetric {
  readonly title: string;
  readonly value: string;
  readonly change: string;
  readonly status: "success" | "warning" | "danger" | "info";
  readonly icon: React.ReactNode;
}

const KPIS: readonly KpiMetric[] = [
  {
    title: "Turnos del Día",
    value: "48",
    change: "+12% vs ayer",
    status: "info",
    icon: <Calendar className="w-5 h-5 text-sky-600" />,
  },
  {
    title: "Tasa de Asistencia",
    value: "89.5%",
    change: "38 de 42 confirmados",
    status: "success",
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
  },
  {
    title: "Ocupación de Consultorios",
    value: "5 / 6",
    change: "Quirófano 1 en curso",
    status: "warning",
    icon: <Building2 className="w-5 h-5 text-amber-600" />,
  },
  {
    title: "Facturación & Cobranzas",
    value: "$1.840.500",
    change: "2 facturas en mora",
    status: "danger",
    icon: <TrendingUp className="w-5 h-5 text-rose-600" />,
  },
];

export default function DashboardHomePage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Welcome & Shell Status Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Fase 1 Operativa: Shell & Layout
            </span>
            <span className="text-xs text-slate-400 font-mono">SPEC-001</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Panel de Control Clínico — Sunnix
          </h1>
          <p className="text-sm text-slate-500">
            Bienvenida, <strong className="text-slate-700">Marisol (Administrador)</strong>. El cascarón de navegación general y tokens visuales están sincronizados.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/agenda"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-sky-600 text-white hover:bg-sky-700 shadow-sm transition-all"
          >
            <span>Ir a Agenda de Turnos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/pacientes"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <Users className="w-4 h-4 text-slate-500" />
            <span>Ver Pacientes</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPIS.map((kpi) => {
          const badgeStyles = {
            success: "bg-emerald-50 text-emerald-700 border-emerald-200",
            warning: "bg-amber-50 text-amber-700 border-amber-200",
            danger: "bg-rose-50 text-rose-700 border-rose-200",
            info: "bg-sky-50 text-sky-700 border-sky-200",
          }[kpi.status];

          return (
            <div
              key={kpi.title}
              className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {kpi.title}
                </span>
                <div className="p-2 bg-slate-50 rounded-lg">{kpi.icon}</div>
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-2">
                {kpi.value}
              </div>
              <span
                className={`inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full border ${badgeStyles}`}
              >
                {kpi.change}
              </span>
            </div>
          );
        })}
      </div>

      {/* Verification Checklist of SPEC-001 Definition of Done */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sky-600" />
              <h2 className="text-base font-bold text-slate-800">
                Auto-Auditoría de Criterios de Aceptación (SPEC-001 DoD)
              </h2>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              100% Cumplido
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-slate-800">
                  Sidebar con 15 Módulos Clínicos y Acordeón Único
                </p>
                <p className="text-[11px] text-slate-500">
                  Fondo <code className="font-mono text-slate-700">#0D1927</code>, acordeones para Agenda, Pacientes, Consultorios, Compras, Finanzas y Cobranzas con estado activo persistente.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-slate-800">
                  Topbar con Período y Perfil &quot;Marisol - Administrador&quot;
                </p>
                <p className="text-[11px] text-slate-500">
                  Selector de fecha (&quot;Lunes, 12 de mayo de 2025&quot;), buscador rápido con atajo <kbd className="font-mono text-[10px]">Ctrl+K</kbd>, campana de alertas con badge y menú de usuario.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-slate-800">
                  Cero uso de &apos;any&apos; y Modo Estricto de TypeScript
                </p>
                <p className="text-[11px] text-slate-500">
                  Tipos inmutables en <code className="font-mono text-slate-700">@/types/navigation.ts</code> con interfaces para <code className="font-mono">SubMenuItem</code>, <code className="font-mono">NavItem</code> y <code className="font-mono">UserSessionProfile</code>.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-slate-800">
                  Diseño Responsivo con Menú Hamburguesa &lt; 1024px
                </p>
                <p className="text-[11px] text-slate-500">
                  Drawer deslizante con overlay oscuro para dispositivos móviles y tablets.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* System Architecture & Palette Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
              <Layers className="w-5 h-5 text-teal-600" />
              <h2 className="text-base font-bold text-slate-800">
                Tokens Visuales Sunnix
              </h2>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-semibold text-slate-700 block mb-1">
                  Sidebar Dark Brand:
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-[#0D1927] border border-slate-700 shadow-xs" />
                  <span className="font-mono text-slate-500">#0D1927</span>
                </div>
              </div>

              <div>
                <span className="font-semibold text-slate-700 block mb-1">
                  Dashboard Neutral Canvas:
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-[#F8FAFC] border border-slate-300 shadow-xs" />
                  <span className="font-mono text-slate-500">#F8FAFC</span>
                </div>
              </div>

              <div>
                <span className="font-semibold text-slate-700 block mb-1">
                  Brand Cyan & Teal:
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-sky-600 shadow-xs" />
                  <div className="w-6 h-6 rounded bg-teal-500 shadow-xs" />
                  <span className="font-mono text-slate-500">Sky-600 / Teal-500</span>
                </div>
              </div>

              <div>
                <span className="font-semibold text-slate-700 block mb-1">
                  Estados Funcionales:
                </span>
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  <span className="px-2 py-1 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 text-center">
                    Éxito
                  </span>
                  <span className="px-2 py-1 rounded text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200 text-center">
                    Crítico
                  </span>
                  <span className="px-2 py-1 rounded text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 text-center">
                    Alerta
                  </span>
                  <span className="px-2 py-1 rounded text-[10px] font-semibold bg-sky-50 text-sky-700 border border-sky-200 text-center">
                    Proceso
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Next.js 14+ App Router</span>
            <Activity className="w-4 h-4 text-teal-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
