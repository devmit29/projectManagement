import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";
import { Navbar } from "@/components/navbar";
import { SideBar } from "@/components/sidebar";
import { CreateProjectModal } from "@/features/projects/components/create-project-modal";

interface DashboardLayoutProps {
    children?: React.ReactNode
}
const DashboardLayput = ({ children }: DashboardLayoutProps) => {
    return (
        <div className="min-h-screen">
            <CreateWorkspaceModal />
            <CreateProjectModal/>
            <div className="flex h-full w-full">
                <div className="fixed top-0 left-0 hidden lg:block lf:w-[264px] h-full overflow-y-auto">
                    <SideBar/>
                </div>
                <div className="lg:pl-[264px] w-full">
                    <div className="mx-auto max-w-screen-2xl h-full">
                        <Navbar/>
                        <main className="h-full py-8 px-6 flex flex-col">
                        {children}
                        </main>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default DashboardLayput;