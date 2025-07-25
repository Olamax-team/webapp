// firebase.ts
import { initializeApp, FirebaseApp } from "firebase/app";
import { getMessaging, Messaging } from "firebase/messaging";

// Define the shape of your Firebase config using an interface
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

// Initialize the Firebase config from environment variables
const firebaseConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY as string,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_APP_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_APP_APP_ID as string,
  measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID as string,
};

// Initialize Firebase App
const app: FirebaseApp = initializeApp(firebaseConfig);

// Export Messaging instance
export const messaging: Messaging = getMessaging(app);
