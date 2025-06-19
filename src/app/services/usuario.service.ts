import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  // Método para pegar todos os usuários
  getTodos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  // Método para pegar um usuário por ID
  getPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  // Método para criar um novo usuário
  criar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  // Método para atualizar um usuário
  atualizar(id: number, usuario: Usuario): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, usuario);
  }

  // Método para deletar um usuário
  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Atributo para armazenar o usuário selecionado
  private usuarioSelecionado: Usuario | null = null;

  // Função para setar o usuário selecionado
  setUsuario(usuario: any): void {
    this.usuarioSelecionado = usuario;
  }

  // Função para pegar o usuário selecionado
  getUsuario(): Usuario | null {
    return this.usuarioSelecionado;
  }
}
