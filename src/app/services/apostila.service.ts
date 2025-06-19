import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apostila } from '../models/apostila.model';
import { ComentarioApostila } from '../models/comentario-apostila.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApostilaService {
  private apiUrl = `${environment.apiUrl}/apostilas`; ;

  constructor(private http: HttpClient) {}

  getTodas(): Observable<Apostila[]> {
    return this.http.get<Apostila[]>(this.apiUrl);
  }

  getPorId(id: number): Observable<Apostila> {
    return this.http.get<Apostila>(`${this.apiUrl}/${id}`);
  }

  buscarPorMateriaEAno(materia: string, ano: number): Observable<Apostila[]> {
    return this.http.get<Apostila[]>(`${this.apiUrl}/search`, {
      params: { materia, ano: ano.toString() },
    });
  }

  criar(apostila: Apostila): Observable<Apostila> {
    return this.http.post<Apostila>(this.apiUrl, apostila);
  }

  atualizar(id: number, apostila: Apostila): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, apostila);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  criarComentario(comentarioApostila: ComentarioApostila): Observable<ComentarioApostila> {
    return this.http.post<ComentarioApostila>(`${this.apiUrl}/comentario`, comentarioApostila);
  }

  getComentarios(idApostila: number): Observable<ComentarioApostila[]> {
    return this.http.get<ComentarioApostila[]>(`${this.apiUrl}/${idApostila}/comentarios`);
  }

}
