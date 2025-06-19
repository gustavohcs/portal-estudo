import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-alunos.component',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.scss'
})
export class AlunosComponent {
  filtro: string = '';
  anoSelecionado: string = '';
  anosLetivos: string[] = ['6º Ano', '7º Ano', '8º Ano', '9º Ano'];
  alunos: Usuario[] = [];
  alunosFiltrados: any;

  constructor(private route: ActivatedRoute, private router: Router, private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuarioService.getTodos()
      .subscribe({
        next: (dados) => { 
          this.alunos = dados.filter(usuario => usuario.role === 'aluno');
          this.alunosFiltrados = [...this.alunos];
        } ,
        error: (erro) => console.error('Erro ao buscar apostilas:', erro)
      });
  }

  buscar() {
  this.alunosFiltrados = this.alunos.filter(aluno => {
      const nomeCorresponde = aluno?.nome?.toLowerCase().includes(this.filtro.toLowerCase());
      const anoCorresponde = 
        !this.anoSelecionado || 
        aluno.anoLetivo === this.obterAnoNumerico(this.anoSelecionado);

      return nomeCorresponde && anoCorresponde;
    });
}

obterAnoNumerico(ano: string): number | null {
  // Converte strings como "6º Ano" em número 6
  const match = ano.match(/^(\d)/);
  return match ? parseInt(match[1], 10) : null;
}

}
