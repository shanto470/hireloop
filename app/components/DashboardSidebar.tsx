"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import type { LucideIcon } from "lucide-react"
import {
    BookmarkIcon,
    BriefcaseIcon,
    Building2Icon,
    ClipboardListIcon,
    CreditCardIcon,
    HomeIcon,
    LayoutDashboardIcon,
    PlusCircle,
    SearchIcon,
    SettingsIcon,
    UsersIcon,
    WalletIcon,
} from "lucide-react"
import Link from "next/link"

// TypeScript object for the menu items
type MenuItem = {
    id: string
    name: string
    url: string
    icon: LucideIcon
}

// Menu items for each role — per the HL 2.0/Sidebar component in Figma
const menuItemByRole: Record<string, MenuItem[]> = {
    seeker: [
        { id: "home", name: "Home", url: "/", icon: HomeIcon },
        { id: "seeker-dashboard", name: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboardIcon },
        { id: "seeker-jobs", name: "Jobs", url: "/dashboard/seeker/jobs", icon: SearchIcon },
        { id: "seeker-saved-jobs", name: "Saved Jobs", url: "/dashboard/seeker/saved", icon: BookmarkIcon },
        { id: "seeker-applications", name: "Applications", url: "/dashboard/seeker/applications", icon: ClipboardListIcon },
        { id: "seeker-billing", name: "Billing", url: "/dashboard/seeker/billing", icon: CreditCardIcon },
        { id: "seeker-settings", name: "Settings", url: "/dashboard/seeker/settings", icon: SettingsIcon },
    ],
    recruiter: [
        { id: "home", name: "Home", url: "/", icon: HomeIcon },
        { id: "recruiter-dashboard", name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboardIcon },
        { id: "recruiter-company", name: "Add Job", url: "/dashboard/recruiter/jobs/new", icon: PlusCircle },
        { id: "recruiter-jobs", name: "Manage Jobs", url: "/dashboard/recruiter/jobs", icon: BriefcaseIcon },
        { id: "recruiter-applications", name: "Applications", url: "/dashboard/recruiter/applications", icon: ClipboardListIcon },
        { id: "recruiter-settings", name: "Settings", url: "/dashboard/recruiter/settings", icon: SettingsIcon },
    ],
    admin: [
        { id: "home", name: "Home", url: "/", icon: HomeIcon },
        { id: "admin-dashboard", name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboardIcon },
        { id: "admin-users", name: "Users", url: "/dashboard/admin/users", icon: UsersIcon },
        { id: "admin-companies", name: "Companies", url: "/dashboard/admin/companies", icon: Building2Icon },
        { id: "admin-jobs", name: "Jobs", url: "/dashboard/admin/jobs", icon: BriefcaseIcon },
        { id: "admin-payments", name: "Payments", url: "/dashboard/admin/payments", icon: WalletIcon },
        { id: "admin-settings", name: "Settings", url: "/dashboard/admin/settings", icon: SettingsIcon },
    ],
}

type UserRole = "seeker" | "recruiter" | "admin"

export function DashboardSidebar({ role: serverRole }: { role?: string } = {}) {
    const { data: session } = useSession()

    const rawRole = session?.user?.role || serverRole || "seeker"

    const role = rawRole.trim().toLowerCase() as UserRole

    const menuItems = menuItemByRole[role] || menuItemByRole.seeker
    console.log("Session:", session)
    console.log("User Role:", session?.user?.role)
    console.log("Final Role:", role)

    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {menuItems.map((item) => (
                            <SidebarMenuItem key={item.id}>
                                <SidebarMenuButton render={<Link href={item.url} />}>
                                    <item.icon />
                                    <span>{item.name}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
