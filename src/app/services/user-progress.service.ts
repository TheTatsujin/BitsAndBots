import {inject, Injectable} from '@angular/core';
import {addDoc, collection, collectionData, Firestore, limit, query, where} from '@angular/fire/firestore';
import {map, Observable} from 'rxjs';
import {Progress} from '../model/progress.interface';

@Injectable({
  providedIn: 'root'
})
export class UserProgressService {
  private firestore = inject(Firestore);

  getProgressReference() {
    return collection(this.firestore, "UserProgress");
  }


  newProgress(userID: number, progress: number[]) {
    return addDoc(this.getProgressReference(), {userID: userID, progress: progress});
  }

  getUserProgress(userID: number): Observable<Progress | null> {
    return collectionData(
      query(this.getProgressReference(), where('userID', '==', userID), limit(1)), { idField: 'id' })
      .pipe(map(results => results.length > 0 ? results[0] as Progress : null)
    );
  }


}
