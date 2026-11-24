
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/app-sidebar"
import { DashboardSidebar } from "../components/DashboardSidebar";
import { Toaster } from "@/components/ui/toast"


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
        <SidebarProvider className="bg-[#131314]">
            <DashboardSidebar role={role} />

            <SidebarInset className="bg-[#131314] min-h-svh">
                <SidebarTrigger />
                {children}
            </SidebarInset>
            <Toaster />
        </SidebarProvider>
    )
}

export default DashboardLayout



