import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    // Verifique se o login foi bem-sucedido com o subscribe
    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        // Se houver erro, mostre um alerta
        console.error('Erro no login', err);
        alert('Credenciais inválidas');
      }
    });
  }
}
