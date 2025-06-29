import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DialogueComponent} from './components/dialogue/dialogue.component';
import {SlideComponent} from './components/slide/slide.component';
import {MainPageComponent} from './components/main-page/main-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DialogueComponent, SlideComponent, MainPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'bits-and-bots';


}
