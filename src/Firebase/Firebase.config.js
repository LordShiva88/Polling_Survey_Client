import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY_API_KEY,
  authDomain: import.meta.env.VITE_APIKEY_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APIKEY_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APIKEY_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APIKEY_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APIKEY_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
