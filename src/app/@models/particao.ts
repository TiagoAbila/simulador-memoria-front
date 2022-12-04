import { Processo } from "./processo";
import { TipoAlocacao } from "./tipo-alocacao";

export class ParticoesDto {
    constructor(
        public particoes: number[] = [],
        public tamanhoMemoria: number = 0,
        public tipoAlocacao: TipoAlocacao
    ) {}
}

export class Particao {
    constructor(
        public enderecoDeInicio: number = 0,
        public tamanho: number = 0,
        public processo: Processo = new Processo,
        public free: boolean = true
    ){ }
}
