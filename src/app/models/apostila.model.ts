export interface Apostila {
  id: number;
  capitulo: number | null;
  topico: string | null;
  materia: string | null;
  ano: number | null;
  conteudo: string | null;
  creationDate: Date;
  updateDate: Date;
}
