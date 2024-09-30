
import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getFile`;

// Fetch file path from Telegram
async function getFileFromTelegram(file_id) {
  const response = await fetch(`${TELEGRAM_API_URL}?file_id=${file_id}`);
  const data = await response.json();

  if (data.ok) {
    return data.result.file_path;
  } else {
    throw new Error('Failed to retrieve file from Telegram');
  }
}

export async function GET(req,{params}) {
  try {
   
    const  { file_id }  = params;

    const filePath = await getFileFromTelegram(file_id);

    // Telegram file URL
    const fileUrl = `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${filePath}`;

    // Fetch the file from Telegram
    const fileResponse = await fetch(fileUrl);
    const fileBuffer = await fileResponse.arrayBuffer();

    // Return the file as a response, not the URL
    return new Response(Buffer.from(fileBuffer), {
      headers: {
        'Content-Type': 'image/jpeg', // Adjust this based on the file type
        'Content-Disposition': 'inline', // Or 'attachment' for forced download
      },
    });
  } catch (error) {
    console.error('Error retrieving image:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
