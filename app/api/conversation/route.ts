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

            // returning response 
            const res = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages,
            });
            return NextResponse.json(res.data.choices[0].message)
    }catch(error){
        console.log('Conversation error!',error)
        return new NextResponse('Internal error',{status:500})
    }
}
