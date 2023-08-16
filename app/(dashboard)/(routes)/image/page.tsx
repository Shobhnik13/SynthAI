'use client'
import { Image } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../../../../components/ui/form"
import Heading from "../../../../components/heading"
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { amountOpts, formSchema, resoOpts } from "./image"
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
import { Select, SelectContent, SelectItem, SelectTrigger } from "../../../../components/ui/select"
import { SelectValue } from "@radix-ui/react-select"

const ImagePage = () => {
 
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount:"1",
      resolution:'512x512'
    },
  })
  // images will be a array of string ->  usestate<string[]>([])
  const [images,setImages]=useState<string[]>([])
  const isLoading=form.formState.isSubmitting
  const router=useRouter()
  const onSubmit=async(values: z.infer<typeof formSchema>)=>{
    try{
      setImages([])
      console.log(values)
    //   const res=await axios.post('/api/image',values)
    //   const links=res.data.map((image:{url:string})=>image.url)
    //   setImages(links)
    //  form.reset()
    }catch(error: any){
        console.log(error)
    }finally{
        router.refresh()
    }
  }
  return (
    <div>
        <Heading
        title='Image'
        description='Our most advanced image generation model'
        icon={Image}
        iconColor='text-pink-700'
        bgColor='bg-pink-700/10'/>
        
        {/* form  */}

        {/* main div ->form + message content */}
        <div className="px-4 lg:px-8">
          {/* form div  */}
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">

                {/* prompt  */}
                <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                        <FormControl >
                          <Input placeholder="Convert your prompt into an image" disabled={isLoading} className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" {...field} />
                        </FormControl>
                  </FormItem>
                )}/>

                  {/* no of images  */}
                <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                       <Select
                       disabled={isLoading}
                       value={field.value}
                       onValueChange={field.onChange}
                       defaultValue={field.value}>
                          <FormControl>
                              <SelectTrigger>
                                <SelectValue defaultValue={field.value}/>
                              </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {amountOpts.map((item)=>(
                                <SelectItem
                                key={item.value}
                                value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                          </SelectContent>
                       </Select>
                  </FormItem>
                )}/>

                  {/* reso  */}
                  <FormField
                control={form.control}
                name="resolution"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                       <Select
                       disabled={isLoading}
                       value={field.value}
                       onValueChange={field.onChange}
                       defaultValue={field.value}>
                          <FormControl>
                              <SelectTrigger>
                                <SelectValue defaultValue={field.value}/>
                              </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {resoOpts.map((item)=>(
                                <SelectItem
                                key={item.value}
                                value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                          </SelectContent>
                       </Select>
                  </FormItem>
                )}/>

                <Button type="submit" className="col-span-12 md:col-span-2 w-full" disabled={isLoading}>{isLoading?'Generating...':'Generate'}</Button>
              </form>
            </Form>
          </div>
          <div className="space-y-4 mt-4 ">
            {isLoading && (
              <div className="p-20 ">
                  <LoaderComp purpose='images'/>
              </div>
            )}
            {images.length === 0 && !isLoading && (
              <div><Empty label="No conversation started yet!"/></div>
            )}
            <div>
              Images section
            </div>
          </div>
        </div>
    </div>
  )
}

export default ImagePage