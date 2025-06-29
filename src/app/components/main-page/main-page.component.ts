import {Component, computed, inject, OnInit, output, signal, Signal, WritableSignal} from '@angular/core';
import {Button} from 'primeng/button';
import {Card} from 'primeng/card';
import {Timeline} from 'primeng/timeline';
import {Dialog} from 'primeng/dialog';
import {InputText} from 'primeng/inputtext';
import {User} from '../../model/user.interface';
import {FormsModule, NgForm} from '@angular/forms';
import {NgIf} from '@angular/common';
import {Divider} from 'primeng/divider';
import {AuthService} from '../../services/auth.service';
import {SideMenuComponent} from '../side-menu/side-menu.component';

interface EventItem {
  status?: string;
  description?: string;
  icon?: string;
  color?: string;
  image?: string;
}

@Component({
  selector: 'app-main-page',
  imports: [
    Button,
    Card,
    Timeline,
    Dialog,
    InputText,
    FormsModule,
    NgIf,
    Divider,
    SideMenuComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})

export class MainPageComponent implements OnInit {
  currentUser: WritableSignal<User> = signal<User>({ id: "", email: "", password: "" });
  isMenuOpen= false;
  userRegisterInfo: User = {id: "", email: "", password: ""};
  userLoginInfo: User = {id: "", email: "", password: ""};
  events: EventItem[];
  dialogueVisible: boolean = false;
  userAuthService: AuthService = inject(AuthService);

  closeDialogue() {
    this.dialogueVisible = false;
  }

  showRegisterDialogue() {
    this.dialogueVisible = true;
  }

  userSubmitRegistration(form: NgForm) {
    if (this.userRegisterInfo.email == "" || this.userRegisterInfo.email == "") return;
    this.userAuthService.registerUser(this.userRegisterInfo).then(user => {
      if(user) this.currentUser.set(user);
      form.reset();
      this.dialogueVisible = true;
      this.closeDialogue();
    });
  }

  logout() {
    this.userAuthService.logout().then(_ => this.currentUser.set({id: "", email: "", password: ""}));
  }

  userSubmitLogin(form: NgForm) {
    if (this.userLoginInfo.email == "" || this.userLoginInfo.email == "" ) return;

    this.userAuthService.signInUser(this.userLoginInfo).then( user => {
        form.reset();
        this.closeDialogue();
        if(user) this.currentUser.set(user)
        this.isMenuOpen = true;
      });
  }

  constructor() {
    this.events = [
      { status: 'Aprende', description: 'Nuestro modelo de aprendizaje orientado a estudiantes como tú', icon: 'pi pi-cog', color: '#B0B0B0', image: 'game-controller.jpg' },
      { status: 'Practica', description: 'Con ejercicios reales para resolver problemas reales', icon: 'pi pi-cog', color: '#A1A1A1' },
      { status: 'Motívate', description: 'Curso completo desde 0, empieza sin conocimiento previo', icon: 'pi pi-cog', color: '#939393' },
      { status: 'Conviértete en profesional', description: 'Ideal para estudiantes que quieren estudiar la carrera.', icon: 'pi pi-check', color: '#6DDD9F' } ]
  }

  ngOnInit() {
    this.userAuthService.getCurrentUser().then(sub => {
      sub.subscribe(user => {
        if(user) this.currentUser.set(user);
      })
    })
  }

  protected readonly signal = signal;
  protected readonly computed = computed;
}
