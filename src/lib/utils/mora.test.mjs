import test from "node:test";
import assert from "node:assert/strict";

// Implementación de prueba del motor de mora para ejecución con node:test
function parseFechaLocal(dateInput) {
  if (dateInput instanceof Date) {
    return new Date(dateInput.getFullYear(), dateInput.getMonth(), dateInput.getDate());
  }

  if (typeof dateInput === "string" && dateInput.includes("-")) {
    const parts = dateInput.split("T")[0].split("-").map(Number);
    if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
      return new Date(parts[0], parts[1] - 1, parts[2]);
    }
  }

  const d = new Date(dateInput);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function calcularInteresMora(params) {
  const fechaRef = params.fechaReferencia
    ? parseFechaLocal(params.fechaReferencia)
    : parseFechaLocal("2025-05-12");

  const fechaVenc = parseFechaLocal(params.fechaVencimiento);

  const diffTiempo = fechaRef.getTime() - fechaVenc.getTime();
  const diasAtraso = Math.round(diffTiempo / (1000 * 3600 * 24));

  const tasaMensual = params.tasaMensualPct ?? 2.0;
  const tasaDiaria = tasaMensual / (100 * 30);

  if (diasAtraso <= 0) {
    let estado = "al_dia";
    if (diasAtraso === 0) {
      estado = "hoy_vence";
    } else if (diasAtraso >= -7) {
      estado = "por_vencer";
    }

    return {
      diasAtraso,
      interes: 0,
      totalACobrar: params.montoOriginal,
      estado,
    };
  }

  const interes =
    Math.round(params.montoOriginal * tasaDiaria * diasAtraso * 100) / 100;
  const totalACobrar =
    Math.round((params.montoOriginal + interes) * 100) / 100;

  return {
    diasAtraso,
    interes,
    totalACobrar,
    estado: "vencida",
  };
}

test("calcularInteresMora - Factura vencida con 20 días de mora", () => {
  const res = calcularInteresMora({
    montoOriginal: 50000,
    fechaVencimiento: "2025-04-22",
    fechaReferencia: "2025-05-12",
    tasaMensualPct: 2.0,
  });

  assert.equal(res.diasAtraso, 20);
  assert.equal(res.estado, "vencida");
  // 50000 * (0.02 / 30) * 20 = 666.67
  assert.equal(res.interes, 666.67);
  assert.equal(res.totalACobrar, 50666.67);
});

test("calcularInteresMora - Factura que vence hoy", () => {
  const res = calcularInteresMora({
    montoOriginal: 35000,
    fechaVencimiento: "2025-05-12",
    fechaReferencia: "2025-05-12",
  });

  assert.equal(res.diasAtraso, 0);
  assert.equal(res.estado, "hoy_vence");
  assert.equal(res.interes, 0);
  assert.equal(res.totalACobrar, 35000);
});

test("calcularInteresMora - Factura por vencer en 3 días", () => {
  const res = calcularInteresMora({
    montoOriginal: 42000,
    fechaVencimiento: "2025-05-15",
    fechaReferencia: "2025-05-12",
  });

  assert.equal(res.diasAtraso, -3);
  assert.equal(res.estado, "por_vencer");
  assert.equal(res.interes, 0);
  assert.equal(res.totalACobrar, 42000);
});

test("calcularInteresMora - Factura al día (vence en 12 días)", () => {
  const res = calcularInteresMora({
    montoOriginal: 48000,
    fechaVencimiento: "2025-05-24",
    fechaReferencia: "2025-05-12",
  });

  assert.equal(res.diasAtraso, -12);
  assert.equal(res.estado, "al_dia");
  assert.equal(res.interes, 0);
  assert.equal(res.totalACobrar, 48000);
});
