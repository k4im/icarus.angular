export interface IProdutos {
    id: string,
    nome: string,
    quantidade: number,
    valor: number
}

export interface IProdutosPaginados {
    data: IProdutos[],
    totalDePaginas: number,
    paginaAtual: number,
    totaldeItens: number
}

export interface IProdutoNovo {
    nome: string,
    valor: number    
    quantidade: number,
}