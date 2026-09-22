import { Component } from '@angular/core';
import { CreatioAccountsComponent } from './creatio-accounts/creatio-accounts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CreatioAccountsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
