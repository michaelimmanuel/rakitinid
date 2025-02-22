import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from '@vercel/analytics/next';

export const fetchCache = 'auto'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full p-10">
        <SidebarTrigger />
        {children}
        
      </main>
    </SidebarProvider>
  )
}