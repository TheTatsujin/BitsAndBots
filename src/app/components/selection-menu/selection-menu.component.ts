import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-selection-menu',
  imports: [],
  templateUrl: './selection-menu.component.html',
  styleUrl: './selection-menu.component.css'
})
export class SelectionMenuComponent implements OnInit {
  currentRoute: string = "Unknown";

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    // Access the current route path
    this.currentRoute = this.activatedRoute.snapshot.routeConfig?.path || 'Unknown';
    console.log(this.currentRoute);  // Will log the current route path
  }
}
