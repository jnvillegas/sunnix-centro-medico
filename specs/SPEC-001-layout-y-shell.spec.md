# SPEC-001: Shell Base, Navegación y Layout General Sunnix

**Estado:** APROBADO 
**Fase Roadmap:** Fase 1 - Core Base & Layout  
**Procesos Vinculados:** Base transversal para todos los procesos (`[TUR-01]` a `[COM-02]`)  
**Módulos Afectados:** `src/app/(dashboard)/layout.tsx`, `src/components/layout/*`, `src/types/navigation.ts`  

---

## 1. Objetivo y Alcance
- **Problema a resolver:** Proveer el cascarón administrativo unificado (Sidebar + Topbar + Viewport de contenido) idéntico a las capturas de Sunnix Software, permitiendo navegar entre los 9 módulos sin recargas completas de página.
- **En alcance:**
  - Sidebar fija colapsable con paleta oscura Sunnix (`#0D1927`), logotipo SVG corporativo, ítems de navegación con estados activo/inactivo y submenús desplegables (Agenda, Pacientes, Consultorios, Compras, Ingresos/Egresos, Cuentas por Cobrar).
  - Topbar superior que aloja: Buscador global rápido, selector de fecha/período actual, campana de alertas con badge de notificación y selector de usuario autenticado (`Marisol - Administrador`).
  - Viewport principal responsivo con fondo neutral claro (`#F8FAFC`).
- **Fuera de alcance:**
  - Lógica real de autenticación multifactor o cambio dinámico de usuario en base de datos (se usa estado mock tipado de sesión para esta fase).
  - Funcionalidad del motor de búsqueda global transversal (queda como componente visual listo para conectar).

---

## 2. Contrato de Datos (Inputs / Outputs)

### Tipos TypeScript Estrictos (`src/types/navigation.ts`)
```typescript
export interface SubMenuItem {
  readonly title: string;
  readonly href: string;
  readonly badge?: string;
}

export interface NavItem {
  readonly title: string;
  readonly href: string;
  readonly iconName: string;
  readonly badge?: string | number;
  readonly subItems?: readonly SubMenuItem[];
}

export interface UserSessionProfile {
  readonly id: string;
  readonly name: string;
  readonly role: 'Administrador' | 'Recepcionista' | 'Profesional' | 'Auditor';
  readonly avatarUrl?: string;
  readonly initials: string;
}
```

---

## 3. UI / Componentes y Flujo

### Archivos a Crear
1. `src/types/navigation.ts`: Definición de interfaces de menú y perfil.
2. `src/components/layout/sidebar.tsx`: Navegación vertical izquierda con acordeones para módulos compuestos.
3. `src/components/layout/topbar.tsx`: Barra superior de herramientas y contexto.
4. `src/components/layout/user-nav.tsx`: Avatar, rol y menú desplegable del usuario.
5. `src/app/(dashboard)/layout.tsx`: Layout envolvente con estructura CSS Grid / Flex.

### Reglas de Diseño y Estilo
- **Sidebar:** Ancho estándar `w-64` (16rem), fondo `bg-[#0D1927]`, texto inactivo `text-slate-400`, hover `text-white bg-[#1E293B]/60`.
- **Ítem Activo:** Pastilla con fondo `bg-sky-600 text-white font-medium` y sutil indicador izquierdo.
- **Topbar:** Altura fija `h-16`, fondo `bg-white border-b border-slate-200`, flex justify-between items-center px-6.
- **Fondo del Dashboard:** `bg-[#F1F5F9]` o `bg-[#F8FAFC]`.

---

## 4. Reglas de Negocio y Casos Borde (Edge Cases)
- **Persistencia de navegación:** Al recargar el navegador en una sub-ruta (ej: `/cobranzas`), el menú lateral debe mantener el acordeón correspondiente abierto y el enlace resaltado como activo.
- **Submenús desplegables:** Solo un acordeón principal puede estar desplegado a la vez para no saturar la altura de pantallas pequeñas (comportamiento tipo *single-accordion*).
- **Resoluciones reducidas:** En pantallas menores a `1024px` (tablets/móviles), la Sidebar se oculta automáticamente y se abre mediante un botón hamburguesa en el Topbar (modal deslizante con overlay opaco).

---

## 5. Criterios de Aceptación (Definition of Done)
- [ ] La Sidebar renderiza la totalidad de los módulos observados en Sunnix (Inicio, Agenda, Pacientes, Profesionales, Consultorios, Cirugías, Membresías, Facturación médica, Insumos y stock, Compras, Ingresos y egresos, Cuentas por cobrar, Cuentas por pagar, Reportes, Configuración).
- [ ] El Topbar muestra el branding "Marisol - Administrador" y el selector de fecha estilizado idéntico a las capturas.
- [ ] La navegación entre rutas cambia la URL y resalta el enlace activo de forma instantánea.
- [ ] Cero uso de `any` en todos los archivos creados; validación de TypeScript estricto sin advertencias.
- [ ] `npm run build` compila al 100% sin errores de renderizado ni discrepancias de hidratación en Server Components.