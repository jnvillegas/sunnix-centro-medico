# SPEC-004: Agenda de Turnos y Gestión Quirúrgica

**Estado:** APROBADO  
**Fase Roadmap:** Fase 4 - Agenda, Turnos & Cirugías  
**Procesos Vinculados:** `[TUR-01]`, `[CX-01]`, `[CX-02]`  
**Módulos Afectados:** `src/app/(dashboard)/agenda/*`, `src/components/agenda/*`, `src/types/agenda.ts`  

---

## 1. Objetivo y Alcance
- **Problema a resolver:** Proveer la grilla de agendamiento diario/semanal de consultas y coordinar el uso de quirófanos para procedimientos quirúrgicos ambulatorios (Pantalla 01 de Sunnix).
- **En alcance:**
  - Vistas conmutables: `Día`, `Semana`, `Mes`.
  - Filtros interactivos en panel lateral izquierdo:
    - Mini calendario mensual con navegación rápida.
    - Checkbox multiselector de profesionales (Dra. García, Dr. López, Dra. Martínez, Dr. Ruiz, Dra. Sánchez).
    - Checkbox multiselector de consultorios (Consultorio 1 al 4).
  - Grilla horaria (08:00 a 19:00) dividida en columnas por médico/consultorio activo.
  - Bloques de turnos con etiquetas diferenciadas por tipo de cita: `Control`, `Consulta`, `Primera consulta`, `Electrocardiograma`.
  - Drawer lateral derecho de inspección de turno:
    - Cabecera con datos del paciente (Ana Torres, DNI, Edad).
    - Tabs: `Turno`, `Historial`.
    - Campos detallados: Fecha, Horario, Profesional, Consultorio, Motivo y campo de Notas clínicas.
    - Botones de acción: `Editar`, `Reprogramar`, `Cancelar`.
  - Submódulo inferior de Cirugías:
    - Botón `+ Nueva cirugía`.
    - Tabla de intervenciones: Fecha, Hora, Paciente, Procedimiento, Cirujano, Quirófano, Duración (hs) y Estado (*Programada*, *En curso*, *Finalizada*).
    - Cronograma visual derecho de ocupación de Quirófanos 1 y 2 por franja horaria.
- **Fuera de alcance:**
  - Integración con pasarelas de videollamada para telemedicina.

---

## 2. Contrato de Datos (Inputs / Outputs)

### Tipos TypeScript Estrictos (`src/types/agenda.ts`)
```typescript
export type VistaAgenda = 'dia' | 'semana' | 'mes';
export type EstadoCirugia = 'programada' | 'en_curso' | 'finalizada' | 'cancelada';

export interface TurnoAgendaItem {
  readonly id: string;
  readonly pacienteId: string;
  readonly pacienteNombre: string;
  readonly pacienteDni: string;
  readonly pacienteEdad: number;
  readonly profesionalId: string;
  readonly profesionalNombre: string;
  readonly consultorioId: string;
  readonly consultorioNombre: string;
  readonly fecha: string; // YYYY-MM-DD
  readonly horaInicio: string; // "08:00"
  readonly horaFin: string; // "08:30"
  readonly tipo: 'Control' | 'Consulta' | 'Primera consulta' | 'Procedimiento';
  readonly motivo: string;
  readonly notas?: string;
}

export interface CirugiaItem {
  readonly id: string;
  readonly fecha: string;
  readonly horaInicio: string; // "08:00"
  readonly pacienteNombre: string;
  readonly procedimiento: string;
  readonly cirujanoNombre: string;
  readonly quirofanoNombre: string; // "Quirófano 1" | "Quirófano 2"
  readonly duracionHoras: number; // ej: 2.0
  readonly estado: EstadoCirugia;
}

export interface FiltrosAgendaState {
  readonly fechaSeleccionada: string;
  readonly profesionalesIds: readonly string[];
  readonly consultoriosIds: readonly string[];
  readonly vista: VistaAgenda;
}
```

---

## 3. UI / Componentes y Flujo

### Archivos a Crear
1. `src/types/agenda.ts`: Definición de interfaces tipadas.
2. `src/components/agenda/agenda-sidebar-filtros.tsx`: Mini calendario de mes y listas de selección múltiple con checkboxes.
3. `src/components/agenda/agenda-grilla-turnos.tsx`: Matriz con columnas por médico y bloques de tiempo interactivos.
4. `src/components/agenda/turno-detalle-drawer.tsx`: Panel deslizable con tabs `Turno` e `Historial` y acciones rápidas.
5. `src/components/agenda/cirugias-tabla-panel.tsx`: Tabla inferior de procedimientos quirúrgicos con badges de estado.
6. `src/components/agenda/quirofanos-timeline.tsx`: Gráfico de barras horizontal que muestra la franja horaria ocupada por cada quirófano.
7. `src/app/(dashboard)/agenda/page.tsx`: Vista ensambladora de agenda y cirugías.

### Estilos de Estado para Cirugías
- `Programada`: `bg-emerald-50 text-emerald-700 border-emerald-200`
- `En curso`: `bg-sky-50 text-sky-700 border-sky-200`
- `Finalizada`: `bg-purple-50 text-purple-700 border-purple-200`

---

## 4. Reglas de Negocio y Casos Borde (Edge Cases)
- **Validación de solapamiento de quirófano:** No se puede programar una cirugía que coincida en horario con otra en el mismo quirófano considerando `horaInicio + duracionHoras`.
- **Reprogramación de turno:** La acción "Reprogramar" marca el turno actual con estado `reprogramado` y abre el selector de nueva fecha/hora sin perder el motivo original.
- **Cancelación:** Requiere confirmación modal obligatoria para evitar clics accidentales.

---

## 5. Criterios de Aceptación (Definition of Done)
- [ ] La grilla renderiza correctamente los turnos asignados a cada profesional según los filtros seleccionados.
- [ ] Al seleccionar un turno de la grilla, se abre el panel lateral derecho con los datos correctos del paciente y la cita.
- [ ] La sección de cirugías refleja la ocupación horaria en el bloque de Quirófanos 1 y 2.
- [ ] Cero uso de `any` y tipado riguroso en todo el flujo.