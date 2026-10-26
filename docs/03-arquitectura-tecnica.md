# 03. Arquitectura Técnica y Estándares de Código

## 1. Stack Tecnológico Principal
- **Framework:** Next.js 14+ (App Router con Server Components y Server Actions).
- **Lenguaje:** TypeScript v5+ con modo estricto (`"strict": true`, cero uso de `any`).
- **Base de Datos & Auth:** PostgreSQL vía Supabase / Drizzle ORM o Prisma.
- **Estilos & UI:** Tailwind CSS + Radix UI / shadcn/ui.
- **Iconografía:** Lucide React (calendario, estetoscopio, caja de insumos, billetera, usuarios).
- **Validación de Esquemas:** Zod para todos los Server Actions, mutaciones y formularios.

---

## 2. Paleta de Diseño y Sistema Visual (Sunnix Medical)
- **Marca y Fondos:**
  - Sidebar oscuro: de `#0D1927` a `#112233`.
  - Fondo general (dashboard): `#F8FAFC` o `#F1F5F9`.
  - Brand Cyan/Teal médico: `#00A896` / `#0284C7`.
- **Badges y Estados Funcionales:**
  - **Verde / Éxito:** `bg-emerald-50 text-emerald-700 border-emerald-200` (*Asistió*, *Confirmado*, *Normal*, *Cobrado*).
  - **Rojo / Crítico:** `bg-rose-50 text-rose-700 border-rose-200` (*No asistió*, *Vencida*, *Sin stock*, *Cancelado*).
  - **Ámbar / Alerta:** `bg-amber-50 text-amber-700 border-amber-200` (*Reprogramado*, *Por vencer*, *Stock bajo*).
  - **Azul / Proceso:** `bg-sky-50 text-sky-700 border-sky-200` (*En curso*, *En tránsito*).

---

## 3. Estructura de Directorios del Proyecto

```text
src/
├── app/
│   ├── (auth)/
│   │   └── login/
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── agenda/
│   │   ├── asistencia/
│   │   ├── pacientes/
│   │   │   └── [id]/
│   │   ├── profesionales/
│   │   │   └── [id]/
│   │   ├── consultorios/
│   │   ├── finanzas/
│   │   ├── compras/
│   │   ├── stock/
│   │   ├── cobranzas/
│   │   └── reportes/
│   └── api/
├── components/
│   ├── ui/
│   ├── layout/
│   │   ├── sidebar.tsx
│   │   ├── topbar.tsx
│   │   └── user-nav.tsx
│   └── shared/
│       ├── kpi-card.tsx
│       ├── data-table.tsx
│       └── status-badge.tsx
├── lib/
│   ├── db/
│   ├── validations/
│   └── utils/
└── types/
```

---

## 4. Política Anti-any y Validación de Tipos
- Prohibido de forma inquebrantable el uso de `any`.
- Cada entidad de base de datos tiene su interfaz TypeScript estricta en `@/types`.
- Los Server Actions reciben y retornan DTOs tipados y validados con Zod (`ActionState<T>`).
- Manejo riguroso de estados en UI: Skeleton para loading, Empty State visual y límites de error (*Error Boundaries*).