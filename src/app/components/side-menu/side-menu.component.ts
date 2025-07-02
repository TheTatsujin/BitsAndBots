import {
  Component,
  computed,
  EventEmitter,
  input,
  InputSignal,
  Output, Signal,
} from '@angular/core';
import {Drawer} from 'primeng/drawer';
import {Menu} from 'primeng/menu';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-side-menu',
  imports: [
    Drawer,
    Menu
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  userEmail: InputSignal<string> = input<string>('');
  isOpen = input<boolean>(false);
  @Output() logoutEvent: EventEmitter<void> = new EventEmitter();
  @Output() loginEvent: EventEmitter<void> = new EventEmitter();
  @Output() hideMenuEvent: EventEmitter<void> = new EventEmitter();

  generalOptions : MenuItem[] = [
    {
      label: 'Información',
      items: [{
        label: 'Contacto',
        icon: 'pi pi-phone'
      },
        {
          label: 'Planes',
          icon: 'pi pi-money-bill'
        }]
    },
    {
      label: 'Perfil',
      items: [{
        label: 'Iniciar sesión',
        icon: 'pi pi-user',
        command: () => this.loginEvent.emit()
      }]
    }
  ]
  userOptions: Signal<MenuItem[]> = computed<MenuItem[]>(():MenuItem[] => [
    {
      label: this.userEmail(),
      icon: 'pi pi-envelope',
    }, { separator: true },
    {
      label: 'Curso',
      items: [
        {
          label: 'Lecciones',
          icon: 'pi pi-caret-right',
          routerLink: '/course/lessons'
        },
        {
          label: 'Ejercicios',
          icon: 'pi pi-pencil',
          routerLink: '/course/exercises'
        }
      ]
    },
    {
      label: 'Perfil',
      items: [
        {
          label: 'Configuración',
          icon: 'pi pi-cog'
        },
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: () =>
            this.logoutEvent.emit()
        }
      ]
    }

  ]);
  menuOptions= computed<MenuItem[]>(() => this.userEmail() === '' ? this.generalOptions : this.userOptions() );
}
