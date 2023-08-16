import * as z from "zod"

export const formSchema = z.object({
    //    1
    prompt: z.string().min(1,{
        message:'Image Prompt is required'
    }),

    // amount of images to be generated 
    // 2
    amount:z.string().min(1),
    // resolution 
    // 3
    resolution:z.string().min(1)
  })



  //no of images to choose -> will use to map in frontend
  export const amountOpts=[
    {
        value:'1',
        label:'1 photo',
    },
    {
        value:'2',
        label:'2 photo',
    },
    {
        value:'3',
        label:'3 photo',
    },
    {
        value:'4',
        label:'4 photo',
    },
    {
        value:'5',
        label:'5 photo',
    },

  ]


  
  //resolution of images to choose -> will use to map in frontend
  export const resoOpts=[
    {
        value:'256x256',
        label:'256x256',
    },
    {
        value:'512x512',
        label:'512x512',
    },
    {
        value:'1024x1024',
        label:'1024x1024',
    },
  ]