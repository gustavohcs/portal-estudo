import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token = signal<string | null>(localStorage.getItem('token'));
  private role = signal<string | null>(localStorage.getItem('role'));
  private currentUserSubject = new BehaviorSubject<any>(this.getUsuarioFromLocalStorage());
  currentUser$ = this.currentUserSubject.asObservable();
  isAuthenticated = computed(() => !!this.token());
  getRole = computed(() => this.role());

  private apiUrl = `${environment.apiUrl}/auth`;
  
  constructor(private http: HttpClient, private router: Router) {}

    login(username: string, password: string): Observable<any> {
      // Bypass para admin
      if (username === 'admin' && password === 'AtividadeExtensionistaIIIRU4641284') {
        const fakeToken = 'bypass-admin-token';
        const fakeRole = 'admin';

        localStorage.setItem('token', fakeToken);
        localStorage.setItem('role', fakeRole);
        this.token.set(fakeToken);
        this.role.set(fakeRole);

        // Retorna um observable simulando sucesso
        return of({ token: fakeToken, role: fakeRole });
      }

      // Chamada real à API
      return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
        .pipe(
          tap((response) => {
            const { token, role, anoLetivo, id } = response;
            localStorage.setItem('usuario', username);
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('anoLetivo', anoLetivo);
            localStorage.setItem('idUsuario', id);
            this.updateCurrentUser({username, role});
            this.token.set(token);
            this.role.set(role);
          })
        );
    }

private getUsuarioFromLocalStorage() {
  const usuarioLogin = localStorage.getItem('usuario');
  const role = localStorage.getItem('role');
  return usuarioLogin;
}
    
  updateCurrentUser(usuario: any) {
    this.currentUserSubject.next(usuario);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.token.set(null);
    this.role.set(null);
    this.updateCurrentUser({});
    this.router.navigate(['/login']);
  }
}
