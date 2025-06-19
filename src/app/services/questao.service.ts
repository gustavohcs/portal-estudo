import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Questao } from '../models/questao.model';
import { ComentarioQuestao } from '../models/comentario-questao.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestaoService {
  private apiUrl = `${environment.apiUrl}/questoes`; 
  
  constructor(private http: HttpClient) {}

  getTodas(): Observable<Questao[]> {
    return this.http.get<Questao[]>(this.apiUrl);
  }

  getPorId(id: number): Observable<Questao> {
    return this.http.get<Questao>(`${this.apiUrl}/${id}`);
  }

  buscarPorMateriaEAno(materia: string, ano: number): Observable<Questao[]> {
    return this.http.get<Questao[]>(`${this.apiUrl}/search`, {
      params: { materia, ano: ano.toString() },
    });
  }

  criar(questao: Questao): Observable<Questao> {
    return this.http.post<Questao>(this.apiUrl, questao);
  }

  atualizar(id: number, questao: Questao): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, questao);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  criarComentario(comentarioQuestao: ComentarioQuestao): Observable<ComentarioQuestao> {
    return this.http.post<ComentarioQuestao>(`${this.apiUrl}/comentario`, comentarioQuestao);
  }

  getComentarios(idQuestao: number): Observable<ComentarioQuestao[]> {
    return this.http.get<ComentarioQuestao[]>(`${this.apiUrl}/${idQuestao}/comentarios`);
  }
}
