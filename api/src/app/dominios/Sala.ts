export class Sala {
  partidas: Partida[];
  jogadores: SessãoDeJogo[];
}

export class Partida {
  categorias: CategoriaNaPartida[];
  rodadas: Rodada[];
  pontuaçãoDeFinalização: number;
  ativa: boolean;
}

class CategoriaNaPartida {
  idCategoria: string;
  partida: Partida;
}

export class SessãoDeJogo {
  idJogador: string;
  sala: Sala;
  ativa: boolean;
}

class Rodada {
  partida: Partida;
  finalizada: boolean;
  respostas: Resposta[];
}

class Resposta {
  categoria: CategoriaNaPartida;
  rodada: Rodada;
  jogador: SessãoDeJogo;
  termo: string;
  éValido: boolean;
  validar: () => boolean;
}
