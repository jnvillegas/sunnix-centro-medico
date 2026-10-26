# 05. Matriz Maestra de Procesos y Funcionalidades (El Eslabón Perdido)

| ID Proceso | Macro-Módulo | Nombre del Proceso | Actor Principal | Trigger / Disparador | Salida / Efecto Esperado |
|---|---|---|---|---|---|
| **[TUR-01]** | Agenda | Agendamiento de Turno | Recepcionista / Paciente | Solicitud de turno ambulatorio | Turno creado en estado `Pendiente`/`Confirmado`, slot bloqueado en consultorio. |
| **[TUR-02]** | Agenda | Check-in y Asistencia | Recepcionista | Paciente llega al centro | Estado del turno cambia a `Asistió`. Se registra marca de tiempo. |
| **[TUR-03]** | Agenda | Marcación de Ausencia | Sistema / Recepcionista | Fin del slot sin check-in | Estado cambia a `No asistió`. Suma al score de inasistencia del paciente. |
| **[TUR-04]** | Agenda | Reprogramación de Turno | Recepcionista | Solicitud de cambio de fecha/hora | Turno anterior marcado como `Reprogramado`, nuevo turno creado vinculado al anterior. |
| **[CX-01]** | Quirófano | Programación Quirúrgica | Coordinador Quirúrgico | Orden médica de cirugía | Reserva de quirófano en estado `Programada` validando no superposición. |
| **[CX-02]** | Quirófano | Ejecución Quirúrgica | Cirujano / Quirófano | Inicio y fin del acto quirúrgico | Transición de `Programada` -> `En curso` -> `Finalizada`. |
| **[PAC-01]** | Pacientes | Alta y Empadronamiento | Recepcionista | Paciente nuevo en el centro | Registro en tabla pacientes con validación de DNI único. |
| **[PAC-02]** | Pacientes | Asignación de Membresía | Recepcionista / Admin | Pago o suscripción a plan | Membresía vinculada (Individual/Familiar) con vigencia y grupo familiar. |
| **[MED-01]** | Profesionales | Alta de Profesional y Asignación | Admin | Incorporación de médico | Profesional registrado, horarios asignados a consultorio y canon de alquiler configurado. |
| **[TES-01]** | Tesorería | Registro de Ingreso de Caja | Recepcionista / Cajero | Cobro de consulta / estudio / copago | Movimiento de caja registrado, medio de pago asociado, factura emitida/marcada cobrada. |
| **[TES-02]** | Tesorería | Registro de Egreso Operativo | Administración | Pago de servicio, alquiler o mantenimiento | Movimiento de débito en cuenta bancaria o caja chica con comprobante adjunto. |
| **[COB-01]** | Cobranzas | Cálculo Automático de Mora | Sistema (Cron / On-render) | Factura supera la fecha de vencimiento | Cálculo de recargo por día de atraso aplicado al total adeudado. |
| **[COB-02]** | Cobranzas | Cobro Total o Parcial de Deuda | Administración | Pago de factura vencida o corriente | Registro del cobro, actualización del saldo deudor y estado de factura. |
| **[STK-01]** | Inventario | Consumo de Insumos Médicos | Enfermería / Médico | Uso en consulta o procedimiento | Descuento automático de unidades del depósito o consultorio. |
| **[COM-01]** | Compras | Emisión de Orden de Compra | Encargado de Compras | Alerta de stock bajo o reposición | OC generada en estado `Pendiente` vinculada a proveedor y monto. |
| **[COM-02]** | Compras | Recepción de Mercadería | Depósito | Entrega física por parte del proveedor | Ingreso a stock (Total/Parcial), OC pasa a `Recepcionada`, genera cuenta por pagar. |

---

### Detalle de Procesos Críticos

#### [TUR-01] Agendamiento de Turno
- **Entrada:** `paciente_id`, `profesional_id`, `consultorio_id`, `fecha`, `hora_inicio`, `hora_fin`, `tipo_turno` (Consulta/Control/Procedimiento), `motivo`.
- **Flujo:**
  1. Validar que `consultorio_id` no tenga solapamiento en `[hora_inicio, hora_fin]` para esa fecha.
  2. Validar que `profesional_id` no tenga turnos en otro consultorio en el mismo horario.
  3. Crear el turno con estado inicial `Confirmado`.
- **Casos Borde:**
  - Si el paciente tiene más de 3 inasistencias en 6 meses, emitir advertencia no bloqueante al operador.

#### [COB-01] Cálculo y Liquidación de Mora
- **Entrada:** `factura_id`, `tasa_interes_mensual_pct` (por defecto: 2%).
- **Flujo:**
  1. Si `fecha_actual <= fecha_vencimiento`: `dias_atraso = 0`, `interes = 0`.
  2. Si `fecha_actual > fecha_vencimiento`:
     $$\text{dias\_atraso} = \text{DATEDIFF}(\text{fecha\_actual}, \text{fecha\_vencimiento})$$
     $$\text{tasa\_diaria} = \frac{\text{tasa\_interes\_mensual\_pct}}{100 \times 30}$$
     $$\text{interes} = \text{ROUND}(\text{monto\_original} \times \text{tasa\_diaria} \times \text{dias\_atraso}, 2)$$
     $$\text{total\_a\_cobrar} = \text{monto\_original} + \text{interes}$$
- **Casos Borde:**
  - Posibilidad de eximir interés manualmente con rol `Administrador`.