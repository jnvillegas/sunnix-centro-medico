# 02. Modelo Relacional y DDL Consolidado (PostgreSQL)

```sql
-- Extensiones requeridas
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ENUMS
CREATE TYPE tipo_turno AS ENUM ('consulta', 'control', 'procedimiento', 'cirugia_menor', 'bloqueado');
CREATE TYPE estado_turno AS ENUM ('pendiente', 'confirmado', 'asistio', 'no_asistio', 'reprogramado', 'cancelado');
CREATE TYPE estado_cirugia AS ENUM ('programada', 'en_curso', 'finalizada', 'cancelada');
CREATE TYPE tipo_membresia AS ENUM ('individual', 'familiar');
CREATE TYPE estado_membresia AS ENUM ('activa', 'vencida', 'suspendida');
CREATE TYPE medio_pago AS ENUM ('efectivo', 'transferencia', 'tarjeta', 'cheque');
CREATE TYPE estado_factura AS ENUM ('al_dia', 'por_vencer', 'hoy_vence', 'vencida', 'cobrada', 'anulada');
CREATE TYPE estado_oc AS ENUM ('pendiente', 'en_transito', 'recepcionada', 'cancelada');
CREATE TYPE estado_recepcion AS ENUM ('completa', 'parcial');
CREATE TYPE categoria_insumo AS ENUM ('descartables', 'medicamentos', 'curaciones', 'higiene', 'soluciones', 'otros');

-- 1. CONSULTORIOS Y ESPACIOS FÍSICOS
CREATE TABLE consultorios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    numero VARCHAR(20) NOT NULL,
    nombre VARCHAR(100) NOT NULL, -- ej: Consultorio 1, Quirófano 1
    es_quirofano BOOLEAN DEFAULT FALSE,
    piso VARCHAR(50) DEFAULT 'Piso 1 - Ala Norte',
    equipamiento TEXT,
    habilitado BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PACIENTES Y MEMBRESÍAS
CREATE TABLE membresias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo VARCHAR(50) UNIQUE NOT NULL, -- ej: FAM-000125
    nombre_plan VARCHAR(100) NOT NULL, -- ej: Plan Familiar
    tipo tipo_membresia NOT NULL DEFAULT 'individual',
    estado estado_membresia NOT NULL DEFAULT 'activa',
    fecha_inicio DATE NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    beneficios TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE pacientes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre_completo VARCHAR(150) NOT NULL,
    dni VARCHAR(30) UNIQUE NOT NULL,
    fecha_nacimiento DATE,
    telefono VARCHAR(50),
    email VARCHAR(100),
    direccion TEXT,
    obra_social VARCHAR(100),
    numero_afiliado VARCHAR(100),
    grupo_sanguineo VARCHAR(10), -- ej: A+, 0-
    alergias TEXT[],
    enfermedades_preexistentes TEXT[],
    medicamentos_habituales TEXT[],
    observaciones_medicas TEXT,
    contacto_emergencia_nombre VARCHAR(150),
    contacto_emergencia_telefono VARCHAR(50),
    membresia_id UUID REFERENCES membresias(id) ON DELETE SET NULL,
    parentesco_membresia VARCHAR(50), -- Titular, Pareja, Hijo
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PROFESIONALES MÉDICOS
CREATE TABLE profesionales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre_completo VARCHAR(150) NOT NULL,
    dni VARCHAR(30) UNIQUE NOT NULL,
    matricula VARCHAR(50) NOT NULL,
    especialidad VARCHAR(100) NOT NULL,
    telefono VARCHAR(50),
    email VARCHAR(100),
    activo BOOLEAN DEFAULT TRUE,
    consultorio_asignado_id UUID REFERENCES consultorios(id) ON DELETE SET NULL,
    monto_alquiler_mensual NUMERIC(12, 2) DEFAULT 0.00,
    alquiler_fecha_vencimiento DATE,
    servicios_prestados TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TURNOS Y AGENDAS
CREATE TABLE turnos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    paciente_id UUID NOT NULL REFERENCES pacientes(id) ON DELETE RESTRICT,
    profesional_id UUID NOT NULL REFERENCES profesionales(id) ON DELETE RESTRICT,
    consultorio_id UUID NOT NULL REFERENCES consultorios(id) ON DELETE RESTRICT,
    fecha DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    tipo tipo_turno NOT NULL DEFAULT 'consulta',
    estado estado_turno NOT NULL DEFAULT 'confirmado',
    motivo VARCHAR(255),
    notas TEXT,
    turno_origen_id UUID REFERENCES turnos(id) ON DELETE SET NULL, -- para reprogramados
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT no_superposicion_consultorio UNIQUE (consultorio_id, fecha, hora_inicio)
);

-- 5. CIRUGÍAS Y QUIRÓFANOS
CREATE TABLE cirugias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    paciente_id UUID NOT NULL REFERENCES pacientes(id) ON DELETE RESTRICT,
    cirujano_id UUID NOT NULL REFERENCES profesionales(id) ON DELETE RESTRICT,
    quirofano_id UUID NOT NULL REFERENCES consultorios(id) ON DELETE RESTRICT,
    procedimiento VARCHAR(255) NOT NULL,
    fecha DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    duracion_estimada_horas NUMERIC(4, 2) NOT NULL, -- ej: 2.50 hs
    estado estado_cirugia NOT NULL DEFAULT 'programada',
    observaciones TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TESORERÍA, CUENTAS BANCARIAS Y MOVIMIENTOS
CREATE TABLE cuentas_financieras (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(100) NOT NULL, -- Caja Principal, Caja Chica, Banco Santander, Banco Macro
    saldo_actual NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE movimientos_caja (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cuenta_financiera_id UUID NOT NULL REFERENCES cuentas_financieras(id),
    tipo_movimiento VARCHAR(10) NOT NULL CHECK (tipo_movimiento IN ('ingreso', 'egreso')),
    categoria VARCHAR(100) NOT NULL, -- Consulta médica, Insumos, Alquileres, Honorarios
    concepto VARCHAR(255) NOT NULL,
    monto NUMERIC(12, 2) NOT NULL,
    medio_pago medio_pago NOT NULL,
    fecha TIMESTAMPTZ DEFAULT NOW(),
    comprobante_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. CUENTAS POR COBRAR Y FACTURACIÓN CON MORA
CREATE TABLE facturas_cobro (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    numero_factura VARCHAR(50) UNIQUE NOT NULL, -- FAC-00123
    paciente_id UUID NOT NULL REFERENCES pacientes(id),
    especialidad VARCHAR(100),
    concepto VARCHAR(255) NOT NULL,
    monto_original NUMERIC(12, 2) NOT NULL,
    fecha_emision DATE NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    tasa_interes_mensual NUMERIC(5, 2) DEFAULT 2.00, -- 2% mensual
    estado estado_factura NOT NULL DEFAULT 'al_dia',
    monto_pagado NUMERIC(12, 2) DEFAULT 0.00,
    fecha_pago TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. PROVEEDORES, COMPRAS E INSUMOS
CREATE TABLE proveedores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    razon_social VARCHAR(150) NOT NULL,
    cuit VARCHAR(30) UNIQUE NOT NULL,
    rubro VARCHAR(100) NOT NULL,
    telefono VARCHAR(50),
    email VARCHAR(100),
    direccion TEXT,
    condicion_pago_dias INT DEFAULT 30,
    contacto_comercial VARCHAR(100),
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE insumos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo VARCHAR(50) UNIQUE NOT NULL, -- INS-001
    nombre VARCHAR(150) NOT NULL,
    categoria categoria_insumo NOT NULL,
    presentacion VARCHAR(100) NOT NULL, -- Caja x 100 u, Frasco x 1 L
    stock_actual INT NOT NULL DEFAULT 0,
    stock_minimo INT NOT NULL DEFAULT 10,
    ubicacion VARCHAR(100) DEFAULT 'Depósito',
    precio_compra_referencia NUMERIC(12, 2) DEFAULT 0.00,
    proveedor_habitual_id UUID REFERENCES proveedores(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ordenes_compra (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    numero_orden VARCHAR(50) UNIQUE NOT NULL, -- OC-00023
    proveedor_id UUID NOT NULL REFERENCES proveedores(id),
    monto_total NUMERIC(12, 2) NOT NULL,
    fecha DATE NOT NULL,
    estado estado_oc NOT NULL DEFAULT 'pendiente',
    created_at TIMESTAMPTZ DEFAULT NOW()
);