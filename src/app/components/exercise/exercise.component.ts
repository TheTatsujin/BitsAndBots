import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {Button} from 'primeng/button';
import {SideMenuComponent} from '../side-menu/side-menu.component';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../model/user.interface';
import {UserProgressService} from '../../services/user-progress.service';
import {Progress} from '../../model/progress.interface';
import {PowersOfTwoExerciseComponent} from '../exercises/powers-of-two-exercise/powers-of-two-exercise.component';

@Component({
  selector: 'app-exercise',
  imports: [
    Button,
    SideMenuComponent,
    PowersOfTwoExerciseComponent
  ],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.css'
})
export class ExerciseComponent implements OnInit {
  isMenuOpen = false;
  authService: AuthService = inject(AuthService);
  progressService: UserProgressService = inject(UserProgressService);
  currentUser: WritableSignal<User> = signal<User>({id: "", email: "", password: ""});
  userProgress: WritableSignal<Progress> = signal<Progress>({id: "", userID: 0, progress: []});


  constructor(private currentRoute: ActivatedRoute, protected router: Router) {
  }

  logout(): void {
    this.authService.logout().then(() => {
      this.router.navigate(['']).then();
    })
  }
  ngOnInit() {
    this.authService.getCurrentUser().then(sub => {
      sub.subscribe(user => {
        if (user) {
          this.currentUser.set(user)
          this.progressService.getUserProgress(this.authService.stringToHash(this.currentUser().id))
            .subscribe(p => { if(p) { this.userProgress.set(p) } })
        }
      })
    })
  }


}
