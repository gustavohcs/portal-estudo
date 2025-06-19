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
import { QuestaoService } from '../../../services/questao.service';
import { Questao } from '../../../models/questao.model';
import { HttpClientModule } from '@angular/common/http';
import Quill from 'quill';
import { QuillEditorComponent } from '../../quill/quill-editor.component';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-cadastro-questao',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, QuillEditorComponent, RouterLink ],
  templateUrl: './cadastro-questao.component.html',
  styleUrls: ['./cadastro-questao.component.scss']
})
export class CadastroQuestaoComponent implements OnInit {  // Adicionando AfterViewInit
  form!: FormGroup<{
    numero: FormControl<number | null>;
    topico: FormControl<string | null>;
    materia: FormControl<string | null>;
    ano: FormControl<number | null>;
    pergunta: FormControl<string | null>;
    resposta: FormControl<string | null>;
    alternativaA: FormControl<string | null>;
    alternativaB: FormControl<string | null>;
    alternativaC: FormControl<string | null>;
    alternativaD: FormControl<string | null>;
    alternativaE: FormControl<string | null>;
  }>;
  edicaoQuestao: Questao | null = null;
  quillEditor: any;  // Para armazenar o editor do Quill

  @ViewChild(QuillEditorComponent, { static: false }) quillEditorRef!: QuillEditorComponent;

  constructor(
    private fb: FormBuilder,
    private questaoService: QuestaoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      numero: this.fb.control(1, [Validators.required, Validators.min(1)]),
      topico: this.fb.control('', Validators.required),
      materia: this.fb.control(localStorage.getItem('materia'), Validators.required),
      ano: this.fb.control(parseInt(localStorage.getItem('materiaAnoLetivo') || '6', 10), [Validators.required, Validators.min(1)]),
      pergunta: this.fb.control('', [Validators.required, Validators.minLength(10)]),
      resposta: this.fb.control('', [Validators.required]),
      alternativaA: this.fb.control('', [Validators.required]),
      alternativaB: this.fb.control('', [Validators.required]),
      alternativaC: this.fb.control('', [Validators.required]),
      alternativaD: this.fb.control('', [Validators.required]),
      alternativaE: this.fb.control('', [Validators.required])
    });

    const questaoJson = localStorage.getItem('questao');
    if (questaoJson) {
      this.edicaoQuestao = JSON.parse(questaoJson);
    }

    if (this.edicaoQuestao) {
      this.form.patchValue({
        numero: this.edicaoQuestao.numero,
        topico: this.edicaoQuestao.topico,
        materia: this.edicaoQuestao.materia,
        ano: this.edicaoQuestao.ano,
        pergunta: this.edicaoQuestao.pergunta,
        resposta: this.edicaoQuestao.resposta,
        alternativaA: this.edicaoQuestao.alternativaA,
        alternativaB: this.edicaoQuestao.alternativaB,
        alternativaC: this.edicaoQuestao.alternativaC,
        alternativaD: this.edicaoQuestao.alternativaD,
        alternativaE: this.edicaoQuestao.alternativaE
      });
      
    }

  }

     ngAfterViewInit(): void {
      if (this.quillEditorRef) {
        this.quillEditorRef.writeValue(this.edicaoQuestao?.pergunta);  
      }
    }

  cadastrar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = this.form.value;

    const data: Questao = {
      id: this.edicaoQuestao ? this.edicaoQuestao.id : 0,
      numero: formData.numero ?? 0,
      topico: formData.topico ?? null,
      materia: formData.materia ?? null,
      ano: formData.ano ?? null,
      pergunta: formData.pergunta ?? null,
      resposta: formData.resposta ?? null,
      alternativaA: formData.alternativaA ?? null,
      alternativaB: formData.alternativaB ?? null,
      alternativaC: formData.alternativaC ?? null,
      alternativaD: formData.alternativaD ?? null,
      alternativaE: formData.alternativaE ?? null,
    };
    if (this.edicaoQuestao) {
      this.questaoService.atualizar(this.edicaoQuestao.id, data).subscribe({
        next: () => {
          this.router.navigate(['/questoes']);
        },
        error: () => console.log('Erro ao atualizar questao.')
      });
    } else {
      this.questaoService.criar(data).subscribe({
        next: () => {
          this.router.navigate(['/questoes']);
        },
        error: () => console.log('Erro ao cadastrar questao.')
      });
    }
  }

  get f() {
    return this.form.controls;
  }
}
