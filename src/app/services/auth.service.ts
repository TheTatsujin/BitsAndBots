import {inject, Injectable, OnInit} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  onAuthStateChanged,
  User as FirebaseUser, signOut
} from '@angular/fire/auth';
import {User} from '../model/user.interface';
import {BehaviorSubject, map} from 'rxjs';
import {UserProgressService} from './user-progress.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth);
  progressService = inject(UserProgressService)
  private currentUser= new BehaviorSubject<FirebaseUser | null>(null);
  public user$ = this.currentUser.asObservable();

  constructor() {
    onAuthStateChanged(this.firebaseAuth, (user) => {
      this.currentUser.next(user);
    });
  }

  private fromCredentialToUser(credential: UserCredential): User | null {
    if (credential !== null && credential !== undefined) {
      return {id: credential.user.uid, email: credential.user.email, password: ""} as User;
    }
    return null
  }

  stringToHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  async getCurrentUser(){
    return this.user$.pipe(map((fbUser: FirebaseUser | null) => {
      return fbUser ? {
              id: fbUser.uid,
              email: fbUser.email ?? '',
              password: '',
            } as User
            : null;
      })
    );
  }

  async registerUser(newUser: User): Promise<User | null> {
    return createUserWithEmailAndPassword(this.firebaseAuth, newUser.email, newUser.password)
      .then( credential => this.fromCredentialToUser(credential))
      .then((u) => {
        if (u) this.progressService.newProgress(this.stringToHash(u.id), [1])
        return u;
      })
  }

  async logout(){
    return signOut(this.firebaseAuth)
      .catch((_) => { /* An error happened. */ });
  }

  async signInUser(user: User): Promise<void | User | null> {
    return signInWithEmailAndPassword(this.firebaseAuth, user.email, user.password)
      .then( credential => this.fromCredentialToUser(credential))
      .catch(err => console.log(err));
  }

}
