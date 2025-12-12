import { redirect } from 'next/navigation';
import { getUser } from '@/lib/supabase/server';
import { Sidebar } from '@/components/layout/sidebar';
import { DashboardPreferencesProvider } from '@/lib/contexts/dashboard-preferences';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuario';

  return (
    <DashboardPreferencesProvider>
      <div className="flex h-screen w-full overflow-hidden bg-transparent text-slate-800 dark:text-slate-100 font-sans transition-colors duration-500">
        {/* Apple 2025 Gradient Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-[#0a0a0a] dark:via-[#0d0d0f] dark:to-[#0a0a0a]" />
          {/* Subtle animated gradient orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-ios-blue/10 to-ios-purple/10 rounded-full blur-3xl opacity-50 dark:opacity-30" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-ios-teal/10 to-ios-green/10 rounded-full blur-3xl opacity-50 dark:opacity-30" />
        </div>

        {/* Sidebar */}
        <Sidebar userName={userName} userEmail={user.email || ''} />

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-full min-w-0 relative overflow-hidden z-0 ml-[88px] lg:ml-0">
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-6 lg:pl-[280px]">
              {children}
            </div>
          </div>
        </main>
      </div>
    </DashboardPreferencesProvider>
  );
}
