import Navbar from "../../components/navbar"
import Sidebar from "../../components/sidebar"
import { checkSubs } from "../../lib/subscription"
import { getApiLimit } from "../constants/api-limit"

 const DashboardLayout=async({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) =>{
    const apiLimitCount=await getApiLimit()
    const isPro=await checkSubs()
    return (
        // contains the page 
        <div className="h-full relative">

            {/* side bar only visible in laps initially -> comp1 of page  */}
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed  md:inset-y-0  bg-gray-900">
                <Sidebar apiLimitCount={apiLimitCount} isPro={isPro}/>
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
  export default DashboardLayout