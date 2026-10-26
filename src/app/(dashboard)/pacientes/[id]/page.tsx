import { Suspense } from "react";
import { PacienteSkeleton } from "@/components/pacientes/paciente-skeleton";
import { PacienteDetailContent } from "./paciente-detail-content";
import { MOCK_PACIENTES } from "@/lib/data/mock-pacientes";

interface PacientePageProps {
  readonly params: Promise<{ readonly id: string }>;
}

export function generateStaticParams() {
  return MOCK_PACIENTES.map((paciente) => ({
    id: paciente.id,
  }));
}

async function PacienteDetailAsyncWrapper({ params }: PacientePageProps) {
  const { id } = await params;
  return <PacienteDetailContent id={id} />;
}

export default function PacienteDetailPage(props: PacientePageProps) {
  return (
    <Suspense fallback={<PacienteSkeleton />}>
      <PacienteDetailAsyncWrapper {...props} />
    </Suspense>
  );
}
