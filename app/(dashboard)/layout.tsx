import Navbar from "../../components/navbar"
import Sidebar from "../../components/sidebar"

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
        // contains the page 
        <div className="h-full relative">

            {/* side bar only visible in laps initially -> comp1 of page  */}
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed  md:inset-y-0 z-[99] bg-gray-900">
                <Sidebar/>
            </div>
            {/* content far from side bar -> comp 2 of page  */}
            <main className="md:pl-72">
               <Navbar/>
               {/* these children are the routes / pages that are rendering in the (routes) file  */}
               {children}
            </main>
        </div>
    )
  }