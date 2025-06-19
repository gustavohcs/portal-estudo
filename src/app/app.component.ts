import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './features/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'portal-estudo';
}
