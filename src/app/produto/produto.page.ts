import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Produto } from '../models/Produto';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage  {
  formProduto: FormGroup;
  produto: Produto = new Produto();

  mensagens = {
    nome: [
      { tipo: 'required', mensagem: 'O campo Nome é obrigatório!' },
      {
        tipo: 'minLength',
        mensagem: 'O campo Nome precisa ter pelo menos 3 caracteres.',
      },
    ],

    descricao: [{ tipo: 'required', mensagem: 'O campo DESCRIÇÃO é obrigatório!' }],

    validade: [{ tipo: 'required', mensagem: 'O campo VALIDADE é obrigatório!' }],

    preco: [
      { tipo: 'required', mensagem: 'É obrigatório informar o preço.' },
      {
        tipo: 'minlength',
        mensagem: 'O preço deve ter pelo menos 3 caracteres.',
      },
      {
        tipo: 'maxlength',
        mensagem: 'O preço deve ter no máximo 8 caractéres.',
      },
    ],
  };

  constructor(private formBuilder: FormBuilder, private storageService: StorageService, private route: Router ) {
    this.formProduto = this.formBuilder.group({
      nome: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      descricao: ['', Validators.compose([Validators.required])],
      validade: ['', Validators.compose([Validators.required, Validators.email])],
      preco: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(8),
        ]),
      ],

    });
  }


  async salvarProduto() {
    if(this.formProduto.valid){
      this.produto.nome = this.formProduto.value.nome;
      this.produto.descricao = this.formProduto.value.descricao;
      this.produto.validade = this.formProduto.value.validade;
      this.produto.preco = this.formProduto.value.preco;
      await this.storageService.set(this.produto.nome, this.produto);
      this.route.navigateByUrl('/tabs/tab1');
    }
    else{
      alert('Formulário inválido!');
    }
  }
}
