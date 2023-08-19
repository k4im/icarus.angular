/** Interface de projetos que irá trazer os dados mapeados da api */
export interface Projeto {
    id: number,
    nome: string,
    status: string,
    dataInicio: string,
    dataEntrega: string,
    valor: number
}
/** Interface de response que trará os dados da API */
export interface Projetos {
    data: Projeto[],
    totalDePaginas: number,
    paginaAtual: number,
    totalItens: number
}
export interface Produto {
    id: number,
    nome: string,
    quantidade: number
}

export interface CriarProjetoDTO {
    nome: string,
    status: string,
    dataInicio: string | null,
    dataEntrega: string | null,
    produtoUtilizadoId: number,
    quantidadeUtilizado: number,
    descricao: string,
    valor: number
}