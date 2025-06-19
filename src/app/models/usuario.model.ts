export interface Usuario {
  id: number;
  usuarioLogin: string | null;
  senha: string | null;
  role: string | null;
  nome: string | null;
  anoLetivo: number | null;
}
