import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../config/firebase';

export async function uploadImage(file: File, path: string): Promise<string> {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

export async function deleteImage(url: string): Promise<void> {
  try {
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
  } catch (err) {
    console.warn('Failed to delete image from storage:', err);
  }
}

export function getFilePathFromUrl(url: string): string | null {
  if (!url || !url.includes('firebasestorage.googleapis.com')) return null;
  try {
    const urlObj = new URL(url);
    const path = urlObj.pathname.split('/o/')[1];
    return path ? decodeURIComponent(path) : null;
  } catch {
    return null;
  }
}
