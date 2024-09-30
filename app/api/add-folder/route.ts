import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req:any) {
    const user = await currentUser()
    const body = await req.json();
    const {name} = body
    console.log(req.body)
if(!user)  return NextResponse.json({ error: 'Authentication Required' }, { status: 500 });
    
const newFolder = await prisma.folder.create({data:{
    name: name,
    email: user.emailAddresses[0].emailAddress

}})
return NextResponse.json(newFolder);
}