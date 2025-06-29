import { Component } from '@angular/core';
import {Fieldset} from 'primeng/fieldset';
import {DialogueComponent} from '../dialogue/dialogue.component';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-slide',
  imports: [
    Fieldset,
    DialogueComponent,
    Button
  ],
  templateUrl: './slide.component.html',
  styleUrl: './slide.component.css'
})
export class SlideComponent {

  active: number = 0;

}
