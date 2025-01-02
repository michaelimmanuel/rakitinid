"use client";

import { Cpu, HardDrive, Monitor, Box, Edit, Fan, Mouse } from "lucide-react"; // Example icons
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { title } from "process";

// Sidebar data with groups and items
const sidebarData = {
  database: [
    { title: "Processor", url: "/admin/database/processor", icon: Cpu },
    { title: "Motherboard", url: "/admin/database/motherboard", icon: Monitor },
    { title: "RAM", url: "/admin/database/ram", icon: HardDrive },
    { title: "GPU", url: "/admin/database/gpu", icon: Monitor },
    { title: "Storage", url: "/admin/database/storage", icon: Box },
    { title: "PSU", url: "/admin/database/psu", icon: HardDrive },
    { title: "Casing", url: "/admin/database/casing", icon: Monitor },
    { title: "Fan", url: "/admin/database/fan", icon: Fan },
    { title: "Accessories", url: "/admin/database/accessories", icon: Mouse },
    { title: "Cooler", url: "/admin/database/cooler", icon: Fan },
  ],
  Builds: [
    { title: "View Builds", url: "/admin/builds", icon: Box },
    { title: "Create Build", url: "/admin/builds/create", icon: Edit },
    { title: "Create Service", url: "/admin/service", icon: Edit }, 
  ],
  Content : [
    { title: "Edit Prebuilt Section", url: "/admin/prebuilt", icon: Edit },
    {title: "Edit Banner Section", url: "/admin/banner", icon: Edit},
  ],
  Finance : [
    { title: "View Invoices", url: "/admin/invoices", icon: Box },
  ],
};

export function AppSidebar() {
  const router = useRouter();

  return (
    <Sidebar>
      <SidebarContent>
        {Object.entries(sidebarData).map(([groupName, items]) => (
          <Collapsible key={groupName} defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="flex items-center w-full">
                  {groupName}
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <a
                            href={item.url}
                            className="flex items-center space-x-2"
                          >
                            <item.icon className="w-4 h-4" />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
