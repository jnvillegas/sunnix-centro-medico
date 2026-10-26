import {
  ParametrosCalculoMora,
  ResultadoCalculoMora,
  EstadoFacturaCobro,
} from "@/types/finanzas";

/**
 * Parsea una fecha en formato YYYY-MM-DD o ISO a un objeto Date a medianoche local,
 * evitando desfases de zona horaria generados por UTC.
 */
function parseFechaLocal(dateInput: string | Date): Date {
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

/**
 * Calcula de forma matemática y determinista los días de atraso,
 * el interés punitorio proporcional diario según la tasa mensual pautada,
 * el monto total a percibir y el estado de la factura.
 *
 * Fórmula de Mora Diaria:
 * Tasa Diaria = (Tasa Mensual % / 100) / 30
 * Interés = Monto Original * Tasa Diaria * Días de Atraso
 */
export function calcularInteresMora(
  params: ParametrosCalculoMora
): ResultadoCalculoMora {
  const fechaRef = params.fechaReferencia
    ? parseFechaLocal(params.fechaReferencia)
    : parseFechaLocal("2025-05-12"); // Fecha central de simulación Sunnix

  const fechaVenc = parseFechaLocal(params.fechaVencimiento);

  const diffTiempo = fechaRef.getTime() - fechaVenc.getTime();
  const diasAtraso = Math.round(diffTiempo / (1000 * 3600 * 24));

  const tasaMensual = params.tasaMensualPct ?? 2.0; // 2.0% mensual por defecto
  const tasaDiaria = tasaMensual / (100 * 30); // ~0.066% diario

  if (diasAtraso <= 0) {
    let estado: EstadoFacturaCobro = "al_dia";
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

  // Interés acumulado exacto redondeado a 2 decimales
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
