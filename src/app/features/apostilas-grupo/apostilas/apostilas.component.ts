import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Apostila } from '../../../models/apostila.model';
import { ApostilaService } from '../../../services/apostila.service';

@Component({
  selector: 'app-apostilas.component',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './apostilas.component.html',
  styleUrl: './apostilas.component.scss'
})
export class ApostilasComponent {
  filtro: string = '';
  topicoSelecionado: string = '';
  topicos: any;
  apostilas: Apostila[] = [];
  apostilasFiltradas: Apostila[] = [];
  materia: string = '';
  ano: number = 0;
  materiaNome: string = '';
  role: any;

  constructor(private router: Router, private apostilaService: ApostilaService) {}

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
    this.role = localStorage.getItem('role');

    this.apostilaService.buscarPorMateriaEAno(this.materia, this.ano)
      .subscribe({
        next: (dados) => { 
          this.apostilas = dados;
          this.topicos = [...new Set(this.apostilas.map(apostila => apostila.topico))];
          this.buscar();
        },
        error: (erro) => console.error('Erro ao buscar apostilas:', erro)
      });
  }

  buscar() {
    this.apostilasFiltradas = this.apostilas
      .filter(apostila =>
        (!this.filtro || apostila.topico?.toLowerCase().includes(this.filtro.toLowerCase())) &&
        (!this.topicoSelecionado || apostila.topico === this.topicoSelecionado)
      )
      .sort((a, b) => {
        const capituloA = +a.capitulo!; 
        const capituloB = +b.capitulo!; 

        return capituloA - capituloB; 
      });
  }

  criarApostila(): void {
    localStorage.removeItem('apostila');
    this.router.navigate(['/cadastro-apostila']);
  }

  editarApostila(apostila: any): void {
    localStorage.setItem('apostila', JSON.stringify(apostila));
    this.router.navigate(['/cadastro-apostila']);
  }

  abrirApostila(apostila: any) {
    localStorage.setItem('apostila', JSON.stringify(apostila));
    this.router.navigate(['/apostila-topico']);
  }

  deletarApostila(apostila: any) {
    this.apostilaService.deletar(apostila.id).subscribe({
      next: () => {
        this.apostilaService.buscarPorMateriaEAno(this.materia, this.ano)
              .subscribe({
                next: (dados) => { 
                  this.apostilas = dados;
                  this.topicos = [...new Set(this.apostilas.map(apostila => apostila.topico))];
                  this.buscar();
        },
        error: (erro) => console.error('Erro ao buscar apostilas:', erro)
      });
      },
      error: (erro) => console.error('Erro ao deletar')
    });
  
    
  }

}
