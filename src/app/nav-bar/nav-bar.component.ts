import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  isToggled: boolean = false;

  toggleNavBar(): void {
    this.isToggled = !this.isToggled;
  }
}
