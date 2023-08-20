// 2 functions 
// increase user api limit to use free tier
// checkapilimit to trigger the paid level
import { auth } from "@clerk/nextjs"; 
import prismadb from "../../lib/prismadb";
import { FREE_TIER_COUNT } from "./constants";

export const incApiLimit=async()=>{
    const {userId}=auth()
    if(!userId){
        return;
    }
    //finding that the user is ever registered 
    const userApiLimit=await prismadb.userApiLimit.findUnique({
        where:{
            userId:userId
        }
    })
    //if user already registered check the api limit
    //if not then create a new user with max free tier counts
    if(!userApiLimit){
        await prismadb.userApiLimit.create({
            data:{userId:userId,count:1}
        })
    }
    else{
        await prismadb.userApiLimit.update({
            where:{userId:userId},
            data:{count:userApiLimit.count+1}
        })
    }
}

export const checkApiLimit=async()=>{
    const {userId}=auth()
    if(!userId){
        return false;
    }
    const userApiLimit=await prismadb.userApiLimit.findUnique({
        where:{
            userId:userId
        }
    })
    if(!userApiLimit || userApiLimit.count < FREE_TIER_COUNT){
        return true;
    }
    else{
        return false;
    }
}


