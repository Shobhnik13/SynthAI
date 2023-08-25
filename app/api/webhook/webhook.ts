import {headers} from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '../../../lib/stripe'
import prismadb from '../../../lib/prismadb'

export async function POST(req:Request){
    // getting the body which will further be used for webhook signature verification  and construction of event 
    const body=await req.text()
    //getting the signature that stripe sent for webhook verification
    const signature=headers().get('Stripe-signature') as string
    //getting the event from stripe
    let event : Stripe.Event
    try{
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
          );

    }catch(error:any){
        // console.log(`⚠️Webhook signature verification failed.`, err.message);
        return new NextResponse(`⚠️Webhook error:${error.message}`,{status:400})
    }

    //now this webhook will give a event object
    const session=event.data.object as Stripe.Checkout.Session
    //now using this event data object we will filter out the retrive process and the type of event we are triggering

    //case1- if the user is newly to pro plan so we need to provide a checkout page and payment success

    if(event.type ==='checkout.session.completed'){
        //retrive the current subscription of the user
        const subscription=await stripe.subscriptions.retrieve(
            session.subscription as string
        )
        //now if the session metadata doesnt exist means userId
        //so we can not subscribe
        if(!session?.metadata?.userId){
            return new NextResponse('user id is required!',{status:400})
        }
        //now if metadata exists
        //so we just cretate the user subscription in the database
        //create the user as this user will be a new user in pro plan
        await prismadb.userSubscription.create({
          data:{
            userId:session?.metadata?.userId,
            stripeSubscriptionId:subscription.id,
            stripeCustomerId:subscription.customer as string,
            stripePriceId:subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd:new Date(
                subscription.current_period_end*1000
            )
          }  
        })
    }

    // case2-user already subscribed he just wanted to renew/update the subscription
    if(event.type === 'invoice.payment_succeeded'){
        const subscription=await stripe.subscriptions.retrieve(
            session.subscription as string
        )

        await prismadb.userSubscription.update({
        where:{
            stripeSubscriptionId:subscription.id,
        },
        data:{
            stripePriceId:subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd:new Date(
                subscription.current_period_end*1000
            ),
        }
        })
    }
    //this returning is very important to keep the webhooks away from any mess
    //just return null and a status ok(200)
    return new NextResponse(null,{status:200})
} 