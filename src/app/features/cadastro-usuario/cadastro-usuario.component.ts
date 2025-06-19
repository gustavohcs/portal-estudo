import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Apostila } from '../../models/apostila.model';
import { HttpClientModule } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterLink ],
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {
  form!: FormGroup<{
    usuarioLogin: FormControl<string | null>;
    senha: FormControl<string | null>;
    role: FormControl<string | null>;
    nome: FormControl<string | null>;
    anoLetivo: FormControl<number | null>;
  }>;
  edicaoUsuario: Usuario | null = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      usuarioLogin: this.fb.control('', Validators.required),
      senha: this.fb.control('', Validators.required),
      role: this.fb.control('', Validators.required),
      nome: this.fb.control('', Validators.required),
      anoLetivo: this.fb.control(6),
    });

    // Carregar dados para edição, se houver
    this.edicaoUsuario = this.usuarioService.getUsuario();

    if (this.edicaoUsuario) {
      this.form.patchValue({
        usuarioLogin: this.edicaoUsuario.usuarioLogin,
        senha: '',
        role: this.edicaoUsuario.role,
        nome: this.edicaoUsuario.nome,
        anoLetivo: this.edicaoUsuario.anoLetivo
      });      
    }
  }

  cadastrar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = this.form.value;

    const data: Usuario = {
      id: this.edicaoUsuario ? this.edicaoUsuario.id : 0,
      usuarioLogin: formData.usuarioLogin ?? null,
      senha: formData.senha ?? null,
      role: formData.role ?? null,
      nome: formData.nome ?? null,
      anoLetivo: formData.anoLetivo ?? null
    };

    if (this.edicaoUsuario) {
      this.usuarioService.atualizar(this.edicaoUsuario.id, data).subscribe({
        next: () => {
          this.router.navigate(['/usuarios']);
        },
        error: () => console.log('Erro ao atualizar usuario.')
      });
    } else {
      this.usuarioService.criar(data).subscribe({
        next: () => {
          this.router.navigate(['/usuarios']);
        },
        error: () => console.log('Erro ao cadastrar usuario.')
      });
    }
  }

  get f() {
    return this.form.controls;
  }
}
