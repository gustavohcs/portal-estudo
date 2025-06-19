import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Apostila } from '../../../models/apostila.model';
import { ApostilaService } from '../../../services/apostila.service';
import { ComentarioApostila } from '../../../models/comentario-apostila.model';

@Component({
  selector: 'app-apostila-topico.component',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './apostila-topico.component.html',
  styleUrl: './apostila-topico.component.scss'
})
export class ApostilaTopicoComponent {
  filtro: string = '';
  topicoSelecionado: string = '';
  topicos: string[] = [];
  apostilas: Apostila[] = [];
  apostila: any;
  materia: string = '';
  ano: number = 0;
  materiaNome: string = '';
  comentarios: any[] = [];
  novaMensagem: string = '';
  novaMensagemResposta: string = '';
  comentario: any;
  comentariosOrganizados: any[] = [];
  respondendoA: any = null;

  constructor(private route: ActivatedRoute, private router: Router, private apostilaService: ApostilaService) {}

  ngOnInit() {
    const nomesMaterias: { [key: string]: string } = {
      ciencias: 'Ciências',
      portugues: 'Língua Portuguesa',
      matematica: 'Matemática',
      historia: 'História',
      geografia: 'Geografia'
    };

    this.materia = localStorage.getItem('materia') ?? '';
    this.ano = parseInt(localStorage.getItem('materiaAnoLetivo') ?? '0', 10);
    this.materiaNome = nomesMaterias[this.materia] || this.materia;

    const apostilaJson = localStorage.getItem('apostila');
    if (apostilaJson) {
      this.apostila = JSON.parse(apostilaJson);
    }

    this.apostilaService.getComentarios(this.apostila.id)
      .subscribe({
        next: (dados) => { 
            this.comentarios = dados;
            this.comentariosOrganizados = this.organizarComentarios(this.comentarios);
        } ,
        error: (erro) => console.error('Erro ao buscar comentarios:', erro)
      });
  }

  responder(comentario: any) {
    this.respondendoA = comentario;
    this.novaMensagem = '';
  }

  enviarComentario(respostaParaIdComentario?: number) {
    const comentario: ComentarioApostila = {
      id: 0,
      idApostila: this.apostila.id,
      idUsuario: parseInt(localStorage.getItem('idUsuario') || '0', 10),
      respostaParaIdComentario: respostaParaIdComentario,
      mensagem: this.novaMensagem.trim(),
      creationDate: new Date(),
      updateDate: new Date()
    };

    this.apostilaService.criarComentario(comentario).subscribe(() => {
      this.comentarios.push(comentario);
      this.comentariosOrganizados = this.organizarComentarios(this.comentarios);
      this.novaMensagem = '';
      this.respondendoA = null;
      this.apostilaService.getComentarios(this.apostila.id)
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
    const comentario: ComentarioApostila = {
      id: 0,
      idApostila: this.apostila.id,
      idUsuario: parseInt(localStorage.getItem('idUsuario') || '0', 10),
      respostaParaIdComentario: respostaParaIdComentario,
      mensagem: this.novaMensagemResposta.trim(),
      creationDate: new Date(),
      updateDate: new Date()
    };

    this.apostilaService.criarComentario(comentario).subscribe(() => {
      this.comentarios.push(comentario);
      this.comentariosOrganizados = this.organizarComentarios(this.comentarios);
      this.novaMensagem = '';
      this.respondendoA = null;
      this.apostilaService.getComentarios(this.apostila.id)
      .subscribe({
        next: (dados) => { 
            this.comentarios = dados;
            this.comentariosOrganizados = this.organizarComentarios(this.comentarios);
        } ,
        error: (erro) => console.error('Erro ao buscar comentarios:', erro)
      });
    });
  }

  organizarComentarios(comentarios: ComentarioApostila[]) {
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
