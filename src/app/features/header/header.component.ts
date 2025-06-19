import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  usuarioLogin: string | null = null;
  role: string | null = null;
  anoLetivo: any;
  private sub!: Subscription;

  constructor(public auth: AuthService) {}

  ngOnInit() {
    this.sub = this.auth.currentUser$.subscribe(user => {
      this.usuarioLogin = user?.username ?? null;
      this.role = user?.role ?? null;
      this.anoLetivo = parseInt(localStorage.getItem('anoLetivo') ?? '0', 10);
    });

    if (!this.role) {
      this.role = localStorage.getItem('role');
      this.usuarioLogin = localStorage.getItem('usuario');
    }
    
  }

  ngOnDestroy() {
    this.sub.unsubscribe(); // para evitar vazamento de memória
  }
}