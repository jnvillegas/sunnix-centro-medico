# 01. Negocio, Filosofía y Reglas del Sistema

## 1. Misión del Sistema
**Sunnix Software - Centro Médico** es una plataforma operativa y administrativa integral para clínicas y centros de salud ambulatorios con quirófano ambulatorio. Su objetivo es unificar la gestión médica, la ocupación física (consultorios/quirófanos), la cadena de suministros y el flujo financiero en una única fuente de verdad.

## 2. Actores del Sistema y Roles (RBAC)
1. **Administrador General / Dirección:** Control total sobre finanzas, reportes, configuración de consultorios y profesionales.
2. **Recepcionista / Admisión:** Gestión de agenda, check-in de turnos, alta de pacientes y cobros de mostrador.
3. **Profesional Médico:** Visualización de su agenda, registro de evolución/diagnósticos, carga de recetas y solicitudes de estudios.
4. **Coordinador Quirúrgico:** Reserva y asignación de quirófanos, cirujanos, tiempos y estados de cirugías.
5. **Administrador de Farmacia / Depósito:** Control de stock médico, recepción de órdenes de compra y registro de consumos.

## 3. Reglas Invariables del Negocio

### 3.1. Gestión de Turnos y Ocupación Física
- **Incompatibilidad de superposición:** Un consultorio no puede tener dos turnos activos simultáneos en el mismo horario y fecha.
- **Doble reserva de profesional:** Un profesional no puede tener turnos en dos consultorios o quirófanos distintos al mismo tiempo.
- **Tipología de slots:** Todo turno en agenda pertenece a una de las siguientes categorías visuales y operativas:
  - `Consulta`
  - `Control`
  - `Procedimiento`
  - `Cirugía menor`
  - `Bloqueado` (mantenimiento o no disponible)
- **Tolerancia y ausentismo:** 
  - Todo turno no asistido trascurrida la ventana de tolerancia pasa al estado `No asistió`.
  - El sistema mantiene un contador acumulativo de inasistencias en la ficha del paciente para alertar a recepción sobre ausentismo crónico (tasa > 30%).

### 3.2. Gestión de Quirófanos y Cirugías
- Toda cirugía requiere: Paciente, Cirujano responsable, Procedimiento, Quirófano asignado, Fecha, Horario de inicio y Duración estimada.
- Estados de la cirugía: `Programada` -> `En curso` -> `Finalizada` (o `Cancelada`).

### 3.3. Ficha Médica y Pacientes
- Identificador unívoco: Tipo y número de documento (DNI/Cédula).
- La ficha consolida: Datos filiatorios, Cobertura (Obra Social + N° Afiliado), Alergias críticas (destaque visual prioritario), Antecedentes, Recetas, Estudios adjuntos y Membresía activa.
- **Membresías:** Pueden ser `Individual` o `Familiar`. La membresía familiar permite vincular dependientes (pareja, hijos) compartiendo beneficios y número de socio.

### 3.4. Profesionales y Alquiler de Consultorio (Modelo Híbrido)
- El sistema maqueta y registra:
  - Alquiler fijo mensual del consultorio con fecha de inicio y próximo vencimiento.
  - Registro de facturación mensual/anual producida por el médico.
  - *Nota de diseño:* Las reglas de liquidación porcentual se mantienen desacopladas y no bloqueantes en esta primera versión, permitiendo configurar monto fijo o registro meramente informativo.

### 3.5. Finanzas, Caja y Mora Automática
- **Tesorería multicuenta:** Todo ingreso o egreso impacta en una cuenta contable/financiera concreta (`Caja Principal`, `Caja Chica`, `Banco Santander`, `Banco Macro`).
- **Motor de Interés por Mora:** Las cuentas por cobrar vencidas calculan interés punitorio diario según la fórmula:
  $$\text{Interés} = \text{Monto Base} \times \left(\frac{\text{Tasa Mensual}}{30}\right) \times \text{Días de Atraso}$$
  - No se computa interés si `Días de Atraso <= 0`.
- **Estados de Factura:** `Al día`, `Por vencer (próx 7 días)`, `Hoy vence`, `Vencida`.

### 3.6. Compras, Proveedores y Stock
- Circuito de abastecimiento cerrado: `Orden de Compra` -> `Recepción de Mercadería` (Total o Parcial) -> `Actualización de Stock` -> `Factura a Pagar`.
- Alertas de inventario basadas en umbrales:
  - `Stock Normal`: Stock actual > Stock mínimo.
  - `Stock Bajo`: 0 < Stock actual <= Stock mínimo.
  - `Sin Stock`: Stock actual == 0.