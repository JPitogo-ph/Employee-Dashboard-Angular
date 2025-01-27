import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
  <div class="flex items-center mx-auto flex-col justify-center space-y-4">
    <h1 class="text-5xl">Page Not Found :(</h1>
    <button class="rounded bg-blue-300 bg-contain px-2 py-4 text-white font-bold shrink" routerLink="/home">Click Here To Go Home</button> 
  </div>
  `,
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {

}
