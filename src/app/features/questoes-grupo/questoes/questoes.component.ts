import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { QuestaoService } from '../../../services/questao.service';
import { Questao } from '../../../models/questao.model';

@Component({
  selector: 'app-questoes.component',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './questoes.component.html',
  styleUrl: './questoes.component.scss'
})
export class QuestoesComponent {
  filtro: string = '';
  topicoSelecionado: string = '';
  topicos: any;
  questoes: Questao[] = [];
  questoesFiltradas: Questao[] = [];
  materia: string = '';
  ano: number = 0;
  materiaNome: string = '';
  role: any;

  constructor(private router: Router, private questaoService: QuestaoService) {}

  ngOnInit() {
    const nomesMaterias: { [key: string]: string } = {
      ciencias: 'Ciências',
      portugues: 'Língua Portuguesa',
      matematica: 'Matemática',
      historia: 'História',
      geografia: 'Geografia'
    };

    this.materia = localStorage.getItem('materia') ?? '';
    this.ano = parseInt(localStorage.getItem('materiaAnoLetivo') ?? '6', 10);
    this.materiaNome = nomesMaterias[this.materia] || this.materia;
    this.role = localStorage.getItem('role');

    this.questaoService.buscarPorMateriaEAno(this.materia, this.ano)
      .subscribe({
        next: (dados) => { 
          this.questoes = dados;
          this.topicos = [...new Set(this.questoes.map(questao => questao.topico))];
          this.buscar();
        } ,
        error: (erro) => console.error('Erro ao buscar questoes:', erro)
      });
  }

  buscar() {
    this.questoesFiltradas = this.questoes
      .filter(questao =>
        (!this.filtro || questao.topico?.toLowerCase().includes(this.filtro.toLowerCase())) &&
        (!this.topicoSelecionado || questao.topico === this.topicoSelecionado)
      )
      .sort((a, b) => {
        const numeroA = +a.numero!; 
        const numeroB = +b.numero!; 

        return numeroA - numeroB; 
      });
  }

  criarQuestao(): void {
    localStorage.removeItem('questao');
    this.router.navigate(['/cadastro-questao']);
  }

  editarQuestao(questao: any): void {
    localStorage.setItem('questao', JSON.stringify(questao));
    this.router.navigate(['/cadastro-questao']);
  }

  abrirQuestao(questao: any) {
    localStorage.setItem('questao', JSON.stringify(questao));
    this.router.navigate(['/resolver-questao']);
  }

  deletarQuestao(questao: any) {
    this.questaoService.deletar(questao.id).subscribe({
      next: () => {
        this.questaoService.buscarPorMateriaEAno(this.materia, this.ano)
              .subscribe({
                next: (dados) => { 
                  this.questoes = dados;
                  this.topicos = [...new Set(this.questoes.map(questao => questao.topico))];
                  this.buscar();
        },
        error: (erro) => console.error('Erro ao buscar apostilas:', erro)
      });
      },
      error: (erro) => console.error('Erro ao deletar')
    });
  }

}
