import {APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import {Main} from './presets/main';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {browserLocalPersistence, setPersistence} from 'firebase/auth';



const firebaseConfig = {
  apiKey: "AIzaSyAN_GTlpRUxsRG_znlcnaaDwdUxZgyncn8",
  authDomain: "bitsandbots-69.firebaseapp.com",
  projectId: "bitsandbots-69",
  storageBucket: "bitsandbots-69.firebasestorage.app",
  messagingSenderId: "14650973687",
  appId: "1:14650973687:web:8651ce1e47ba024b22a2f2"
};
const firebaseApp = initializeApp(firebaseConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({ theme: { preset: Main } }),
    provideFirebaseApp(() => firebaseApp),
    provideAuth(() => getAuth(firebaseApp)),
    provideFirestore(() => getFirestore(firebaseApp)),
  ]
};
