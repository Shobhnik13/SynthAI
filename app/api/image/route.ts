import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import  { Configuration, OpenAIApi } from "openai" ;
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
export async function POST(req:Request){
    try{
        const {userId}=auth()
        const body=await req.json()
        const { prompt,amount=1,resolution="512x512" }=body
            // checking user presence -> auth required
            if(!userId){
                return new NextResponse('Unauthorized!' , {status:401})
            }
            // checking the key 
            if(!configuration.apiKey){
                return new NextResponse('OpenAI key not valid!',{status:500})
            }
            // cheking for prompt 
            if(!prompt){
                return new NextResponse('prompt is required',{status:400})
            }
            // cheking for amount 
            if(!amount){
                return new NextResponse('amount is required',{status:400})
            }// cheking for prompt 
            if(!resolution){
                return new NextResponse('resolution is required',{status:400})
            }

            // returning response 
            const res = await openai.createImage({
            prompt:prompt,
            // parseInt will take a string as a no and return an integer by using a radix parseInt(string,radix) ->parseint(amount,10)
            n:parseInt(amount,10),
            size:resolution,
            });
            return NextResponse.json(res.data.data)
    }catch(error){
        console.log('Image error!',error)
        return new NextResponse('Internal error',{status:500})
    }
}
