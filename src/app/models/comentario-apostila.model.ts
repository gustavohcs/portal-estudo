export interface ComentarioApostila {
  id: number;
  idApostila: number;
  idUsuario: number;
  idComentario?: number;
  respostaParaIdComentario?: number;
  mensagem: string;
  creationDate: Date; 
  updateDate: Date;
}
