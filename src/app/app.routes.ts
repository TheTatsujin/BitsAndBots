import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import("./components/main-page/main-page.component").then(m => m.MainPageComponent)
  },
  {
    path: 'course/lessons',
    loadComponent: () => import("./components/selection-menu/selection-menu.component").then(m => m.SelectionMenuComponent)
  },
  {
    path: 'course/exercises',
    loadComponent: () => import("./components/selection-menu/selection-menu.component").then(m => m.SelectionMenuComponent)
  },
  {
    path: 'course/lessons/:id',
    loadComponent: () => import("./components/lesson/lesson.component").then(m => m.LessonComponent)
  },
  {
    path: 'course/exercises/:id',
    loadComponent: () => import("./components/exercise/exercise.component").then(m => m.ExerciseComponent)
  }
];


