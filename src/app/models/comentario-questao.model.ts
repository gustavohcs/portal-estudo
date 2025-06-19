export interface ComentarioQuestao {
  id: number;
  idQuestao: number;
  idUsuario: number;
  idComentario?: number;
  respostaParaIdComentario?: number;
  mensagem: string;
  creationDate: Date; 
  updateDate: Date;
}
