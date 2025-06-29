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

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth);
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
      .then( credential => this.fromCredentialToUser(credential)
    )
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
