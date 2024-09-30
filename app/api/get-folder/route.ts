import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req:any) {
 
    const body = await req.json()
    const {id} = body
if(!id)  return NextResponse.json({ error: 'folder id required' }, { status: 500 });
    
const images = await prisma.image.findMany({where:{

    folderid: id
}})

const folder = await prisma.folder.findUnique({where:{
   id:id
}})

return NextResponse.json({images,folder});
}