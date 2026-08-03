// import fs from "fs";
// import { initializeApp, cert } from "firebase-admin/app";
// import { getAuth } from "firebase-admin/auth";

// const serviceAccount = JSON.parse(
//   fs.readFileSync(new URL("./serviceAccountKey.json", import.meta.url), "utf8"),
// );

// const app = initializeApp({
//   credential: cert(serviceAccount),
// });

// export const auth = getAuth(app);


import dotenv from "dotenv";
dotenv.config();

import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
};

const app = initializeApp({
  credential: cert(serviceAccount),
});

export const auth = getAuth(app);

