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
    totalItens: number
}