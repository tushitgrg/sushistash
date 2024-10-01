import prisma from '@/lib/prisma';

import { NextResponse } from 'next/server';
import CryptoJS from 'crypto-js'
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID; // Your chat ID

const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`;

const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*'); 
  headers.set('Access-Control-Allow-Methods', 'POST'); 
  headers.set('Access-Control-Allow-Headers', 'Content-Type');

// Function to upload image to Telegram
async function uploadImageToTelegram(imageBuffer, filename,useremail) {
  const formData = new FormData();
  formData.append('chat_id', TELEGRAM_CHAT_ID);
  formData.append('document', new Blob([imageBuffer], { type: 'image/jpeg' }), `${Math.floor(Math.random() *10000)}${filename}`);
  formData.append('caption', `${useremail}  ${filename}`);
  const response = await fetch(TELEGRAM_API_URL, {
    method: 'POST',
    body: formData,
  });
const resp = await response.json();
  const newImage = prisma.image.create({data:{
    email: useremail,
    fileId: resp.result.document.file_id,
    imageName : filename,
   
  }})
   

  return newImage
}

export async function POST(request) {
    
  try {
    const formData = await request.formData();
    const file = formData.get('file'); // Retrieve the uploaded file from the formData
    // const folder = formData.get('folder');
    const Apikey = formData.get('api')
    if(!Apikey)  NextResponse.json({ error: 'Api Key Required' }, { status: 500 });
    const useremail = CryptoJS.AES.decrypt(Apikey, process.env.AES_SECRET_KEY).toString(CryptoJS.enc.Utf8);
    if(!useremail) NextResponse.json({ error: 'Api Key Required' }, { status: 500 });
    const fileBuffer = Buffer.from(await file.arrayBuffer()); // Convert to buffer
    const filename = file.name;

    // Upload image to Telegram
    const uploadResponse = await uploadImageToTelegram(fileBuffer, filename,useremail);

    if (!uploadResponse.fileId) {
      return NextResponse.json({ error: 'Failed to upload image to Telegram' }, { status: 500, headers:headers });
    }

    // Return file_id to the user
  

    return NextResponse.json({id:uploadResponse.fileId}, {headers:headers});
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 , headers:headers});
  }
}
