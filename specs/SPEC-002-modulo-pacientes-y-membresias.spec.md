# SPEC-002: Ficha Integral de Pacientes y Membresías

**Estado:** APROBADO
**Fase Roadmap:** Fase 2 - Pacientes & Membresías  
**Procesos Vinculados:** `[PAC-01]`, `[PAC-02]`  
**Módulos Afectados:** `src/app/(dashboard)/pacientes/*`, `src/components/pacientes/*`, `src/types/pacientes.ts`  

---

## 1. Objetivo y Alcance
- **Problema a resolver:** Centralizar la vista 360 del paciente en una sola pantalla (Pantalla 03 de Sunnix): datos filiatorios, alertas clínicas (alergias y patologías preexistentes), vinculación a planes de membresía familiar e historial de turnos/documentación médica.
- **En alcance:**
  - Listado general con buscador por Nombre/DNI y filtros de estado.
  - Ficha de paciente con cabecera de datos rápidos (Foto/Avatar, DNI, Edad, Fecha Nacimiento, Teléfono, Email, Domicilio).
  - Tarjetas de resumen clínico: Alergias críticas (destacadas en rojo), Obra Social con N° de Afiliado, Grupo Sanguíneo y Membresía activa con fecha de vencimiento.
  - Pestañas de navegación interna: `Información general`, `Membresía`, `Turnos y cirugías`, `Historia clínica`, `Estudios`, `Recetas`, `Documentos`, `Facturación`, `Notas`.
  - Submódulo de Membresía Familiar con listado de dependientes asociados (Pareja, Hijos).
  - Listado de próximos turnos e historial reciente con sus estados (*Confirmado*, *Pendiente*, *Asistió*, *No asistió*).
- **Fuera de alcance:**
  - Firma digital de recetas médicas (solo carga y visualización de registros).
  - Carga masiva de expedientes vía CSV/Excel (se reserva para módulo de administración avanzada).

---

## 2. Contrato de Datos (Inputs / Outputs)

### Tipos TypeScript Estrictos (`src/types/pacientes.ts`)
```typescript
export type TipoMembresia = 'individual' | 'familiar';
export type EstadoMembresia = 'activa' | 'vencida' | 'suspendida';

export interface FamiliarDependiente {
  readonly id: string;
  readonly nombreCompleto: string;
  readonly dni: string;
  readonly parentesco: 'Titular' | 'Pareja' | 'Hijo' | 'Otro';
}

export interface MembresiaDetalle {
  readonly id: string;
  readonly codigo: string; // ej: FAM-000125
  readonly nombrePlan: string;
  readonly tipo: TipoMembresia;
  readonly estado: EstadoMembresia;
  readonly fechaVencimiento: string; // Formato YYYY-MM-DD
  readonly beneficios: readonly string[];
  readonly familiares: readonly FamiliarDependiente[];
}

export interface AlertaMedica {
  readonly alergias: readonly string[];
  readonly enfermedadesPreexistentes: readonly string[];
  readonly medicamentosHabituales: readonly string[];
  readonly grupoSanguineo: string; // ej: A+, O-
  readonly observaciones?: string;
}

export interface PacienteDetalle {
  readonly id: string;
  readonly nombreCompleto: string;
  readonly dni: string;
  readonly edad: number;
  readonly fechaNacimiento: string;
  readonly telefono: string;
  readonly email: string;
  readonly direccion: string;
  readonly obraSocial: string;
  readonly numeroAfiliado: string;
  readonly contactoEmergenciaNombre: string;
  readonly contactoEmergenciaTelefono: string;
  readonly alertaMedica: AlertaMedica;
  readonly membresia?: MembresiaDetalle;
}
```

---

## 3. UI / Componentes y Flujo

### Archivos a Crear
1. `src/types/pacientes.ts`: Definición de interfaces tipadas.
2. `src/components/pacientes/paciente-header.tsx`: Cabecera con avatar, DNI, chips de estado y botón "Editar paciente".
3. `src/components/pacientes/alerta-medica-cards.tsx`: 4 tarjetas superiores (Membresía, Alergias en rojo, Obra Social, Grupo Sanguíneo).
4. `src/components/pacientes/datos-personales-card.tsx`: Grilla con iconos para DNI, teléfono, dirección y contacto de emergencia.
5. `src/components/pacientes/membresia-familiares-card.tsx`: Bloque de beneficios y lista de familiares dependientes con badges.
6. `src/components/pacientes/turnos-widget.tsx`: Visualizador de próximos turnos e historial reciente con badges de color.
7. `src/app/(dashboard)/pacientes/[id]/page.tsx`: Vista ensambladora de la Ficha Integral.

### Reglas Visuales Críticas (Extraídas de Pantalla 03)
- **Alergias:** Chip rojo de alerta `bg-rose-50 text-rose-700 border border-rose-200 font-semibold`.
- **Badges de Turno:**
  - `Confirmado`: Fondo azul claro `bg-sky-50 text-sky-700`.
  - `Pendiente`: Fondo ámbar claro `bg-amber-50 text-amber-700`.
  - `Asistió`: Fondo verde esmeralda `bg-emerald-50 text-emerald-700`.
  - `No asistió`: Fondo rojo rosado `bg-rose-50 text-rose-700`.

---

## 4. Reglas de Negocio y Casos Borde (Edge Cases)
- **Duplicidad de DNI:** La validación rechaza altas o ediciones con un DNI ya existente en el sistema.
- **Paciente sin membresía:** La tarjeta superior de membresía muestra estado "Particular / Sin membresía" con botón accesible para afiliarlo a un plan.
- **Alergias ausentes:** Si el paciente no declara alergias, se muestra la pastilla neutral "Sin alergias declaradas" para evitar confusión al médico.
- **Límite de familiares:** En planes individuales no se permite añadir dependientes. En planes familiares el límite configurable estándar es de hasta 4 dependientes.

---

## 5. Criterios de Aceptación (Definition of Done)
- [ ] La pantalla `/pacientes/[id]` replica con exactitud los bloques de la Pantalla 03 (Ficha de paciente).
- [ ] La navegación por tabs (`Información general`, `Membresía`, etc.) cambia de contexto sin romper el estado del componente.
- [ ] Formulario de edición con validación Zod que impide campos requeridos vacíos.
- [ ] Cero uso de `any` en los archivos creados; tipado 100% estricto.
- [ ] Estados de esqueleto (*Skeleton loaders*) implementados para la carga de datos del paciente.