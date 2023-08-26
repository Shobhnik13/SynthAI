'use client'
import { Code, Loader } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../../../../components/ui/form"
import Heading from "../../../../components/heading"
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { formSchema } from "./code"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "../../../../lib/utils"
import { Input } from "../../../../components/ui/input"
import axios from 'axios'
import { Button } from "../../../../components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ChatCompletionRequestMessage } from "openai"
import Empty from "../../../../components/ui/empty"
import LoaderComp from "../../../../components/ui/loadercomp"
import UserAva from "../../../../components/ui/user-ava"
import BotAva from "../../../../components/ui/bot-ava"
import ReactMarkdown from 'react-markdown'
import { useProModal } from "../../../../hooks/pro-modal"
import {toast} from 'react-hot-toast'

const CodePage = () => {
  const proModalStates=useProModal()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  })

  const isLoading=form.formState.isSubmitting
  const router=useRouter()
  // messages -> Its an array that contains all the conversations bw user and system 
  const [messages,setMessages]=useState<ChatCompletionRequestMessage[]>([])
  const onSubmit=async(values: z.infer<typeof formSchema>)=>{
    try{
      // user message is also a type of ChatCompletionRequestMessage
      const userMessage:ChatCompletionRequestMessage={
        role:'user',
        content:values.prompt,
      }
      // creating a new messages array which will store the prev messages of the user as well as the new message generated/provided by the user  
      const newMessages=[...messages,userMessage]
      //api call
      const res=await axios.post('/api/code',{
        messages:newMessages,
      })
      //now after sending the newMessages to the backend
      //we got the response of the message sent by the user(prompt) 
      //include the current message/prompt for which data is generated and its res came from backend
      //and set into messages array
      setMessages((curr)=> [...curr,userMessage, res.data])
      //resetting the form
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
        title='Code'
        description='Our most advanced code generation model'
        icon={Code}
        iconColor='text-green-700'
        bgColor='bg-green-700/10'/>
        
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
                          <Input placeholder="Generate a code to merge linked list" disabled={isLoading} className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" {...field} />
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
                  <LoaderComp purpose='code' instruction=""/>
              </div>
            )}
            {messages.length === 0 && !isLoading && (
              <div><Empty label="No conversation started yet!"/></div>
            )}
            <div className="flex flex-col-reverse text-green-600 gap-y-4">
              {
                messages && messages.map((item)=>(
                 
                      <div 
                      key={item.content}
                      className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg",item.role==='user' ?'bg-white border border-black/10':'bg-muted')}>
                      {/* c1  */}
                      {item.role==='user'?<UserAva/>:<BotAva/>}
                      {/* c2  */}
                    <ReactMarkdown
                    components={{
                        pre:({node,...props})=>(
                            <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                                <pre {...props}/>
                            </div>
                        ),
                        code:({node,...props})=>(
                            <code className="bg-black/10 rounded-lg p-1" {...props}   />
                        )
                    }}
                    className="text-sm overflow-hidden leading-7">
                    {item.content || ""}
                    </ReactMarkdown> 
                      </div>
                  
                ))
              }
            </div>
          </div>
        </div>
    </div>
  )
}

export default CodePage