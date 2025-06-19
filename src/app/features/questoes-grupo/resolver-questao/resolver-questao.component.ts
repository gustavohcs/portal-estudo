import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Questao } from '../../../models/questao.model';
import { QuestaoService } from '../../../services/questao.service';
import { ComentarioQuestao } from '../../../models/comentario-questao.model';

@Component({
  selector: 'app-resolver-questao.component',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './resolver-questao.component.html',
  styleUrl: './resolver-questao.component.scss'
})
export class ResolverQuestaoComponent {
  questao: any;
  respostaSelecionada: string | null = null;
  respostaVerificada = false;
  respostaCorreta = false;
  comentarios: any[] = [];
  novaMensagem: string = '';
  novaMensagemResposta: string = '';
  comentario: any;
  comentariosOrganizados: any[] = [];
  respondendoA: any = null;

  letras = ['A', 'B', 'C', 'D', 'E'];

  constructor(private questaoService: QuestaoService) {}

  ngOnInit() {
    const questaoJson = localStorage.getItem('questao');
    if (questaoJson) {
      this.questao = JSON.parse(questaoJson);
      this.questaoService.getComentarios(this.questao.id)
      .subscribe({
        next: (dados) => { 
            this.comentarios = dados;
            this.comentariosOrganizados = this.organizarComentarios(this.comentarios);
        } ,
        error: (erro) => console.error('Erro ao buscar comentarios:', erro)
      });
    }
    
  }

  verificarResposta() {
    if (this.respostaSelecionada && this.questao) {
      this.respostaCorreta = this.respostaSelecionada === this.questao.resposta;
      this.respostaVerificada = true;
    }
  }

  getAlternativa(letra: string): any {
    if (!this.questao) return null;
    return this.questao[`alternativa${letra}` as keyof Questao] ?? null;
  }

  
    responder(comentario: any) {
      this.respondendoA = comentario;
      this.novaMensagem = '';
    }
  
    enviarComentario(respostaParaIdComentario?: number) {
      const comentario: ComentarioQuestao = {
        id: 0,
        idQuestao: this.questao?.id,
        idUsuario: parseInt(localStorage.getItem('idUsuario') || '0', 10),
        respostaParaIdComentario: respostaParaIdComentario,
        mensagem: this.novaMensagem.trim(),
        creationDate: new Date(),
        updateDate: new Date()
      };
  
      this.questaoService.criarComentario(comentario).subscribe(() => {
        this.comentarios.push(comentario);
        this.comentariosOrganizados = this.organizarComentarios(this.comentarios);
        this.novaMensagem = '';
        this.respondendoA = null;
        this.questaoService.getComentarios(this.questao.id)
        .subscribe({
          next: (dados) => { 
              this.comentarios = dados;
              this.comentariosOrganizados = this.organizarComentarios(this.comentarios);
          } ,
          error: (erro) => console.error('Erro ao buscar comentarios:', erro)
        });
      });
    }
  
    enviarResposta(respostaParaIdComentario?: number) {
      const comentario: ComentarioQuestao = {
        id: 0,
        idQuestao: this.questao.id,
        idUsuario: parseInt(localStorage.getItem('idUsuario') || '0', 10),
        respostaParaIdComentario: respostaParaIdComentario,
        mensagem: this.novaMensagemResposta.trim(),
        creationDate: new Date(),
        updateDate: new Date()
      };
  
      this.questaoService.criarComentario(comentario).subscribe(() => {
        this.comentarios.push(comentario);
        this.comentariosOrganizados = this.organizarComentarios(this.comentarios);
        this.novaMensagem = '';
        this.respondendoA = null;
        this.questaoService.getComentarios(this.questao.id)
        .subscribe({
          next: (dados) => { 
              this.comentarios = dados;
              this.comentariosOrganizados = this.organizarComentarios(this.comentarios);
          } ,
          error: (erro) => console.error('Erro ao buscar comentarios:', erro)
        });
      });
    }
  
    organizarComentarios(comentarios: ComentarioQuestao[]) {
      const map = new Map<number, any>();
      const raiz: any[] = [];
  
      comentarios.forEach(c => {
        map.set(c.id, { ...c, respostas: [] });
      });
  
      map.forEach(comentario => {
        if (comentario.respostaParaIdComentario) {
          const pai = map.get(comentario.respostaParaIdComentario);
          if (pai) pai.respostas.push(comentario);
        } else {
          raiz.push(comentario);
        }
      });
  
      return raiz;
    }
}
