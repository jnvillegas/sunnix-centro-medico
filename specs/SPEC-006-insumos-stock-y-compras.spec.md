# SPEC-006: Control de Insumos Médicos, Stock y Circuito de Compras

**Estado:** APROBADO 
**Fase Roadmap:** Fase 6 - Insumos, Stock & Compras  
**Procesos Vinculados:** `[STK-01]`, `[COM-01]`, `[COM-02]`  
**Módulos Afectados:** `src/app/(dashboard)/stock/*`, `src/app/(dashboard)/compras/*`, `src/types/stock.ts`  

---

## 1. Objetivo y Alcance
- **Problema a resolver:** Garantizar el abastecimiento continuo de insumos críticos de consultorio y quirófano, monitorear el stock mínimo y gestionar el ciclo de adquisición con proveedores (Pantallas de Insumos y 07 de Sunnix).
- **En alcance:**
  - **Módulo de Stock de Insumos:**
    - 5 KPICards superiores: Total de insumos (256), Stock normal (198 - 77%), Stock bajo (42 - 16%), Sin stock (16 - 6%), Consumo del mes ($ 1.250.000 con tendencia +28%).
    - Tabs de vista: `Listado de insumos`, `Entradas`, `Salidas / Consumo`, `Órdenes de compra`, `Proveedores`, `Categorías`.
    - Tabla de inventario: Código (INS-001...), Insumo, Categoría, Presentación, Stock actual, Stock mínimo, Badge de estado (*Normal*, *Stock bajo*, *Sin stock*), Ubicación (*Depósito*, *Consultorio 1*, etc.), Fecha última compra y acciones `...`.
    - Drawer lateral de detalle de insumo: Fotografía/icono, Código, Presentación, Precio de compra de referencia ($8.500), Proveedor habitual (Droguería del Norte) y notas de presentación.
    - Gráficos analíticos: Donut de stock por categoría y barras de insumos críticos en falta.
  - **Módulo de Proveedores y Compras (Pantalla 07):**
    - Listado de proveedores con Razón Social, CUIT, Rubro, Teléfono, Email y Estado (*Activo*, *Inactivo*).
    - Tarjeta lateral de legajo de proveedor con condición de pago pactada (ej: 30 días) y contacto comercial.
    - Tabla inferior de Órdenes de Compra (OC): N° de Orden, Proveedor, Monto, Estado (*Pendiente*, *En tránsito*, *Recepcionada*, *Cancelada*).
    - Tabla de Recepción de Mercadería: Control de entregas con estado *Completa* o *Parcial*.
- **Fuera de alcance:**
  - Facturación electrónica fiscal automática ante entidades impositivas (AFIP/DIAN).

---

## 2. Contrato de Datos (Inputs / Outputs)

### Tipos TypeScript Estrictos (`src/types/stock.ts`)
```typescript
export type CategoriaInsumo = 'descartables' | 'medicamentos' | 'curaciones' | 'higiene' | 'soluciones' | 'otros';
export type EstadoStock = 'normal' | 'stock_bajo' | 'sin_stock';
export type EstadoOC = 'pendiente' | 'en_transito' | 'recepcionada' | 'cancelada';
export type EstadoRecepcion = 'completa' | 'parcial';

export interface InsumoItem {
  readonly id: string;
  readonly codigo: string; // ej: INS-001
  readonly nombre: string;
  readonly categoria: CategoriaInsumo;
  readonly presentacion: string; // ej: Caja x 100 u, Frasco x 1 L
  readonly stockActual: number;
  readonly stockMinimo: number;
  readonly estado: EstadoStock;
  readonly ubicacion: string;
  readonly precioCompraReferencia: number;
  readonly proveedorHabitualNombre: string;
  readonly ultimaCompraFecha: string;
  readonly notas?: string;
}

export interface ProveedorItem {
  readonly id: string;
  readonly razonSocial: string;
  readonly cuit: string;
  readonly rubro: string;
  readonly telefono: string;
  readonly email: string;
  readonly direccion: string;
  readonly condicionPagoDias: number;
  readonly contactoComercial: string;
  readonly activo: boolean;
}

export interface OrdenCompraItem {
  readonly id: string;
  readonly numeroOrden: string; // ej: OC-00023
  readonly proveedorNombre: string;
  readonly fecha: string;
  readonly montoTotal: number;
  readonly estado: EstadoOC;
}

export interface RecepcionMercaderiaItem {
  readonly id: string;
  readonly fecha: string;
  readonly ordenCompraNumero: string;
  readonly proveedorNombre: string;
  readonly itemsContados: number;
  readonly estado: EstadoRecepcion;
}
```

---

## 3. UI / Componentes y Flujo

### Archivos a Crear
1. `src/types/stock.ts`: Interfaces tipadas para inventario, proveedores y compras.
2. `src/components/stock/stock-kpis-header.tsx`: Fila de tarjetas con contadores de inventario y semáforo de alerta.
3. `src/components/stock/insumos-data-table.tsx`: Tabla de inventario con toggle de "Solo stock bajo".
4. `src/components/stock/insumo-drawer-detalle.tsx`: Panel lateral con especificaciones del insumo y proveedor.
5. `src/components/compras/proveedores-data-table.tsx`: Tabla de proveedores con visualizador lateral de contrato.
6. `src/components/compras/ordenes-compra-panel.tsx`: Grilla inferior con órdenes y recepciones parciales/totales.
7. `src/app/(dashboard)/stock/page.tsx`: Vista principal de stock.
8. `src/app/(dashboard)/compras/page.tsx`: Vista principal de compras y proveedores.

### Reglas de Diseño de Badges
- **Normal:** `bg-emerald-50 text-emerald-700 border-emerald-200`
- **Stock bajo:** `bg-amber-50 text-amber-700 border-amber-200`
- **Sin stock:** `bg-rose-50 text-rose-700 border-rose-200`
- **Recepcionada / Completa:** `bg-emerald-50 text-emerald-700`
- **Parcial / En tránsito:** `bg-sky-50 text-sky-700`

---

## 4. Reglas de Negocio y Casos Borde (Edge Cases)
- **Cálculo reactivo de estado:** El estado del insumo se deduce automáticamente:
  - Si `stockActual === 0` -> `sin_stock`
  - Si `stockActual <= stockMinimo` -> `stock_bajo`
  - Si `stockActual > stockMinimo` -> `normal`
- **Consumo que excede existencia:** Si se registra una salida mayor al `stockActual`, la mutación se rechaza con error tipado "Stock insuficiente para realizar el despacho".
- **Recepción de mercadería:** Al registrar una recepción en estado `Completa`, las unidades se suman automáticamente al inventario del insumo correspondiente.

---

## 5. Criterios de Aceptación (Definition of Done)
- [ ] La tabla de stock filtra correctamente al activar el interruptor "Solo stock bajo".
- [ ] El panel lateral del insumo muestra la imagen de muestra, código y datos del proveedor asociado.
- [ ] La vista de compras lista proveedores y permite consultar órdenes de compra y recepciones.
- [ ] Cero uso de `any` y tipado 100% estricto.