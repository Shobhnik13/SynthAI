import { auth } from "@clerk/nextjs"
import prismadb from "./prismadb";

const DAY_IN_MS=86_400_400
export const checkSubs=async()=>{
    const {userId}=auth()
    if(!userId)return false;

    // check if user is already subscriberd 
    const userSub=await prismadb.userSubscription.findUnique({
        where:{
            userId:userId,
        },
        select:{
            stripeSubscriptionId:true,
            stripeCurrentPeriodEnd:true,
            stripeCustomerId:true,
            stripePriceId:true,
        }
    })

    // if the user is not subscribed
    if(!userSub){
        return false
    }    
    
    //check the subscrbed user has a valid end date or not
    const isValid=userSub.stripePriceId && userSub.stripeCurrentPeriodEnd?.getTime()!+DAY_IN_MS > Date.now()
    return !!isValid
}