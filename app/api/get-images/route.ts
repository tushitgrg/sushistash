import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import CryptoJS from 'crypto-js'
export async function POST(req:any) {
    const user = await currentUser()
if(!user)  return NextResponse.json({ error: 'Authentication Required' }, { status: 500 });
    
const images = await prisma.image.findMany({where:{
    email:user.emailAddresses[0].emailAddress
}, orderBy:[{createdAt:'desc'}]})

const folders = await prisma.folder.findMany({where:{
    email:user.emailAddresses[0].emailAddress
}})

const Apikey = CryptoJS.AES.encrypt(user.emailAddresses[0].emailAddress, process.env.AES_SECRET_KEY).toString();

return NextResponse.json({images,folders,Apikey});
}