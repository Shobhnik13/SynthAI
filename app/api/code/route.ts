import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import  { Configuration, OpenAIApi } from "openai" ;
import { checkApiLimit, incApiLimit } from "../../constants/api-limit";
import { checkSubs } from "../../../lib/subscription";
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(req:Request){
    try{
        const {userId}=auth()
        const body=await req.json()
        const isPro=await checkSubs()
        const { messages }=body
            // checking user presence -> auth required
            if(!userId){
                return new NextResponse('Unauthorized!' , {status:401})
            }
            // checking the key 
            if(!configuration.apiKey){
                return new NextResponse('OpenAI key not valid!',{status:500})
            }
            //cheecking messages are coming from frontend or not if not then it is required
            if(!messages){
                    return new NextResponse('Messages are required!',{status:400})
            }
            const freeTrial=await checkApiLimit()
            if(!freeTrial && !isPro){
                return new NextResponse('Your free trial is expired!',{status:403})
            }
            // returning response 
            const res = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages:[{"role":"system", "content":"You are a code generator.You must answer only in markdown code snippets.Use code comments for explaining code."},...messages]
            });
            if(!isPro){
                await incApiLimit()
            }
            return NextResponse.json(res.data.choices[0].message)
    }catch(error){
        console.log('Code error!',error)
        return new NextResponse('Internal error',{status:500})
    }
}
