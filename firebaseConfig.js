// firebaseConfig.js
import firebase from "firebase/app"
import 'firebase/firestore'

import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";


// Firebase 구성 정보
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);
if (isSupported()) {
  const analytics = getAnalytics(app);
  // Firebase Analytics 사용
}

export default app;