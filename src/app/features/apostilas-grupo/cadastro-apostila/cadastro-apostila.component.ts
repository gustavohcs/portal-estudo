import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';  // Importando AfterViewInit
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApostilaService } from '../../../services/apostila.service';
import { Apostila } from '../../../models/apostila.model';
import { HttpClientModule } from '@angular/common/http';
import Quill from 'quill';
import { QuillEditorComponent } from '../../quill/quill-editor.component';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-cadastro-apostila',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, QuillEditorComponent, RouterLink ],
  templateUrl: './cadastro-apostila.component.html',
  styleUrls: ['./cadastro-apostila.component.scss']
})
export class CadastroApostilaComponent implements OnInit {  // Adicionando AfterViewInit
  form!: FormGroup<{
    capitulo: FormControl<number | null>;
    topico: FormControl<string | null>;
    materia: FormControl<string | null>;
    ano: FormControl<number | null>;
    conteudo: FormControl<string | null>;
  }>;
  edicaoApostila: Apostila | null = null;
  quillEditor: any;  // Para armazenar o editor do Quill

  @ViewChild(QuillEditorComponent, { static: false }) quillEditorRef!: QuillEditorComponent;

  constructor(
    private fb: FormBuilder,
    private apostilaService: ApostilaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const materia = localStorage.getItem('materia') ?? '';
    const ano = parseInt(localStorage.getItem('materiaAnoLetivo') ?? '6', 10);

    this.form = this.fb.group({
      capitulo: this.fb.control(1, [Validators.required, Validators.min(1)]),
      topico: this.fb.control('', Validators.required),
      materia: this.fb.control(materia, Validators.required),
      ano: this.fb.control(ano, [Validators.required, Validators.min(1)]),
      conteudo: this.fb.control('', [Validators.required, Validators.minLength(10)])
    });

    const apostilaJson = localStorage.getItem('apostila');
    if (apostilaJson) {
      this.edicaoApostila = JSON.parse(apostilaJson);
    }

    if (this.edicaoApostila) {
      this.form.patchValue({
        capitulo: this.edicaoApostila.capitulo,
        topico: this.edicaoApostila.topico,
        materia: this.edicaoApostila.materia,
        ano: this.edicaoApostila.ano,
        conteudo: this.edicaoApostila.conteudo
      });
      
    }

  }

     ngAfterViewInit(): void {
    // Verifique se a referência foi inicializada corretamente
    if (this.quillEditorRef) {
      if (this.quillEditorRef) {
        this.quillEditorRef.writeValue(this.edicaoApostila?.conteudo);  // Usando writeValue
      }
    }
  }

  cadastrar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = this.form.value;

    const data: Apostila = {
      id: this.edicaoApostila ? this.edicaoApostila.id : 0,
      creationDate: this.edicaoApostila ? this.edicaoApostila.creationDate : new Date(),
      updateDate: new Date(),
      capitulo: formData.capitulo ?? null,
      topico: formData.topico ?? null,
      materia: formData.materia ?? null,
      ano: formData.ano ?? null,
      conteudo: formData.conteudo ?? null
    };

    if (this.edicaoApostila) {
      this.apostilaService.atualizar(this.edicaoApostila.id, data).subscribe({
        next: () => {
          this.router.navigate(['/apostilas']);
        },
        error: () => console.log('Erro ao atualizar apostila.')
      });
    } else {
      this.apostilaService.criar(data).subscribe({
        next: () => {
          this.router.navigate(['/apostilas']);
        },
        error: () => console.log('Erro ao cadastrar apostila.')
      });
    }
  }

  get f() {
    return this.form.controls;
  }
}
