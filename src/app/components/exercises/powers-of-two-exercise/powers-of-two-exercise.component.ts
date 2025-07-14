import {Component, OnInit} from '@angular/core';
import {Card} from 'primeng/card';
import {Knob} from 'primeng/knob';
import {FormsModule} from '@angular/forms';
import {ButtonGroup} from 'primeng/buttongroup';
import {Button, ButtonSeverity} from 'primeng/button';
import {NgForOf} from '@angular/common';
import {InputNumber} from 'primeng/inputnumber';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {Dialog} from 'primeng/dialog';

@Component({
  selector: 'app-powers-of-two-exercise',
  imports: [
    Card,
    Knob,
    FormsModule,
    ButtonGroup,
    Button,
    NgForOf,
    InputNumber,
    ConfirmDialog,
    Dialog
  ], providers: [
    ConfirmationService, // Add services here
    MessageService,      // Add services here
  ],
  templateUrl: './powers-of-two-exercise.component.html',
  styleUrl: './powers-of-two-exercise.component.css'
})
export class PowersOfTwoExerciseComponent implements OnInit {
  visible: boolean = false;
  resultMessage: string = "";
  messageSeverity: ButtonSeverity = "success";
  messageEmoji: string = "pi-face-smile";

  exerciseNumber: number = 5;
  maxValue: number = 4096;
  minValue: number = 1;

  maxExponent: number = 12;
  results: number[] = [];

  exponents: number[] = [];

  constructor(private confirmationService: ConfirmationService) {}

  getRandomValue(){
    return Math.floor(Math.random() * (this.maxExponent + 1))
  }

  ngOnInit() {
    for (let i = 0; i < this.exerciseNumber; i++) {
      this.exponents.push(this.getRandomValue());
      this.results.push(this.minValue);
    }
  }

  isCorrect(): boolean{
    for (let i = 0; i < this.exerciseNumber; i++) {
      if (this.results[i] !== Math.pow(2, this.exponents[i])) {
        return false;
      }
    }
    return true;
  }

  showResults(message: string, severity: ButtonSeverity, emoji: string): void {
    this.resultMessage = message;
    this.messageSeverity = severity;
    this.messageEmoji = emoji;
    this.visible = true;
  }

  confirm() {
    this.confirmationService.confirm({
      header: '¿ Seguro que quieres responder ?',
      message: 'Confirma para continuar',
      accept: () => { this.isCorrect() ? this.showResults("Has acertado todas", "success", "pi-face-smile") : this.showResults("Muy mal, revisa tus respuestas", "danger", "pi-thumbs-down-fill") },
      reject: () => { },
    });
  }

  increaseSlider(index: number) {
    if (this.results[index] === 0) this.results[index] = 1;
    if (this.results[index] < this.maxValue) this.results[index] *= 2;
  }

  decreaseSlider(index: number) {
    if (this.results[index] === 0) this.results[index] = 1;
    if (this.results[index] > 1) this.results[index] /= 2;
  }
}
