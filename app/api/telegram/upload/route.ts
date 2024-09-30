import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID; // Your chat ID

const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`;

// Function to upload image to Telegram
async function uploadImageToTelegram(imageBuffer, filename,user,folder) {
  const formData = new FormData();
  formData.append('chat_id', TELEGRAM_CHAT_ID);
  formData.append('document', new Blob([imageBuffer], { type: 'image/jpeg' }), filename);
  formData.append('caption', `${user.emailAddresses[0].emailAddress}  ${filename}`);
  const response = await fetch(TELEGRAM_API_URL, {
    method: 'POST',
    body: formData,
  });
const resp = await response.json();
  const newImage = prisma.image.create({data:{
    email: user.emailAddresses[0].emailAddress,
    fileId: resp.result.document.file_id,
    imageName : filename,
    folderid: folder
  }})
   

  return newImage
}

export async function POST(request) {
    const user = await currentUser()
    if(!user) return
  try {
    const formData = await request.formData();
    const file = formData.get('file'); // Retrieve the uploaded file from the formData
    const folder = formData.get('folder');
    const fileBuffer = Buffer.from(await file.arrayBuffer()); // Convert to buffer
    const filename = file.name;

    // Upload image to Telegram
    const uploadResponse = await uploadImageToTelegram(fileBuffer, filename,user,folder);

    if (!uploadResponse.fileId) {
      return NextResponse.json({ error: 'Failed to upload image to Telegram' }, { status: 500 });
    }

    // Return file_id to the user
  

    return NextResponse.json(uploadResponse);
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
