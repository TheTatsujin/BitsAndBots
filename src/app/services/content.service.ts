import { Injectable } from '@angular/core';
import {Content} from '../model/content.interface'
import {collection, collectionData, getDocs, getFirestore, limit, query, where} from '@angular/fire/firestore';
import {map, observable, Observable, of} from 'rxjs';
import {Progress} from '../model/progress.interface';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  firestore = getFirestore();

  constructor() { }

  getContentReference(type: string){
    return collection(this.firestore, type);
  }

  getUserProgress(userID: number): Observable<Progress | null> {
    const usersRef = collection(this.firestore, 'UserProgress');
    const q = query(usersRef, where('userID', '==', userID), limit(1));

    // Use collectionData with the query and map to single result
    return collectionData(q, { idField: 'id' }).pipe(
      map(results => results.length > 0 ? results[0] as Progress : null)
    );
  }

  getContentList(type: string){
    if(type === '') return of([]);
    return collectionData(this.getContentReference(type), {idField: "id"})
      .pipe(map(rawContentDoc => rawContentDoc
        .map(rawContent => ({
          id: +rawContent.id as number,
          title: rawContent["title"] as string,
          description: rawContent['description'] as string,
          img: rawContent['img'] as string,
        } as Content))
      )) as Observable<Content[]>;
  }

}
