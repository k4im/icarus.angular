/** Interface Projeto paginado */
export interface Projeto {
    id: number,
    nome: string,
    status: string,
    dataInicio: string,
    dataEntrega: string,
    valor: number
}
/** Final interface Projeto paginado */

/** Interface de busca de Projeto por id */
export interface ProjetoUnico {
    id: number,
    nome: string,
    status: string,
    dataInicio: string,
    dataEntrega: string,
    produtoUtilizado: Produto,
    quantidadeUtilizado: number,
    descricao: string,
    valor: number
}
/** Final interface busca projeto id */


/** Interface de response vindo da API */
export interface Projetos {
    data: Projeto[],
    totalDePaginas: number,
    paginaAtual: number,
    totalItens: number
}
/** Final interface de response */

/** Interface de Produto */
export interface Produto {
    id: number,
    nome: string,
    quantidade: number
}
/** Final interface produto */

/** Interface DTO para envio de projeto novo */
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
/** Final interface DTO para envio de projeto */