"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MOCK_CIRUGIAS } from "@/lib/data/mock-agenda";
import { VistaAgenda } from "@/types/agenda";
import { AgendaHeader } from "@/components/agenda/agenda-header";
import { CirugiasPanel } from "@/components/agenda/cirugias-panel";

export default function CirugiasPage() {
  const router = useRouter();
  const [vista, setVista] = useState<VistaAgenda>("dia");
  const [fechaTexto] = useState<string>("Lunes, 12 de mayo de 2025");

  return (
    <div className="space-y-6">
      <AgendaHeader
        pestanaPrincipal="cirugias"
        onPestanaChange={(pestana) => {
          if (pestana === "turnos") {
            router.push("/agenda");
          }
        }}
        fechaTexto={fechaTexto}
        vista={vista}
        onVistaChange={setVista}
        onNuevaCirugia={() => alert("Modal para programar nueva cirugía")}
      />

      <CirugiasPanel
        cirugias={MOCK_CIRUGIAS}
        fechaTexto={fechaTexto}
        onNuevaCirugia={() => alert("Modal para programar nueva cirugía")}
      />
    </div>
  );
}
