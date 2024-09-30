import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getFile`;

async function getFileFromTelegram(file_id) {
  const response = await fetch(`${TELEGRAM_API_URL}?file_id=${file_id}`);
  const data = await response.json();

  if (data.ok) {
    const filePath = data.result.file_path;
    const fileUrl = `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${filePath}`;
    return fileUrl;
  } else {
    throw new Error('Failed to retrieve file from Telegram');
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { file_id } = body;

    const fileUrl = await getFileFromTelegram(file_id);

    return NextResponse.json({ fileUrl });
  } catch (error) {
    console.error('Error retrieving image:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
