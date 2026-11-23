
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/app-sidebar"
import { DashboardSidebar } from "../components/DashboardSidebar";


const DashboardLayout = async ({
    children,
}: {
    children: React.ReactNode
}) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    const role = session?.user?.role || "seeker"

    return (
        <SidebarProvider>
            <DashboardSidebar role={role} />

            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}

export default DashboardLayout



