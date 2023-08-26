'use client'
import { Download, ImageIcon }  from "lucide-react"

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
import { Card, CardFooter } from "../../../../components/ui/card"
import Image from "next/image"
import { useProModal } from "../../../../hooks/pro-modal"
import {toast} from 'react-hot-toast'

const ImagePage = () => {
  const proModalStates=useProModal()
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
      // every time we complete a request to generate the response of an x prompt we need to delete that resonse/links from the array to proceed wit th next request  
      //if we do not do this then at next request we will be generating the another images from prev requests as well
      //so emptying the image array before proceeding with every other new Request
      setImages([])
      // console.log(values)
      const res=await axios.post('/api/image',values)
      // console.log(res.data);
      const links=res.data.map((image:{url:string})=>image.url)
      setImages(links)
      form.reset()
    }catch(error: any){
      if(error?.response?.status==403)
      {
        proModalStates.onOpen()
      }
      else{
        toast.error('Something went wrong!')
      }
    }finally{
      router.refresh()
    }
  }
  return (
    <div>
        <Heading
        title='Image'
        description='Our most advanced image generation model'
        icon={ImageIcon}
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
                  <LoaderComp purpose='images' instruction=""/>
              </div>
            )}
            {images.length === 0 && !isLoading && (
              <div><Empty label="No images generated yet!"/></div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
              {images.map((item)=>(
                <Card
                key={item}
                className="rounded-lg overflow-hidden">
                    <div className="relarive aspect-square">
                      <Image src={item} width={500} height={500} alt="image"/>
                    </div>
                    <CardFooter className="p-2">
                      <Button variant="secondary" className="w-full" onClick={()=>window.open(item)} >
                        <Download className="h-4 w-4 mr-2"/>
                      </Button>
                    </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
    </div>
  )
}

export default ImagePage