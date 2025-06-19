import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ano-letivo',
  imports: [RouterLink, CommonModule],
  standalone: true,
  templateUrl: './ano-letivo.component.html',
  styleUrl: './ano-letivo.component.scss'
})
export class AnoLetivoComponent {
  materia: string = '';
  anoLetivo: any;
  role: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
      this.materia = this.route.snapshot.paramMap.get('materia')!;
      localStorage.setItem('materia', this.materia);
      this.anoLetivo = parseInt(localStorage.getItem('anoLetivo') ?? '0', 10);
      this.role = localStorage.getItem('role');
  }

}
