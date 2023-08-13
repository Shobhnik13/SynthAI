'use client'
import { MessageSquare } from "lucide-react"
import Heading from "../../../../components/heading"
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { formSchema } from "./conversation"
import { zodResolver } from "@hookform/resolvers/zod"
const ConversationPage = () => {
 
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  })
  return (
    <div>
        <Heading
        title='Conversation'
        description='Our most advanced conversation model'
        icon={MessageSquare}
        iconColor='text-violet-500'
        bgColor='bg-violet-500/10'/>
        
        {/* form  */}

        <div className="px-4 lg:px-8">

        </div>
    </div>
  )
}

export default ConversationPage