import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { AnamneseForm } from '@/components/anamnese/anamnese-form';
import { getSyndromeByCode } from '@/lib/anamnese/actions';

interface AnamnesePageProps {
  params: Promise<{ syndrome: string }>;
}

export async function generateMetadata({ params }: AnamnesePageProps): Promise<Metadata> {
  const { syndrome: syndromeCode } = await params;
  const syndrome = await getSyndromeByCode(syndromeCode);

  if (!syndrome) {
    return { title: 'Sindrome nao encontrada | WellWave' };
  }

  return {
    title: `${syndrome.name} | WellWave`,
    description: `Preencha a anamnese para ${syndrome.name}.`,
  };
}

export default async function AnamnesePage({ params }: AnamnesePageProps) {
  const { syndrome: syndromeCode } = await params;
  const syndrome = await getSyndromeByCode(syndromeCode);

  if (!syndrome) {
    notFound();
  }

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-500">
      {/* Apple-style Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/dashboard"
          className="p-2.5 rounded-2xl bg-white/50 dark:bg-white/5 border border-white/50 dark:border-white/10 backdrop-blur-xl hover:bg-white/70 dark:hover:bg-white/10 transition-all text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-[28px] font-black text-slate-900 dark:text-white tracking-tighter leading-tight">
            {syndrome.name}
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{syndrome.description}</p>
        </div>
      </div>

      {/* Form */}
      <AnamneseForm syndrome={syndrome} />
    </div>
  );
}
