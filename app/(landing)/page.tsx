import Link from "next/link"
import { Button } from "../../components/ui/button"
import LandingNavbar from "../../components/landing-navbar"
import LandingHero from "../../components/landing-hero"
import LandingContent from "../../components/landing-content"
import { ArrowBigUp } from "lucide-react"
import LandingArrow from "../../components/landing-arrow"
const page = () => {
  return (
   <div className="h-full">
      <LandingNavbar/>
      <LandingHero/>
      <LandingContent/>
      <LandingArrow/>
   </div>
  )
}

export default page