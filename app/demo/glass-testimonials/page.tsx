import React from 'react';
import { GlassTestimonialStack, Testimonial } from '@/components/ui/GlassTestimonialStack';
import { Stethoscope, Brain, HeartPulse, Activity } from 'lucide-react';

// --- Mock Data ---
const demoTestimonials: Testimonial[] = [
  {
    id: 1,
    initials: "Dr. A",
    name: "Dr. André Silva",
    role: "Cardiologista Intervencionista",
    quote: "A precisão dos scores de risco integrados ao fluxo de anamnese reduziu meu tempo de decisão em 40%. A interface é simplesmente invisível, permite focar 100% no paciente.",
    tags: [
      { text: "Alta Produtividade", type: "featured" },
      { text: "UX Premium", type: "default" }
    ],
    rating: 5,
    avatarGradient: "linear-gradient(135deg, #FF3B30, #FF9500)" // Apple Red/Orange
  },
  {
    id: 2,
    initials: "Dra. J",
    name: "Dra. Julia Costa",
    role: "Neurologista",
    quote: "O Glass UI não é apenas bonito, é funcional. A hierarquia visual das notas inteligentes ajuda a identificar padrões neurológicos sutis que antes passavam despercebidos em prontuários comuns.",
    tags: [
      { text: "Design Inteligente", type: "featured" },
      { text: "Clareza Clínica", type: "default" }
    ],
    rating: 5,
    avatarGradient: "linear-gradient(135deg, #AF52DE, #5856D6)" // Apple Purple/Indigo
  },
  {
    id: 3,
    initials: "Dr. M",
    name: "Dr. Marcos Rocha",
    role: "Médico de Emergência",
    quote: "Em um plantão caótico, a estabilidade e a fluidez do WellWave são essenciais. Os calculadores automáticos de sepse e risco cardiovascular são game-changers.",
    tags: [
      { text: "Confiabilidade", type: "featured" },
      { text: "Emergência", type: "default" }
    ],
    rating: 5,
    avatarGradient: "linear-gradient(135deg, #34C759, #00C7BE)" // Apple Green/Teal
  },
  {
    id: 4,
    initials: "Res. C",
    name: "Camila Torres",
    role: "Residente de Clínica Médica",
    quote: "A curva de aprendizado é zero. O sistema parece antecipar o que eu preciso escrever. A interface 'liquid' traz uma paz visual que diminui o estresse do dia a dia.",
    tags: [
      { text: "Intuitivo", type: "featured" },
      { text: "Zero Friction", type: "default" }
    ],
    rating: 4,
    avatarGradient: "linear-gradient(135deg, #007AFF, #5AC8FA)" // Apple Blue
  }
];

export default function GlassTestimonialDemoPage() {
  return (
    <div className="min-h-screen w-full bg-[#f5f5f7] dark:bg-black flex flex-col items-center justify-center p-8 relative overflow-hidden">
      
      {/* Background Ambience similar to WellWave global styles */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(0,78,146,0.1),transparent_70%)]" />
         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl w-full flex flex-col items-center gap-12 relative z-10">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 dark:bg-white/10 backdrop-blur-md border border-white/20 shadow-sm mb-4">
              <Activity className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">WellWave Design System</span>
           </div>
           
           <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter">
             Liquid Feedback.
           </h1>
           <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
             Uma experiência de leitura de depoimentos que flui como vidro líquido. Toque, arraste e sinta a inércia.
           </p>
        </div>

        {/* The Component Showcase */}
        <div className="w-full py-10 scale-110">
           <GlassTestimonialStack testimonials={demoTestimonials} />
        </div>

        {/* Footer / Controls Hint */}
        <div className="flex items-center gap-6 opacity-40">
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              <span className="text-xs font-medium uppercase tracking-widest">Swipe to Navigate</span>
           </div>
        </div>

      </div>
    </div>
  );
}
