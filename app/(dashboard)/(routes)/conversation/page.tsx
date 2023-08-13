'use client'
import { MessageSquare } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../../../../components/ui/form"
import Heading from "../../../../components/heading"
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { formSchema } from "./conversation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../../../../components/ui/input"
import { Button } from "../../../../components/ui/button"
const ConversationPage = () => {
 
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  })

  const isLoading=form.formState.isSubmitting

  const onSubmit=async(values: z.infer<typeof formSchema>)=>{
    console.log(values)
  }
  return (
    <div>
        <Heading
        title='Conversation'
        description='Our most advanced conversation model'
        icon={MessageSquare}
        iconColor='text-violet-500'
        bgColor='bg-violet-500/10'/>
        
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
                          <Input placeholder="Enter a prompt" disabled={isLoading} className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" {...field} />
                        </FormControl>
                  </FormItem>
                )}/>
                <Button type="submit" className="col-span-12 md:col-span-2 w-full" disabled={isLoading}>{isLoading?'Generating...':'Generate'}</Button>
              </form>
            </Form>
          </div>
          <div className="space-y-4 mt-4 text-green-600">Generated content:</div>
        </div>
    </div>
  )
}

export default ConversationPage