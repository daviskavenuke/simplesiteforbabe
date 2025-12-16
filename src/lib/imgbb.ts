import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

const IMGBB_API_KEY = '3de69564f3a8ba9c157957d17395d489';

/**
 * Client-side image upload to ImgBB
 * @param file - The file object from input
 * @returns Promise with the image URL from ImgBB
 */
export async function uploadImageToImgBB(file: File): Promise<string> {
  const form = new (typeof window !== 'undefined' ? FormData : FormData)();
  form.append('image', file);
  form.append('key', IMGBB_API_KEY);

  try {
    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: form as any,
    });

    if (!response.ok) {
      throw new Error(`ImgBB upload failed: ${response.statusText}`);
    }

    const data = (await response.json()) as any;

    if (data.success) {
      return data.data.url;
    } else {
      throw new Error('ImgBB upload failed: API returned success=false');
    }
  } catch (error) {
    console.error('ImgBB upload error:', error);
    throw error;
  }
}

/**
 * Upload image to ImgBB and return the URL (server-side)
 * @param fileBuffer - The file buffer from the form
 * @param fileName - The name of the file
 * @returns Promise with the image URL from ImgBB
 */
export async function uploadToImgBB(
  fileBuffer: Buffer,
  fileName: string
): Promise<string> {
  const apiKey = IMGBB_API_KEY;

  if (!apiKey) {
    throw new Error('ImgBB API key is not configured');
  }

  const form = new FormData();
  form.append('image', fileBuffer, fileName);
  form.append('key', apiKey);

  try {
    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: form as any,
      headers: form.getHeaders() as any,
    });

    if (!response.ok) {
      throw new Error(`ImgBB upload failed: ${response.statusText}`);
    }

    const data = (await response.json()) as any;

    if (data.success) {
      return data.data.url;
    } else {
      throw new Error('ImgBB upload failed: API returned success=false');
    }
  } catch (error) {
    console.error('ImgBB upload error:', error);
    throw error;
  }
}

/**
 * Validate image file
 * @param fileBuffer - The file buffer
 * @param fileName - The file name
 * @returns true if valid, throws error if invalid
 */
export function validateImageFile(fileBuffer: Buffer, fileName: string): boolean {
  const maxSize = 32 * 1024 * 1024; // 32MB limit
  const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

  const ext = path.extname(fileName).toLowerCase();

  if (!validExtensions.includes(ext)) {
    throw new Error(`Invalid file type. Allowed: ${validExtensions.join(', ')}`);
  }

  if (fileBuffer.length > maxSize) {
    throw new Error(`File size exceeds ${maxSize / 1024 / 1024}MB limit`);
  }

  return true;
}
