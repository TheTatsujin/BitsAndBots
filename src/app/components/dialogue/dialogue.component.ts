import {Component, input} from '@angular/core';

@Component({
  selector: 'app-dialogue',
  imports: [],
  templateUrl: './dialogue.component.html',
  styleUrl: './dialogue.component.css'
})
export class DialogueComponent {
  textContent = input<string>();
}
