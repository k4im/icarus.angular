import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timestamp } from 'rxjs';
import { CriarProjetoDTO, Produto, Projeto } from 'src/app/Interfaces/IProjetos';
import { ProjetosService } from 'src/app/services/projetos.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators, FormControlOptions } from '@angular/forms';
@Component({
  selector: 'app-novo-projeto',
  templateUrl: './novo-projeto.component.html',
  styleUrls: ['./novo-projeto.component.scss'],
})
export class NovoProjetoComponent implements OnInit {

  regexDate = new RegExp('/^\d{2}\/\d{2}\/\d{4}$/')
  formGroupProjetos!: FormGroup;

  Status: { status: string }[] = [{ status: "Produção" }, { status: "Pendente" }, { status: "Atrasado" }, { status: "Cancelado" },]
  ProdutosEmEstoque: Produto[] = []


  aguardandoDados: boolean = true;
  projetoEnviado: boolean = false;

  constructor(private router: Router,
    private projetoService: ProjetosService,
    private pipe: DatePipe,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buscarProdutos();
    this.formGroupProjetos = this.formBuilder.group({
      dataInicio: [null, [Validators.pattern(this.regexDate)]],
      dataEntrega: [null, [Validators.pattern(this.regexDate)]],
      nome: [null, [Validators.required]],
      valor: [null, [Validators.required]],
      quantidade: [null, [Validators.required]],
      status: [null, [Validators.required]],
      produto: [null, [Validators.required]],
      descricao: [null, [Validators.required]]
    })
  }
  submitProjeto() {
    let projeto: CriarProjetoDTO = {
      nome: this.nomeGetter.value,
      dataEntrega: this.pipe.transform(this.dataInicioGetter.value, "yyyy-MM-ddThh:mm:ss.SSS"),
      dataInicio: this.pipe.transform(this.dataEntregaGetter.value, "yyyy-MM-ddThh:mm:ss.SSS"),
      descricao: this.descricaoGetter.value,
      produtoUtilizadoId: this.produtoGetter.value,
      status: this.statusGetter.value,
      quantidadeUtilizado: this.quantidadeGetter.value,
      valor: this.valorGetter.value
    }
    if (this.validarCampos()) {
      this.criarProjeto(projeto);
      this.router.navigate(['/projetos'])
    }
  }

  // Função caso deseje cancelar a criação de um projeto
  redirecionar() {
    this.router.navigate(["/projetos"])
  }

  buscarProdutos() {
    this.projetoService.buscarTodosProdutos().subscribe(
      (result) => {
        this.ProdutosEmEstoque = result
        this.aguardandoDados = false

      },
      erro => {
        if (erro.status === 0) {
          console.log("Não foi possivel realizar a comunicação!")
        }

        if (erro.status === 400) {
          console.log("O dado enviado é invalido!")
        }
        if (erro.status === 404) {
          console.log("Nenhum projeto foi encontrado!")
        }
        if (erro.status === 500) {
          console.log("Houve um erro no servidor!")
        }
      }

    )
  }

  validarCampos(): boolean {
    let value = (!this.formGroupProjetos.get('dataInicio')?.valid && !this.formGroupProjetos.get('dataEntrega')?.valid
      && this.formGroupProjetos.get('nome')?.valid && this.formGroupProjetos.get('status')?.valid
      && this.formGroupProjetos.get('valor')?.valid && this.formGroupProjetos.get('produto')?.valid
      && this.formGroupProjetos.get('quantidade')?.valid && this.formGroupProjetos.get('descricao')?.valid) ? true : false;
    return value;
  }
  criarProjeto(projeto: CriarProjetoDTO) {
    this.projetoService.novoProjeto(projeto).subscribe((result) => { console.log("Projeto criado com sucesso") },
      error => {
        console.log(error);
      }
    );
  }
  /** Getters dos campos propridades do formulário */

  get dataInicioGetter() {
    return this.formGroupProjetos.get("dataInicio")!
  }
  get dataEntregaGetter() {
    return this.formGroupProjetos.get("dataEntrega")!
  }
  get nomeGetter() {
    return this.formGroupProjetos.get('nome')!
  }
  get valorGetter() {
    return this.formGroupProjetos.get('valor')!
  }
  get quantidadeGetter() {
    return this.formGroupProjetos.get('quantidade')!
  }
  get statusGetter() {
    return this.formGroupProjetos.get('status')!
  }
  get produtoGetter() {
    return this.formGroupProjetos.get('produto')!
  }
  get descricaoGetter() {
    return this.formGroupProjetos.get('descricao')!
  }
}
