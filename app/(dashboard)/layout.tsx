import { redirect } from 'next/navigation';
import { getUser } from '@/lib/supabase/server';
import { Sidebar } from '@/components/layout/sidebar';
import { DashboardPreferencesProvider } from '@/lib/contexts/dashboard-preferences';
import { SidebarProvider } from '@/lib/contexts/sidebar-context';
import {
  SharedLayoutGrid,
  SharedLayoutBackground,
  SharedSidebarColumn,
  SharedMainContent,
} from '@/components/layout/shared-layout';

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
      <SidebarProvider>
        {/* Apple 2025 Gradient Background with animated orbs */}
        <SharedLayoutBackground variant="apple2025" />
        
        {/* 
          CSS Grid Layout using shared primitive:
          - Coluna 1: var(--sidebar-w) - largura do sidebar
          - Coluna 2: 1fr - conteúdo principal
        */}
        <SharedLayoutGrid className="bg-transparent">
          {/* Sidebar Column */}
          <SharedSidebarColumn>
            <Sidebar userName={userName} userEmail={user.email || ''} />
          </SharedSidebarColumn>

          {/* Main Content Column */}
          <SharedMainContent>
            <div className="flex-1 overflow-y-auto custom-scrollbar min-h-0">
              <div className="h-full flex flex-col max-w-[1920px] mx-auto w-full">
                {children}
              </div>
            </div>
          </SharedMainContent>
        </SharedLayoutGrid>
      </SidebarProvider>
    </DashboardPreferencesProvider>
  );
}
