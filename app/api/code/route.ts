type ChatCompletionRequestMessage = {
    role: string;
    content: string;
  };
  
import { auth } from "@clerk/nextjs";
import {NextResponse} from "next/server"
import OpenAI from "openai";
import ChatCompletionRequestMessage from "openai"

import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";


const openai = new OpenAI({
    apiKey : process.env.OPENAI_API_KEY
});

const instructionMessage : ChatCompletionRequestMessage = {
    role : "system",
    content : "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations"
}

export async function POST (req:Request){
    try {
        const {userId } = auth();
        const body = await req.json();
        const {messages} = body;

        if(!userId){
            return new NextResponse("Unauthorised" , {status : 401});
        }

        if(!openai.apiKey){
            return new NextResponse("OpenAi key Not configured" , {status : 500});
        }


        if(!messages){
            return new NextResponse("Messages are required" , {status : 400}); 
        }

        const freeTrial = await checkApiLimit();

        const isPro = await checkSubscription();

        if(!freeTrial && !isPro){
            return new NextResponse("Free trail has been expired." , {
                status : 403
            })
        }


        const response = await openai.chat.completions.create({
            model : "gpt-3.5-turbo",
            messages : [instructionMessage , ...messages]
        })

        if(!isPro){
            await increaseApiLimit();
        }

        return NextResponse.json(response.choices[0].message );
    } catch (error) {
        console.log("[CODE_ERROR]" , error);
        return new NextResponse("Internal Error" , {status:500});
    }

}