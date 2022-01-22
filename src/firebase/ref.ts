import { collection } from 'firebase/firestore';

import { FirebaseDB } from './config';

export const usersRef = collection(FirebaseDB, 'users');
export const requestsRef = collection(FirebaseDB, 'requests');
export const volunteersRef = collection(FirebaseDB, 'volunteers');
