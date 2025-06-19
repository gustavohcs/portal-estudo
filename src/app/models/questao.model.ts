export interface Questao {
  id: number;
  numero: number | null;
  topico: string | null;
  materia: string | null;
  ano: number | null;
  pergunta: string | null;
  resposta: string | null;
  alternativaA: string | null;
  alternativaB: string | null;
  alternativaC: string | null;
  alternativaD: string | null;
  alternativaE: string | null;
}
