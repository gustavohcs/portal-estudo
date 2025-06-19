import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-page',
  imports: [RouterLink, CommonModule],
  standalone: true,
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  constructor(public auth: AuthService, private router: Router) {}

  role: any;

  ngOnInit() {
    this.role = localStorage.getItem('role');
    if (this.role === 'aluno') {
      this.router.navigate(['/materias']);
    }
  }
}
