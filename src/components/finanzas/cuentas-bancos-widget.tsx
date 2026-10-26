"use client";

import React from "react";
import { CuentaBancariaSaldo } from "@/types/finanzas";
import { MOCK_CUENTAS_BANCOS } from "@/lib/data/mock-finanzas";
import {
  Landmark,
  Wallet,
  Coins,
  ArrowRightLeft,
  ShieldCheck,
} from "lucide-react";

interface CuentasBancosWidgetProps {
  readonly cuentas?: readonly CuentaBancariaSaldo[];
  readonly onTransferir?: () => void;
  readonly onConciliar?: () => void;
}

export function CuentasBancosWidget({
  cuentas = MOCK_CUENTAS_BANCOS,
  onTransferir,
  onConciliar,
}: CuentasBancosWidgetProps) {
  const totalDisponible = cuentas.reduce((acc, c) => acc + c.saldoActual, 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Landmark className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Cuentas y disponibilidad bancaria
              </h3>
              <span className="text-[11px] text-slate-400">
                Saldos consolidados en tiempo real
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Total Disponible
            </span>
            <span className="text-base font-extrabold text-blue-700 font-mono">
              ${totalDisponible.toLocaleString("es-AR")}
            </span>
          </div>
        </div>

        {/* Lista de Cuentas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {cuentas.map((cta) => {
            const isBanco = cta.nombre.startsWith("Banco");
            const isCajaPrincipal = cta.nombre === "Caja principal";

            return (
              <div
                key={cta.id}
                className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/60 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isBanco
                        ? "bg-blue-100 text-blue-700"
                        : isCajaPrincipal
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {isBanco ? (
                      <Landmark className="w-4 h-4" />
                    ) : isCajaPrincipal ? (
                      <Wallet className="w-4 h-4" />
                    ) : (
                      <Coins className="w-4 h-4" />
                    )}
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-slate-700 block">
                      {cta.nombre}
                    </span>
                    <span className="text-sm font-mono font-bold text-slate-900 block mt-0.5">
                      ${cta.saldoActual.toLocaleString("es-AR")}
                    </span>
                  </div>
                </div>

                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Cuenta operativa activa" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer de Acciones de Tesorería */}
      <div className="pt-4 mt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Conciliación automática diaria a las 23:59 hs</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onConciliar}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition-colors text-xs"
          >
            Conciliar extracto
          </button>

          <button
            type="button"
            onClick={onTransferir}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 rounded-lg font-semibold transition-colors text-xs"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Transferir entre cuentas</span>
          </button>
        </div>
      </div>
    </div>
  );
}
