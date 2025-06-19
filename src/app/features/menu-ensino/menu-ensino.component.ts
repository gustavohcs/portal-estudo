import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-ensino',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './menu-ensino.component.html',
  styleUrl: './menu-ensino.component.scss'
})
export class MenuEnsinoComponent {
  materia: string = '';
  ano: number = 0;
  materiaNome: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.ano = Number(params.get('ano'));
      localStorage.setItem('materiaAnoLetivo', params.get('ano') ?? '');
    });
    this.materia = localStorage.getItem('materia') ?? '';
    const nomesMaterias: { [key: string]: string } = {
      ciencias: 'Ciências',
      portugues: 'Língua Portuguesa',
      matematica: 'Matemática',
      historia: 'História',
      geografia: 'Geografia'
    };
    this.materiaNome = nomesMaterias[this.materia] || this.materia;
  }
}
