# SPEC-003: Ficha de Profesional y Matriz de Ocupación de Consultorios

**Estado:** APROBADO 
**Fase Roadmap:** Fase 3 - Profesionales & Consultorios  
**Procesos Vinculados:** `[MED-01]`  
**Módulos Afectados:** `src/app/(dashboard)/profesionales/*`, `src/app/(dashboard)/consultorios/*`, `src/types/profesionales.ts`  

---

## 1. Objetivo y Alcance
- **Problema a resolver:** Gestionar el legajo del profesional médico (canon de alquiler del espacio, especialidades y agenda semanal fija) y administrar en tiempo real la disponibilidad de los 6 consultorios y quirófanos (Pantallas 04 y 05 de Sunnix).
- **En alcance:**
  - Ficha de profesional: métricas de canon de alquiler ($60.000/mes con fecha de vencimiento), facturación producida este mes, volumen de turnos y agenda fija semanal por día.
  - Listado de documentación profesional obligatoria (Título médico, Matrícula, Seguro RC Mala Praxis, Contrato de alquiler) con descarga simulada.
  - Matriz visual de Consultorios (Pantalla 05): grilla horaria (08:00 a 18:00) para Consultorios 1 al 6.
  - Bloques de tiempo coloreados por tipo: `Consulta` (verde suave), `Control` (lila suave), `Procedimiento` (azul celeste), `Cirugía menor` (naranja) y `Bloqueado` (gris claro).
  - Tarjetas de KPIs de consultorios: Total habilitados (6), Ocupación hoy (%), Turnos confirmados, Turnos pendientes, Consultorios libres y Total ingresos por alquiler del día.
  - Panel lateral de detalle del turno seleccionado dentro de la grilla.
- **Fuera de alcance:**
  - Liquidación contable compleja de honorarios médicos con retención impositiva (se mantiene estructura de visualización y registro simple).

---

## 2. Contrato de Datos (Inputs / Outputs)

### Tipos TypeScript Estrictos (`src/types/profesionales.ts`)
```typescript
export type TipoSlotAgenda = 'consulta' | 'control' | 'procedimiento' | 'cirugia_menor' | 'bloqueado';

export interface DiaAgendaSemanal {
  readonly dia: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';
  readonly horario: string; // ej: "08:00 - 12:00" o "-"
  readonly consultorioNombre: string;
  readonly activo: boolean;
}

export interface DocumentoProfesional {
  readonly id: string;
  readonly tipo: 'Titulo médico' | 'Matrícula' | 'Seguro RC' | 'Contrato de alquiler';
  readonly nombreArchivo: string;
  readonly fechaSubida: string;
  readonly urlDescarga: string;
}

export interface ProfesionalDetalle {
  readonly id: string;
  readonly nombreCompleto: string;
  readonly matricula: string;
  readonly dni: string;
  readonly especialidad: string;
  readonly telefono: string;
  readonly email: string;
  readonly consultorioAsignadoNombre: string;
  readonly montoAlquilerMensual: number;
  readonly proximoVencimientoAlquiler: string;
  readonly facturacionMesActual: number;
  readonly turnosMesActual: number;
  readonly agendaSemanal: readonly DiaAgendaSemanal[];
  readonly documentos: readonly DocumentoProfesional[];
}

export interface SlotConsultorio {
  readonly id: string;
  readonly consultorioNumero: number; // 1 a 6
  readonly horaInicio: string; // "08:00"
  readonly horaFin: string; // "08:30"
  readonly tipo: TipoSlotAgenda;
  readonly pacienteNombre?: string;
  readonly profesionalNombre?: string;
  readonly motivo?: string;
  readonly estado?: 'confirmado' | 'pendiente' | 'en_espera';
}
```

---

## 3. UI / Componentes y Flujo

### Archivos a Crear
1. `src/types/profesionales.ts`: Tipado estricto para médicos y matriz de consultorios.
2. `src/components/profesionales/profesional-header.tsx`: Cabecera con MN, especialidad, contacto y KPIs de alquiler y turnos.
3. `src/components/profesionales/agenda-semanal-table.tsx`: Tabla de franjas horarias por día de la semana.
4. `src/components/consultorios/matriz-grilla-horaria.tsx`: Grilla interactiva estilo calendario con 6 columnas de consultorios y slots coloreados.
5. `src/components/consultorios/kpi-ocupacion-banner.tsx`: 6 tarjetas de métricas superiores (Ocupación %, turnos, consultorios libres).
6. `src/components/consultorios/detalle-turno-drawer.tsx`: Panel lateral derecho que se abre al cliquear un slot con datos del paciente y médico.
7. `src/app/(dashboard)/profesionales/[id]/page.tsx`: Ficha individual del médico.
8. `src/app/(dashboard)/consultorios/page.tsx`: Vista general de matriz y ocupación.

### Códigos de Color de los Slots (Idénticos a Pantalla 05)
- **Consulta:** `bg-emerald-100 text-emerald-800 border-l-4 border-emerald-500`
- **Control:** `bg-purple-100 text-purple-800 border-l-4 border-purple-500`
- **Procedimiento:** `bg-sky-100 text-sky-800 border-l-4 border-sky-500`
- **Cirugía menor:** `bg-amber-100 text-amber-800 border-l-4 border-amber-500`
- **Bloqueado:** `bg-slate-200 text-slate-600 border-l-4 border-slate-400`

---

## 4. Reglas de Negocio y Casos Borde (Edge Cases)
- **Validación anti-colisión:** No se permite asignar dos turnos en el mismo consultorio a la misma hora exacta.
- **Consultorio bloqueado:** Un slot con estado `Bloqueado` deshabilita el agendamiento y muestra visualmente motivo de mantenimiento o desinfección.
- **División por cero en ocupación:** Si no hay turnos registrados en la fecha seleccionada, el porcentaje de ocupación se calcula limpiamente en 0% sin romper la renderización.

---

## 5. Criterios de Aceptación (Definition of Done)
- [ ] La grilla horaria de consultorios muestra correctamente las 6 columnas y las franjas horarias de 08:00 a 18:00.
- [ ] El clic en un slot de la grilla abre el drawer derecho con el detalle del turno correspondiente.
- [ ] La ficha del profesional muestra correctamente los datos de alquiler mensual y la agenda semanal.
- [ ] Cero uso de `any` y tipado riguroso en todos los componentes.
- [ ] Responsive: En resoluciones medianas la grilla tiene scroll horizontal suave sin desalinear la columna de horarios.