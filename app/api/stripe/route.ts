import { NextResponse } from "next/server";
import { absoluteUrl } from "../../../lib/utils";
import { auth, currentUser } from "@clerk/nextjs";
import prismadb from "../../../lib/prismadb";
import { stripe } from "../../../lib/stripe";
// import { metadata } from "../../layout";

const settingsUrl=absoluteUrl('/settings')
export async function GET(){
    try{
        const {userId}=auth()
        const user=await currentUser()
        if(!userId || !user){
            return new NextResponse('Not authorized!',{status:401})
        }
        //chek if the user already subscribed
        const userSubs=await prismadb.userSubscription.findUnique({
            where:{
                userId
            }
        })
        //user already subs then show the billing page and cancel
        if(userSubs && userSubs.stripeCustomerId){
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubs.stripeCustomerId,
                return_url: settingsUrl,
              });
              return new NextResponse(JSON.stringify({url:stripeSession.url}))
        }
        //now if the usersubs do not exist so we need a checkout page instead of billing page
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types: ['card'],
            mode: 'subscription',
            billing_address_collection:'auto',
            customer_email:user.emailAddresses[0].emailAddress,
            line_items: [{
                price_data: {
                  currency: 'inr',
                  product_data:{
                    name:'SynthAI pro',
                    description:'Unlimited AI generations'
                  },
                unit_amount: 39000,
                recurring:{
                    interval:'month'
                }
              },
              quantity: 1,
            }],
            // this metadata is very important bcoz it is the data like when the payment goes successfull then where this payment came from 
            //which user is responsible for this payment , so we will identify the user by metadata:{userId} 
            //so only this user which has paid the amount will get the subscription
            //if metadata is not there then we would be unable to identify that where this payment came from and whom do we need to provide a subscription

            metadata:{
                userId,
            },
          });
          return new NextResponse(JSON.stringify({url:stripeSession.url}))
    }
    catch(error){
        console.log('[STRIPE_ERROR]',error);
        return new NextResponse('Internal error',{status:500})
    }
}