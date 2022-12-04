import { Particao } from "./particao";

export class Processo {
    constructor(
        public nome: string = '',
        public tamanho: number = 0,
        public duracao: number = 0
    ) { }
}

export class AlocarProcessoDto {
    constructor(
        public processo: Processo = new Processo,
        public particaoList: Particao[] = []
    ) { }
}

export class DesalocarProcessoDto {
    constructor(
        public index: number = 0,
        public particaoList: Particao[] = []
    ) { }
}