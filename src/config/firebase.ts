import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCA_cI20ik8H6khlykEHTpxlAXniDa6vPA",
  authDomain: "ancient-path-ethiopia.firebaseapp.com",
  projectId: "ancient-path-ethiopia",
  storageBucket: "ancient-path-ethiopia.firebasestorage.app",
  messagingSenderId: "845655581527",
  appId: "1:845655581527:web:1988158c022ac30ff8d412"
};

const app = initializeApp(firebaseConfig as any);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Centralized Cloudinary Configuration
export const cloudinaryConfig = {
  cloudName: "dw1ohipim",
  uploadPreset: "car_images"
};

// Connect to local emulator when running in development
if ((import.meta as any).env?.VITE_USE_FIREBASE_EMULATOR === 'true') {
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
}

export default app;
