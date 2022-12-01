import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage  {
  formCadastro: FormGroup;

  mensagens = {
    nome: [
      { tipo: 'required', mensagem: 'O campo Nome é obrigatório!' },
      {
        tipo: 'minLength',
        mensagem: 'O campo Nome precisa ter pelo menos 3 caracteres.',
      },
    ],

    cpf: [{ tipo: 'required', mensagem: 'O campo CPF é obrigatório!' }],

    email: [{ tipo: 'required', mensagem: 'O campo E-mail é obrigatório!' }],

    senha: [
      { tipo: 'required', mensagem: 'É obrigatório confirmar senha.' },
      {
        tipo: 'minlength',
        mensagem: 'A senha deve ter pelo menos 6 caracteres.',
      },
      {
        tipo: 'maxlength',
        mensagem: 'A senha deve ter no máximo 8 caractéres.',
      },
    ],
    confirmasenha: [
      { tipo: 'required', mensagem: 'É obrigatório confirmar senha.' },
      {
        tipo: 'minlength',
        mensagem: 'A senha deve ter pelo menos 6 caracteres.',
      },
      {
        tipo: 'maxlength',
        mensagem: 'A senha deve ter no máximo 8 caractéres.',
      },
    ],
  };

  constructor(private formBuilder: FormBuilder) {
    this.formCadastro = this.formBuilder.group({
      nome: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      cpf: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(8),
        ]),
      ],
      confirmarsenha: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(8),
        ]),
      ],
    });
  }


  salvarCadastro() {
    console.log('Formulário: ', this.formCadastro.valid);
  }
}
