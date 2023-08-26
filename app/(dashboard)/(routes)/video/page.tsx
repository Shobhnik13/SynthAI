'use client'
import { Loader, MessageSquare, Music2Icon, MusicIcon, VideoIcon } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../../../../components/ui/form"
import Heading from "../../../../components/heading"
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { formSchema } from "./video"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../../../../components/ui/input"
import axios from 'axios'
import { Button } from "../../../../components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ChatCompletionRequestMessage } from "openai"
import Empty from "../../../../components/ui/empty"
import LoaderComp from "../../../../components/ui/loadercomp"
import { cn } from "../../../../lib/utils"
import UserAva from "../../../../components/ui/user-ava"
import BotAva from "../../../../components/ui/bot-ava"
import { useProModal } from "../../../../hooks/pro-modal"
import {toast} from 'react-hot-toast'

const MusicPage = () => {
  const proModalStates=useProModal()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  })

  const isLoading=form.formState.isSubmitting
  const router=useRouter()
  // video -> Its a string(link) which is currently undefined/empty
  const [video,setVideo]=useState<string>()
  const onSubmit=async(values: z.infer<typeof formSchema>)=>{
    try{
        setVideo(undefined)
      //api call
      const res=await axios.post('/api/video',values)
      setVideo(res.data[0])
      form.reset()
    }catch(error: any){
      if(error?.response?.status==403){
        proModalStates.onOpen()
      }
      else{
        toast.error('Something went wrong!')
      }
        // console.log(error)
    }finally{
        router.refresh()
    }
  }
  return (
    <div>
        <Heading
        title='Video'
        description='Our most advanced video generation model'
        icon={VideoIcon}
        iconColor='text-orange-700'
        bgColor='bg-orange-700/10'/>
        
        {/* form  */}

        {/* main div ->form + message content */}
        <div className="px-4 lg:px-8">
          {/* form div  */}
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
                <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                        <FormControl >
                          <Input placeholder="Convert your prompt into video" disabled={isLoading} className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" {...field} />
                        </FormControl>
                  </FormItem>
                )}/>
                <Button type="submit" className="col-span-12 md:col-span-2 w-full" disabled={isLoading}>{isLoading?'Generating...':'Generate'}</Button>
              </form>
            </Form>
          </div>
          <div className="space-y-4 mt-4 ">
            {isLoading && (
              <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                  <LoaderComp purpose='video' instruction='It may take upto 3-5 minutes!'/>
              </div>
            )}
            {!video && !isLoading && (
              <div><Empty label="No music started yet!"/></div>
            )}
           <div>
                {video && <video controls className="w-full mt-8 aspect-video rounded-lg border bg-black">
                    <source src={video}/>
                </video>}
           </div>
          </div>
        </div>
    </div>
  )
}

export default MusicPage