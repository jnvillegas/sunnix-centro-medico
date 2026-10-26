# SPEC-005: Control de Asistencia y Gestión de Ausentismo

**Estado:** APROBADO  
**Fase Roadmap:** Fase 5 - Control de Asistencia & Ausentismo  
**Procesos Vinculados:** `[TUR-02]`, `[TUR-03]`, `[TUR-04]`  
**Módulos Afectados:** `src/app/(dashboard)/asistencia/*`, `src/components/asistencia/*`, `src/types/asistencia.ts`  

---

## 1. Objetivo y Alcance
- **Problema a resolver:** Monitorear en tiempo real la asistencia a los turnos, gestionar ausencias/reprogramaciones y alertar sobre pacientes con inasistencias reiteradas (Pantalla 02 de Sunnix).
- **En alcance:**
  - 4 KPICards superiores de conteo diario:
    - `Asistidos`: Conteo y % (ej: 34 - 81%).
    - `No asistidos`: Conteo y % (ej: 6 - 14%).
    - `Reprogramados`: Conteo y % (ej: 2 - 5%).
    - `Total turnos`: Conteo total (ej: 42 - 100%).
  - Barra de filtros: Selector de fecha, desplegable de profesionales, desplegable de especialidades y botón de exportación.
  - Tabla de control de turnos del día:
    - Checkbox de selección, Hora, Paciente con avatar, Profesional, Especialidad, Tipo de turno, Badge de Estado (*Asistió*, *No asistió*, *Reprogramado* con nota de fecha de traslado) y menú de acciones `...`.
  - Drawer lateral de trazabilidad de paciente:
    - Datos del paciente: Nombre, DNI, Edad.
    - Historial cronológico de turnos pasados con estado visual.
    - Indicador de "Frecuencia de visitas" (ej: "1 vez cada 2 meses").
    - **Tarjeta de alerta de ausentismo:** Card destacada en ámbar cuando el paciente acumula 3 o más inasistencias en los últimos 6 meses.
  - Panel inferior de métricas:
    - Barras de progreso de porcentaje de asistencia por profesional (Dra. García 90%, Dr. López 78%, etc.).
    - Gráfico de barras apiladas con la evolución de asistencia de los últimos 6 meses (*Asistidos*, *No asistidos*, *Reprogramados*).
    - Tabla "Top pacientes con inasistencias": Paciente, Turnos totales, Inasistencias y % de ausentismo.
- **Fuera de alcance:**
  - Envío automático de mensajes de WhatsApp al registrar inasistencia (se contemplará en fase de integraciones externas).

---

## 2. Contrato de Datos (Inputs / Outputs)

### Tipos TypeScript Estrictos (`src/types/asistencia.ts`)
```typescript
export type EstadoAsistencia = 'asistio' | 'no_asistio' | 'reprogramado';

export interface TurnoAsistenciaFila {
  readonly id: string;
  readonly hora: string;
  readonly pacienteId: string;
  readonly pacienteNombre: string;
  readonly pacienteAvatarUrl?: string;
  readonly profesionalNombre: string;
  readonly especialidad: string;
  readonly tipo: 'Consulta' | 'Control' | 'Procedimiento';
  readonly estado: EstadoAsistencia;
  readonly notaEstado?: string; // ej: "Reprogramado para 16/05"
}

export interface KpiAsistenciaSummary {
  readonly asistidosConteo: number;
  readonly asistidosPct: number;
  readonly noAsistidosConteo: number;
  readonly noAsistidosPct: number;
  readonly reprogramadosConteo: number;
  readonly reprogramadosPct: number;
  readonly totalTurnos: number;
}

export interface MetricaProfesionalAsistencia {
  readonly profesionalId: string;
  readonly profesionalNombre: string;
  readonly porcentajeAsistencia: number;
}

export interface TopPacienteInasistencia {
  readonly pacienteId: string;
  readonly pacienteNombre: string;
  readonly turnosTotales: number;
  readonly inasistencias: number;
  readonly porcentajeInasistencia: number;
}
```

---

## 3. UI / Componentes y Flujo

### Archivos a Crear
1. `src/types/asistencia.ts`: Definición de interfaces tipadas.
2. `src/components/asistencia/asistencia-kpis-header.tsx`: Fila de 4 tarjetas con iconos circulares (Check verde, Cruz roja, Reloj ámbar, Calendario morado).
3. `src/components/asistencia/asistencia-tabla.tsx`: Tabla principal con badges de estado y selector de acciones directas (Cambiar a Asistió / No asistió).
4. `src/components/asistencia/paciente-historial-drawer.tsx`: Panel lateral con alerta de ausentismo frecuente y lista de turnos anteriores.
5. `src/components/asistencia/asistencia-profesionales-bars.tsx`: Lista de barras horizontales de progreso.
6. `src/components/asistencia/top-inasistencias-tabla.tsx`: Tabla de pacientes críticos con alta tasa de ausencia.
7. `src/app/(dashboard)/asistencia/page.tsx`: Ensamblado de la vista completa de asistencia.

### Reglas de Diseño de Badges
- **Asistió:** `bg-emerald-50 text-emerald-700 border-emerald-200`
- **No asistió:** `bg-rose-50 text-rose-700 border-rose-200`
- **Reprogramado:** `bg-amber-50 text-amber-700 border-amber-200`

---

## 4. Reglas de Negocio y Casos Borde (Edge Cases)
- **Cálculo de alerta de inasistencia:** Si un paciente tiene $\ge 3$ inasistencias en los últimos 180 días, el sistema debe desplegar automáticamente el banner de advertencia `Paciente con inasistencias frecuentes` en el drawer y en la admisión de turno.
- **Acción inmediata de check-in:** Al marcar un turno como `Asistió`, la métrica del KPI superior debe recalcularse de forma reactiva sin requerir F5/recarga completa.
- **Filtros combinados:** Si el filtro por profesional no tiene turnos asignados en la fecha seleccionada, la tabla muestra un empty state con el mensaje "No hay turnos registrados para el profesional en este día".

---

## 5. Criterios de Aceptación (Definition of Done)
- [ ] Los 4 KPIs superiores reflejan exactamente las sumas y porcentajes de los turnos listados.
- [ ] El cambio de estado de un turno actualiza visualmente el badge y recalcula los contadores.
- [ ] El clic en un paciente de la tabla abre el panel lateral mostrando el historial y la tarjeta de alerta si supera el umbral de ausentismo.
- [ ] Cero uso de `any` y tipado 100% estricto.