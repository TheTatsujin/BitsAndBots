import {Component, computed, inject, input, OnInit, signal, Signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Carousel} from 'primeng/carousel';
import {Button, ButtonProps} from 'primeng/button';
import {AuthService} from '../../services/auth.service';
import {User} from '../../model/user.interface';
import {Progress} from '../../model/progress.interface';
import {UserProgressService} from '../../services/user-progress.service';
import {SideMenuComponent} from '../side-menu/side-menu.component';

@Component({
  selector: 'app-lesson',
  imports: [
    Carousel,
    Button,
    SideMenuComponent
  ],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css'
})
export class LessonComponent implements OnInit {
  isMenuOpen = false;
  authService: AuthService = inject(AuthService);
  progressService: UserProgressService = inject(UserProgressService);
  lessonID: WritableSignal<string> = signal<string>('');
  slides: WritableSignal<string[]> = signal<string[]>(["1", "2", "3", "4", "5", "6"]);
  currentUser: WritableSignal<User> = signal<User>({ id: "", email: "", password: "" });
  userProgress: WritableSignal<Progress> = signal<Progress>({id: "", userID: -1, progress: []});

  buttonStyle: ButtonProps = { severity: 'contrast', size: 'large', outlined: true, style: { backgroundColor: 'whitesmoke' }, rounded: true};

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
    this.currentRoute.paramMap.subscribe(params => {
      this.lessonID.set(params.get('id')!);
    });
  }
}
