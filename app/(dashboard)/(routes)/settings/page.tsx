import { SettingsIcon } from "lucide-react"
import Heading from "../../../../components/heading"
import { checkSubs } from "../../../../lib/subscription"
import SubsButton from "../../../../components/subs-button"

const SettingsPage = async() => {
  const isPro=await checkSubs()
  return (
    <div>
      <Heading
      title="Settings"
      description="Manage account settings"
      icon={SettingsIcon}
      iconColor="text-gray-700"
      bgColor="bg-gray-700/10"/>
      <div className="px-4 lg:px-8 space-y-4">
        {
          isPro?(
            <div className="text-sm text-muted-foreground">
              You are currently on a <span className="text-transparent bg-clip-text bg-gradient-to-r font-bold text-md from-indigo-600 via-violet-500 to-pink-600  p-1 rounded-lg">SynthAI-PRO</span>plan!
            </div>
          ):(
            <div className="text-sm text-muted-foreground">
              You are currently on a <span className="text-transparent bg-clip-text bg-gradient-to-r font-bold text-md from-red-600 to-red-500 p-1 rounded-lg">SynthAI-FREE</span>plan!
            </div>
          )
        }
        <SubsButton isPro={isPro}/>
      </div>
    </div>
  )
}

export default SettingsPage