# 04. Roadmap de Fases de Construcción

Este roadmap sigue una secuencia estricta de dependencias. Ninguna fase avanza sin que la anterior cumpla su **Definition of Done (DoD)**.

```text
[Fase 1: Core Base & Layout] 
       │
       ▼
[Fase 2: Pacientes & Membresías]
       │
       ▼
[Fase 3: Profesionales & Consultorios]
       │
       ▼
[Fase 4: Agenda, Turnos & Cirugías]
       │
       ▼
[Fase 5: Control de Asistencia & Ausentismo]
       │
       ▼
[Fase 6: Insumos, Stock & Compras]
       │
       ▼
[Fase 7: Facturación, Mora & Tesorería]
       │
       ▼
[Fase 8: Reportería Ejecutiva & QA Final]
```

---

## Detalle por Fases

### Fase 1: Shell y Arquitectura Base
- Inicialización de proyecto Next.js + Tailwind + shadcn/ui.
- Sidebar interactiva idéntica a Sunnix (módulos colapsables, badges, branding).
- Topbar con selector de fechas, notificaciones y perfil de usuario activo.

### Fase 2: Módulo Pacientes y Membresías
- Listado general de pacientes con buscador y filtros.
- Ficha 360 del paciente (Pantalla 03): datos personales, badges médicos críticos (alergias en rojo), antecedentes y visualizador de grupo familiar por membresía.

### Fase 3: Profesionales y Consultorios
- Ficha de profesional (Pantalla 04): canon mensual de alquiler, especialidades, agenda semanal fija.
- Matriz horaria y uso de consultorios (Pantalla 05): visualización por consultorio 1 al 6 y quirófanos.

### Fase 4: Agenda de Turnos y Cirugías
- Grilla de agenda diaria/semanal (Pantalla 01) con pastillas por tipo de turno.
- Modal lateral desplegable para crear y editar turnos con validación anti-solapamiento.
- Panel inferior de gestión de quirófanos y cirugías con estados en tiempo real.

### Fase 5: Control de Asistencia
- Dashboard de asistencia (Pantalla 02) con KPIs: Asistidos (%), No asistidos (%), Reprogramados (%).
- Tabla de turnos del día con acciones rápidas de cambio de estado.
- Analítica de pacientes con ausentismo reiterado (>30%).

### Fase 6: Insumos Médicos y Compras
- Catálogo de insumos con control de stock (Normal, Bajo, Sin stock).
- Circuito de compras: Proveedores con CUIT, órdenes de compra y recepción total o parcial (Pantalla 07).

### Fase 7: Finanzas, Tesorería y Cuentas por Cobrar
- Dashboard de ingresos y egresos con cuentas bancarias y caja chica (Pantalla 06).
- Módulo de cuentas por cobrar con cálculo automático de intereses por mora según días de atraso (Pantalla 08).

### Fase 8: Reportería y Entrega
- Matriz consolidada de los 18 reportes de gestión clínica y financiera.
- Auditoría general: cero errores de TypeScript y compilación limpia de producción.