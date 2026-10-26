# SPEC-007: Tesorería Multicuenta y Cuentas por Cobrar con Motor de Mora

**Estado:** APROBADO 
**Fase Roadmap:** Fase 7 - Facturación, Mora & Tesorería  
**Procesos Vinculados:** `[TES-01]`, `[TES-02]`, `[COB-01]`, `[COB-02]`  
**Módulos Afectados:** `src/app/(dashboard)/finanzas/*`, `src/app/(dashboard)/cobranzas/*`, `src/types/finanzas.ts`, `src/lib/utils/mora.ts`  

---

## 1. Objetivo y Alcance
- **Problema a resolver:** Administrar la liquidez en múltiples cuentas bancarias/cajas físicas del centro médico (Pantalla 06) y liquidar deudas de pacientes aplicando recargos punitorios automáticos por mora diaria (Pantalla 08).
- **En alcance:**
  - **Módulo de Ingresos y Egresos / Tesorería (Pantalla 06):**
    - 5 KPICards: Ingresos totales ($12.450.000 +12%), Egresos totales ($7.320.000 +6%), Resultado operativo ($5.130.000 con rentabilidad 41%), Cuentas por cobrar ($2.850.000) y Cuentas por pagar ($1.940.000).
    - Widget "Cuentas y bancos": Saldos en tiempo real para `Caja principal`, `Banco Santander`, `Banco Macro` y `Caja chica`.
    - Tablas de últimos ingresos y egresos con desglose de medio de pago y categoría.
    - Gráfico de barras de evolución mensual y donut de distribución de gastos (insumos, sueldos, servicios, mantenimiento).
  - **Módulo de Cuentas por Cobrar con Motor de Mora (Pantalla 08):**
    - 4 KPICards superiores: Total por cobrar ($8.450.000), Vencidas ($3.280.000), Por vencer próx. 7 días ($2.150.000), Al día ($3.020.000).
    - Tabla de facturas: N° Factura (FAC-00123), Fecha emisión, Paciente, Concepto, Monto original, Vencimiento, Días de atraso, Interés punitorio calculado, Total a cobrar y Estado (*Vencida*, *Hoy vence*, *Por vencer*, *Al día*).
    - Drawer lateral de cobranza: Detalle de factura, datos del paciente, desglose de días de atraso, interés al 2% mensual y botones: `Registrar cobro`, `Aplicar pago parcial`, `Generar nota de crédito`.
    - Widget de control de parámetros: Visualización y edición de la Tasa Mensual de Mora (ej: 2.00% mensual = 0.066% diario).
    - Barra horizontal de Antigüedad de Saldos: Al día (36%), 1-30 días (28%), 31-60 días (16%), 61-90 días (12%), +90 días (8%).
- **Fuera de alcance:**
  - Conexión vía API con bancos para conciliación automática de extractos bancarios.

---

## 2. Contrato de Datos (Inputs / Outputs)

### Tipos TypeScript Estrictos (`src/types/finanzas.ts`)
```typescript
export type EstadoFacturaCobro = 'al_dia' | 'por_vencer' | 'hoy_vence' | 'vencida' | 'cobrada';
export type MedioPago = 'efectivo' | 'transferencia' | 'tarjeta' | 'cheque';

export interface CuentaBancariaSaldo {
  readonly id: string;
  readonly nombre: 'Caja principal' | 'Banco Santander' | 'Banco Macro' | 'Caja chica';
  readonly saldoActual: number;
}

export interface MovimientoTesoreria {
  readonly id: string;
  readonly fecha: string;
  readonly tipo: 'ingreso' | 'egreso';
  readonly concepto: string;
  readonly origenODestino: string; // Nombre de paciente o proveedor
  readonly monto: number;
  readonly medioPago: MedioPago;
  readonly estado: 'Cobrado' | 'Pagado';
}

export interface FacturaCobroItem {
  readonly id: string;
  readonly numeroFactura: string; // ej: FAC-00123
  readonly pacienteId: string;
  readonly pacienteNombre: string;
  readonly concepto: string;
  readonly especialidad?: string;
  readonly montoOriginal: number;
  readonly fechaEmision: string; // YYYY-MM-DD
  readonly fechaVencimiento: string; // YYYY-MM-DD
  readonly diasAtraso: number; // Negativo si falta vencer, positivo si venció
  readonly interesCalculado: number;
  readonly totalACobrar: number;
  readonly estado: EstadoFacturaCobro;
}
```

### Función Pura del Motor de Mora (`src/lib/utils/mora.ts`)
```typescript
export interface ParametrosCalculoMora {
  readonly montoOriginal: number;
  readonly fechaVencimiento: string;
  readonly fechaReferencia?: string; // Por defecto hoy
  readonly tasaMensualPct?: number; // Por defecto 2.0
}

export interface ResultadoCalculoMora {
  readonly diasAtraso: number;
  readonly interes: number;
  readonly totalACobrar: number;
  readonly estado: EstadoFacturaCobro;
}

export function calcularInteresMora(params: ParametrosCalculoMora): ResultadoCalculoMora {
  const fechaRef = params.fechaReferencia ? new Date(params.fechaReferencia) : new Date();
  const fechaVenc = new Date(params.fechaVencimiento);
  
  const diffTiempo = fechaRef.getTime() - fechaVenc.getTime();
  const diasAtraso = Math.floor(diffTiempo / (1000 * 3600 * 24));
  
  const tasaMensual = params.tasaMensualPct ?? 2.0;
  const tasaDiaria = tasaMensual / (100 * 30);
  
  if (diasAtraso <= 0) {
    let estado: EstadoFacturaCobro = 'al_dia';
    if (diasAtraso === 0) estado = 'hoy_vence';
    else if (diasAtraso >= -7) estado = 'por_vencer';

    return {
      diasAtraso,
      interes: 0,
      totalACobrar: params.montoOriginal,
      estado,
    };
  }

  const interes = Math.round(params.montoOriginal * tasaDiaria * diasAtraso * 100) / 100;
  return {
    diasAtraso,
    interes,
    totalACobrar: params.montoOriginal + interes,
    estado: 'vencida',
  };
}
```

---

## 3. UI / Componentes y Flujo

### Archivos a Crear
1. `src/types/finanzas.ts`: Definición de interfaces tipadas.
2. `src/lib/utils/mora.ts`: Motor de cálculo matemático de mora diaria.
3. `src/components/finanzas/tesoreria-kpis.tsx`: Tarjetas de ingresos, egresos y resultado neto con margen de rentabilidad.
4. `src/components/finanzas/cuentas-bancos-list.tsx`: Tarjeta con lista de saldos por caja y entidad bancaria.
5. `src/components/cobranzas/cobranzas-kpis-header.tsx`: 4 tarjetas superiores de saldos por cobrar y vencidos.
6. `src/components/cobranzas/facturas-cobro-table.tsx`: Tabla con cálculo visible de mora e indicadores de vencimiento.
7. `src/components/cobranzas/factura-cobro-drawer.tsx`: Drawer lateral para registro de cobro total o pago parcial.
8. `src/components/cobranzas/antiguedad-saldos-bars.tsx`: Widget de barras de distribución por días de mora.
9. `src/app/(dashboard)/finanzas/page.tsx`: Vista general de finanzas.
10. `src/app/(dashboard)/cobranzas/page.tsx`: Vista general de cuentas por cobrar.

---

## 4. Reglas de Negocio y Casos Borde (Edge Cases)
- **Tolerancia de vencimiento:** Si la factura vence el día corriente (`diasAtraso === 0`), el estado es `hoy_vence` y no aplica ningún recargo de mora.
- **Pago parcial:** Al abonar un monto inferior al total, el saldo restante genera una nueva cuota adeudada con fecha de vencimiento a definir y estado pendiente.
- **Transaccionalidad en caja:** Todo cobro asentado en cobranzas incrementa obligatoriamente el saldo de la cuenta financiera receptora (`Caja principal`, `Banco`, etc.) en la misma transacción.

---

## 5. Criterios de Aceptación (Definition of Done)
- [ ] La función `calcularInteresMora` cuenta con tests unitarios que comprueban montos, días de atraso positivos y negativos con 100% de precisión.
- [ ] La tabla de cuentas por cobrar muestra con claridad el desglose de monto original, interés por mora y total final.
- [ ] El widget de bancos muestra los saldos actualizados de las 4 cuentas monetarias.
- [ ] Cero uso de `any` y tipado riguroso en todo el módulo.