import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuarios.component',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {
  filtro: string = '';
  anoSelecionado: string = '';
  anosLetivos: string[] = ['6º Ano', '7º Ano', '8º Ano', '9º Ano'];
  usuarios: any;

 constructor(private route: ActivatedRoute, private router: Router, private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuarioService.getTodos()
      .subscribe({
        next: (dados) => { 
          this.usuarios = dados;
        } ,
        error: (erro) => console.error('Erro ao buscar apostilas:', erro)
      });
    }

  cadastrarUsuario() {
    this.usuarioService.setUsuario(null);
    this.router.navigate(['/cadastro-usuario']);
  }

  editarUsuario(usuario: any): void {
    this.usuarioService.setUsuario(usuario);
    this.router.navigate(['/cadastro-usuario']);
  }
}
