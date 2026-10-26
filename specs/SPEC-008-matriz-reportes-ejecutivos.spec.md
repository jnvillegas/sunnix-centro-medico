# SPEC-008: Hub Central de Reportes Ejecutivos e Inteligencia Operativa

**Estado:** APROBADO
**Fase Roadmap:** Fase 8 - Reportería Ejecutiva & QA Final  
**Procesos Vinculados:** Auditoría y reportería transversal de todos los procesos (`[TUR-01]` a `[COM-02]`)  
**Módulos Afectados:** `src/app/(dashboard)/reportes/*`, `src/components/reportes/*`, `src/types/reportes.ts`  

---

## 1. Objetivo y Alcance
- **Problema a resolver:** Proveer a la dirección médica y administrativa un centro unificado de toma de decisiones que consolide los **18 reportes clave** identificados en la radiografía de Sunnix Software (médicos, de ocupación física, financieros y de cadena de suministro).
- **En alcance:**
  - Panel central interactivo `/reportes` organizado en 4 cuadrantes lógicos:
    1. **Gestión Médica y Pacientes:** Turnos por período, Asistencia de pacientes, Turnos por especialidad, Producción médica, Pacientes nuevos vs. recurrentes, Cobertura por Obra Social, Adopción de membresías.
    2. **Infraestructura y Ocupación:** Ocupación horaria por consultorio, Productividad de quirófanos y cirugías por tipo/duración.
    3. **Finanzas y Rentabilidad:** Facturación por profesional, Ingresos por rubro, Egresos operativos, Cuentas por cobrar y morosidad, Cuentas por pagar a proveedores, Margen de rentabilidad neta por servicio.
    4. **Suministros y Logística:** Estado del stock médico, Consumo de insumos por procedimiento/especialidad, Volumen de compras por proveedor.
  - Filtro maestro superior: Rango de fechas (Hoy, Esta semana, Mes actual, Año, Rango personalizado).
  - Modal/Drawer de vista previa de datos con tabla dinámica y botón de exportación tipado (CSV / JSON / impresión limpia).
  - Resumen ejecutivo superior (*Executive KPI Strip*): Turnos totales del período, % Asistencia global, Facturación bruta, Gastos operativos y Margen neto de rentabilidad (%).
- **Fuera de alcance:**
  - Integración con herramientas externas de BI tipo PowerBI o Looker (los reportes se procesan y renderizan nativamente en Next.js).

---

## 2. Contrato de Datos (Inputs / Outputs)

### Tipos TypeScript Estrictos (`src/types/reportes.ts`)
```typescript
export type CategoriaReporte = 'clinica' | 'infraestructura' | 'finanzas' | 'suministros';

export interface ReporteCatalogoItem {
  readonly id: string; // ej: REP-01, REP-02
  readonly titulo: string;
  readonly categoria: CategoriaReporte;
  readonly descripcion: string;
  readonly queMuestra: string;
  readonly utilidadNegocio: string;
  readonly iconName: string;
}

export interface FiltroReporteParams {
  readonly fechaDesde: string;
  readonly fechaHasta: string;
  readonly profesionalId?: string;
  readonly consultorioId?: string;
  readonly obraSocial?: string;
}

export interface FilaReporteTurnosPeriodo {
  readonly periodo: string;
  readonly turnosProgramados: number;
  readonly turnosAsistidos: number;
  readonly turnosCancelados: number;
  readonly tasaAsistenciaPct: number;
}

export interface FilaReporteRentabilidadServicio {
  readonly tipoServicio: string; // ej: "Consulta General", "Artroscopía"
  readonly cantidadRealizada: number;
  readonly ingresoTotal: number;
  readonly costoInsumos: number;
  readonly honorarioMedico: number;
  readonly margenNeto: number;
  readonly margenNetoPct: number;
}

export interface ResumenEjecutivoStrip {
  readonly turnosTotales: number;
  readonly porcentajeAsistenciaGlobal: number;
  readonly facturacionTotal: number;
  readonly egresosTotales: number;
  readonly resultadoOperativo: number;
  readonly margenRentabilidadPct: number;
}
```

---

## 3. UI / Componentes y Flujo

### Archivos a Crear
1. `src/types/reportes.ts`: Definición de interfaces tipadas para los 18 reportes.
2. `src/components/reportes/resumen-ejecutivo-strip.tsx`: Barra superior de indicadores consolidados de rendimiento.
3. `src/components/reportes/reportes-filtro-bar.tsx`: Selector de fechas, filtros contextuales y botón para resetear.
4. `src/components/reportes/catalogo-reportes-grid.tsx`: Grilla de tarjetas para los 18 reportes clasificados por categoría.
5. `src/components/reportes/reporte-preview-modal.tsx`: Modal con vista tabular paginada de los datos del reporte seleccionado con botón de descarga.
6. `src/app/(dashboard)/reportes/page.tsx`: Página ensambladora del centro de reportería.

---

## 4. Reglas de Negocio y Casos Borde (Edge Cases)
- **Fechas invertidas:** La barra de filtros valida mediante Zod que `fechaDesde <= fechaHasta`. Si el usuario ingresa un rango inválido, se auto-corrige marcando el mismo día.
- **Reportes con datos en cero:** Si no existen registros en el rango de fechas consultado, el visualizador tabular muestra un empty state informativo ("No hay movimientos registrados para los filtros seleccionados") sin arrojar errores de división por cero en las columnas de porcentaje.
- **Exportación limpia:** La exportación a CSV formatea correctamente los importes en pesos argentinos y los porcentajes, escapando caracteres especiales o comas en los textos.

---

## 5. Criterios de Aceptación (Definition of Done)
- [ ] El catálogo lista con exactitud los 18 reportes extraídos de la pantalla de Sunnix Software.
- [ ] El clic en cualquier tarjeta abre el modal de previsualización con su respectiva tabla y datos coherentes.
- [ ] La exportación a CSV genera un archivo válido y descargable en el navegador.
- [ ] Cero uso de `any` y tipado 100% estricto en todas las interfaces de agregación.
- [ ] `npm run build` compila de manera limpia y sin advertencias en todo el proyecto.