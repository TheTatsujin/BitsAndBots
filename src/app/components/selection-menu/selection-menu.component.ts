import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { DataView } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Content} from '../../model/content.interface';
import {ContentService} from '../../services/content.service';
import {Dialog} from 'primeng/dialog';
import {SideMenuComponent} from '../side-menu/side-menu.component';
import {User} from '../../model/user.interface';
import {AuthService} from '../../services/auth.service';
import {Progress} from '../../model/progress.interface';
import {ProgressBar} from 'primeng/progressbar';
import {Toast} from 'primeng/toast';
import {Tema} from '../../model/tema.interface';
import {Accordion, AccordionContent, AccordionHeader, AccordionPanel} from 'primeng/accordion';
import {of} from 'rxjs';
import {UserProgressService} from '../../services/user-progress.service';

@Component({
  selector: 'app-selection-menu',
  imports: [
    DataView, ButtonModule, CommonModule, FormsModule, Dialog, RouterLink, SideMenuComponent, ProgressBar, Toast, AccordionPanel, AccordionHeader, AccordionContent, Accordion
  ],
  templateUrl: './selection-menu.component.html',
  styleUrl: './selection-menu.component.css'
})

export class SelectionMenuComponent implements OnInit {
  disabled = false;
  isMenuOpen = false;
  selectedContent: number = 1;
  descriptionVisible: boolean = false;
  contentService: ContentService = inject(ContentService);
  userAuthService: AuthService = inject(AuthService);
  progressService: UserProgressService = inject(UserProgressService);
  contentList: WritableSignal<Content[]> = signal<Content[]>([]);
  currentUser: WritableSignal<User> = signal<User>({ id: "", email: "", password: "" });
  userProgress: WritableSignal<Progress> = signal<Progress>({id: "", userID: -1, progress: []});
  temaList: WritableSignal<Tema[]> = signal<Tema[]>([]);
  contentType: string = '';

  getTypeFromRoute(route: string): string {
    if (route === '') return '';
    const newRoute = route.replace('course/', '');
    return newRoute.charAt(0).toUpperCase() + newRoute.substring(1, newRoute.length - 1);
  }

  getRouteName(route: string): string {
    if (route === '') return '';
    return route.replace('course/', '')
  }

  gotToContent(contentID: number) {
    if (this.userProgress().progress[contentID - 1])
      this.router.navigate(['/' + (this.activatedRoute.snapshot.routeConfig?.path || '') + '/' + contentID]).then()
  }

  logout(): void {
    this.userAuthService.logout().then(() => {
      this.router.navigate(['']).then();
    })
  }

  get selected(): Content {
    return this.contentList()[this.selectedContent - 1];
  }

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router) {
  }

  ngOnInit() {
    this.userAuthService.getCurrentUser().then(sub => {
      sub.subscribe(user => {
        if(user) {
          this.currentUser.set(user);
          this.progressService.getUserProgress(
            this.userAuthService.stringToHash(this.currentUser().id))
            .subscribe(progress => {
              if (progress) this.userProgress.set(progress);
            })
        }
      })
    })

    this.contentType = this.getTypeFromRoute(this.activatedRoute.snapshot.routeConfig?.path || '');
    this.contentService
      .getContentList(this.contentType)
      .subscribe(contentList => {
      this.contentList.set(contentList.sort((a, b) => a.id - b.id));
      console.log(this.contentList());
    });

    this.contentService.getTemaList().subscribe(temaList => {
      this.temaList.set(temaList.sort((a, b) => a.id - b.id));
      console.log(temaList);
    })
  }


  protected readonly of = of;
}
