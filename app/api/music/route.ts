import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { checkApiLimit, incApiLimit } from "../../constants/api-limit";
import { checkSubs } from "../../../lib/subscription";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req:Request){
    try{
        const {userId}=auth()
        const body=await req.json()
        const { prompt }=body
        const isPro=await checkSubs()
            // checking user presence -> auth required
            if(!userId){
                return new NextResponse('Unauthorized!' , {status:401})
            }
           
            // cheking for prompt 
            if(!prompt){
                return new NextResponse('prompt is required',{status:400})
            }
            const freeTrial=await checkApiLimit()
            if(!freeTrial && !isPro){
                return new NextResponse('Your free trial is expired!',{status:403})
            }
            // returning response
            
            const res = await replicate.run(
              "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
              {
                input: {
                  prompt_a: prompt
                }
              }
              );
              if(!isPro){
                await incApiLimit()
              }
              return NextResponse.json(res)
    }catch(error){
        console.log('Music error!',error)
        return new NextResponse('Internal error',{status:500})
    }
}
