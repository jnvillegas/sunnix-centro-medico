import { Suspense } from "react";
import { ProfesionalDetailContent } from "./profesional-detail-content";
import { MOCK_PROFESIONALES } from "@/lib/data/mock-profesionales";

interface ProfesionalPageProps {
  readonly params: Promise<{ readonly id: string }>;
}

export function generateStaticParams() {
  return MOCK_PROFESIONALES.map((med) => ({
    id: med.id,
  }));
}

async function ProfesionalDetailAsyncWrapper({ params }: ProfesionalPageProps) {
  const { id } = await params;
  return <ProfesionalDetailContent id={id} />;
}

export default function ProfesionalDetailPage(props: ProfesionalPageProps) {
  return (
    <Suspense
      fallback={
        <div className="space-y-6 animate-pulse">
          <div className="h-44 bg-white rounded-2xl border border-slate-200" />
          <div className="grid grid-cols-3 gap-4">
            <div className="h-28 bg-white rounded-xl border border-slate-200" />
            <div className="h-28 bg-white rounded-xl border border-slate-200" />
            <div className="h-28 bg-white rounded-xl border border-slate-200" />
          </div>
        </div>
      }
    >
      <ProfesionalDetailAsyncWrapper {...props} />
    </Suspense>
  );
}
