import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req:any) {
    const user = await currentUser()
    const body = await req.json();
    const {img,folder} = body
    console.log(req.body)
if(!user)  return NextResponse.json({ error: 'Authentication Required' }, { status: 500 });
    
const newImage = await prisma.image.update({
    where:{
email:user.emailAddresses[0].emailAddress,
id:img

    },
    data:{
 folderid: folder

}})
return NextResponse.json(newImage);
}