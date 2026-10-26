"use client";

import React, { useState } from "react";
import {
  MOCK_PROFESIONALES_FILTRO,
  MOCK_CONSULTORIOS_FILTRO,
  MOCK_TURNOS_AGENDA,
  MOCK_CIRUGIAS,
} from "@/lib/data/mock-agenda";
import {
  TurnoAgendaItem,
  VistaAgenda,
  PestanaAgendaPrincipal,
} from "@/types/agenda";
import { AgendaHeader } from "@/components/agenda/agenda-header";
import { AgendaSidebarFiltros } from "@/components/agenda/agenda-sidebar-filtros";
import { AgendaGrillaTurnos } from "@/components/agenda/agenda-grilla-turnos";
import { TurnoDetalleDrawer } from "@/components/agenda/turno-detalle-drawer";
import { CirugiasPanel } from "@/components/agenda/cirugias-panel";

export default function AgendaPage() {
  const [pestanaPrincipal, setPestanaPrincipal] =
    useState<PestanaAgendaPrincipal>("turnos");
  const [vista, setVista] = useState<VistaAgenda>("dia");
  const [fechaTexto] = useState<string>("Lunes, 12 de mayo de 2025");
  const [selectedDay, setSelectedDay] = useState<number>(12);

  // Filtros seleccionados
  const [selectedProfesionalesIds, setSelectedProfesionalesIds] = useState<
    readonly string[]
  >(MOCK_PROFESIONALES_FILTRO.slice(0, 4).map((p) => p.id));

  const [selectedConsultoriosIds, setSelectedConsultoriosIds] = useState<
    readonly string[]
  >(MOCK_CONSULTORIOS_FILTRO.map((c) => c.id));

  // Drawer de detalle de turno
  const [selectedTurno, setSelectedTurno] = useState<TurnoAgendaItem | null>(
    null
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // Manejadores de filtros
  const handleToggleProfesional = (id: string) => {
    setSelectedProfesionalesIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const handleSelectAllProfesionales = () => {
    if (
      selectedProfesionalesIds.length === MOCK_PROFESIONALES_FILTRO.length
    ) {
      setSelectedProfesionalesIds([]);
    } else {
      setSelectedProfesionalesIds(MOCK_PROFESIONALES_FILTRO.map((p) => p.id));
    }
  };

  const handleToggleConsultorio = (id: string) => {
    setSelectedConsultoriosIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const handleSelectTurno = (turno: TurnoAgendaItem) => {
    setSelectedTurno(turno);
    setIsDrawerOpen(true);
  };

  // Filtrado de profesionales visibles en las columnas
  const profesionalesVisibles = MOCK_PROFESIONALES_FILTRO.filter((p) =>
    selectedProfesionalesIds.includes(p.id)
  );

  // Filtrado de turnos
  const turnosFiltrados = MOCK_TURNOS_AGENDA.filter((t) =>
    selectedProfesionalesIds.includes(t.profesionalId)
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Header con pestañas Turnos vs Cirugías, fecha y selector de vista */}
      <AgendaHeader
        pestanaPrincipal={pestanaPrincipal}
        onPestanaChange={setPestanaPrincipal}
        fechaTexto={fechaTexto}
        vista={vista}
        onVistaChange={setVista}
        onNuevoTurno={() => alert("Modal para agendar nuevo turno")}
        onNuevaCirugia={() => alert("Modal para programar nueva cirugía")}
      />

      {/* 2. Vista de Turnos (Sidebar de Filtros + Grilla Central) */}
      {pestanaPrincipal === "turnos" && (
        <div className="flex flex-col lg:flex-row items-start gap-6">
          {/* Panel Lateral Izquierdo de Filtros */}
          <AgendaSidebarFiltros
            profesionales={MOCK_PROFESIONALES_FILTRO}
            consultorios={MOCK_CONSULTORIOS_FILTRO}
            selectedProfesionalesIds={selectedProfesionalesIds}
            selectedConsultoriosIds={selectedConsultoriosIds}
            onToggleProfesional={handleToggleProfesional}
            onSelectAllProfesionales={handleSelectAllProfesionales}
            onToggleConsultorio={handleToggleConsultorio}
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
          />

          {/* Grilla Central de Médicos y Horarios */}
          <AgendaGrillaTurnos
            profesionales={profesionalesVisibles}
            turnos={turnosFiltrados}
            onSelectTurno={handleSelectTurno}
            selectedTurnoId={selectedTurno?.id}
          />
        </div>
      )}

      {/* 3. Submódulo de Quirófanos y Cirugías */}
      {pestanaPrincipal === "cirugias" && (
        <CirugiasPanel
          cirugias={MOCK_CIRUGIAS}
          fechaTexto={fechaTexto}
          onNuevaCirugia={() => alert("Modal para programar nueva cirugía")}
        />
      )}

      {/* 4. Drawer Deslizable de Detalle del Turno */}
      <TurnoDetalleDrawer
        turno={selectedTurno}
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedTurno(null);
        }}
        onEditar={(turno) => alert(`Editando turno de ${turno.pacienteNombre}`)}
        onReprogramar={(turno) =>
          alert(`Reprogramando turno de ${turno.pacienteNombre}`)
        }
        onCancelar={(turno) =>
          alert(`Turno de ${turno.pacienteNombre} cancelado`)
        }
      />
    </div>
  );
}
