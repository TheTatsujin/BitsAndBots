import { Injectable } from '@angular/core';
import {Content} from '../model/content.interface'
import {
  collection,
  collectionData,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  query,
  where
} from '@angular/fire/firestore';
import {from, map, observable, Observable, of, switchMap, throwError} from 'rxjs';
import {Progress} from '../model/progress.interface';
import {Tema} from '../model/tema.interface';
import {Lesson} from '../model/lesson.interface';
import {Exercise} from '../model/exercise.interface';
import {DocumentReference} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  firestore = getFirestore();


  getContentReference(type: string){
    return collection(this.firestore, type);
  }

  getContentList(type: string): Observable<Lesson[] | Exercise[] | Content[]> {
    if (type === '') return of([]);

    return collectionData(this.getContentReference(type), { idField: "id" }).pipe(
      map(rawContentDocs => rawContentDocs.map(rawContent => {
        const base: Content = {
          id: +rawContent.id,
          title: rawContent["title"],
          description: rawContent["description"],
          img: rawContent["img"]
        };

        if (type === 'lesson') {
          return {
            ...base,
            pages: rawContent["pages"]
          } as Lesson;
        }

        if (type === 'exercise') {
          return {
            ...base,
            questions: rawContent["questions"]
          } as Exercise;
        }

        return base as Content; // fallback, though technically shouldn't happen
      }))
    );
  }

  getLesson(contentID: number): Observable<Lesson | null> {
    const lessonRef = doc(this.firestore, `Lesson/${contentID}`);
    return from(getDoc(lessonRef)).pipe(
      switchMap(snapshot => {
        if (!snapshot.exists()) {
          return throwError(() => new Error(`Lesson with ID "${contentID}" not found.`));
        }

        const data = snapshot.data();
        if (!data) return [null];
        const lesson: Lesson = {
          id: +snapshot.id,
          title: data["title"],
          description: data["description"],
          img: data["img"],
          pages: data["pages"]
        };

        return [lesson];
      })
    );
  }

  getTemaList(): Observable<Tema[]> {
    return collectionData(collection(this.firestore, 'Tema'), {idField: "id"}).pipe(
      map(rawTemaDoc => rawTemaDoc
        .map(rawTema => ({
          id: +rawTema.id as number,
          title: rawTema["title"] as string,
          lessons: rawTema["lecciones"] as number[],
        } as Tema))
      )) as Observable<Tema[]>;
  }

}
