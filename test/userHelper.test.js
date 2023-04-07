const assert = require('assert');
const userHelperGet = require('../src/helpers/user/get')
const userHelperPost = require('../src/helpers/user/post')
const userHelperUpdate = require('../src/helpers/user/update')
const userHelperDelete = require('../src/helpers/user/delete')

describe('userHelpers', function () {

  it('não deve aceitar o name vazio', function () {
    const validacao = userHelperPost.validarDadosInsert('','')
    const expected = {
      status: 422,
      msg: 'O campo name não pode ser vazio'
    }
    assert.deepEqual(validacao, expected)
  });

  it('não deve aceitar o email vazio', function () {
    const validacao = userHelperPost.validarDadosInsert('josé','')
    const expected = {
      status: 422,
      msg: 'O campo email não pode ser vazio'
    }
    assert.deepEqual(validacao, expected)
  });

  it('deve passar os testes com status 200', function () {
    const validacao = userHelperPost.validarDadosInsert('josé','jose@gmail.com')
    const expected = {
      status: 200,
      msg: 'Campos validados com sucesso'
    }
    assert.deepEqual(validacao, expected)
  });

  it('não deve aceitar o id vazio', function () {
    const validacao = userHelperUpdate.validarDadosUpdate(null)
    const expected = {
      status: 422,
      msg: 'O campo id não pode ser vazio'
    }
    assert.deepEqual(validacao, expected)
  });

  it('não deve aceitar o id vazio', function () {
    const validacao = userHelperDelete.validarDadosDelete(null)
    const expected = {
      status: 422,
      msg: 'O campo id não pode ser vazio'
    }
    assert.deepEqual(validacao, expected)
  });

  it('deve cadastrar um novo usuario', async function () {

    const validacao = userHelperPost.validarDadosInsert('josé','jose@gmail.com')
    const expected = {
      status: 200,
      msg: 'Campos validados com sucesso'
    }
    assert.deepEqual(validacao, expected)

    const cadastro = await userHelperPost.criarUsuario('josé','jose@gmail.com')
    assert.deepEqual(
      200,
      cadastro.status
    )

    const _delete = await userHelperDelete.deletarUsuario(cadastro.data[0].id)
    assert.deepEqual(
      200,
      _delete.status
    )

  });

  it('deve dar problema ao tentar acadastrar um novo usuario com um email ja existente', async function () {

    const validacao = userHelperPost.validarDadosInsert('josé','jose@gmail.com')
    const expected = {
      status: 200,
      msg: 'Campos validados com sucesso'
    }
    assert.deepEqual(validacao, expected)

    const cadastro = await userHelperPost.criarUsuario('josé','jose@gmail.com')
    assert.deepEqual(
      200,
      cadastro.status
    )

    const cadastroEmailIgual = await userHelperPost.criarUsuario('josé','jose@gmail.com')
    assert.deepEqual(
      400,
      cadastroEmailIgual.status
    )

    const _delete = await userHelperDelete.deletarUsuario(cadastro.data[0].id)
    assert.deepEqual(
      200,
      _delete.status
    )

  });

  it('deve cadastrar e alterar sem nenhum erro', async function () {

    const validacao = userHelperPost.validarDadosInsert('josé','jose@gmail.com')
    const expected = {
      status: 200,
      msg: 'Campos validados com sucesso'
    }
    assert.deepEqual(validacao, expected)

    const cadastro = await userHelperPost.criarUsuario('josé','jose@gmail.com')
    assert.deepEqual(
      200,
      cadastro.status
    )

    const editarUsuario = await userHelperUpdate.alterarUsuario(cadastro.data[0].id, 'José Antonio', '')
    assert.deepEqual(
      200,
      editarUsuario.status
    )

    const _delete = await userHelperDelete.deletarUsuario(cadastro.data[0].id)
    assert.deepEqual(
      200,
      _delete.status
    )

  });

  it('deve dar erro de email duplicado', async function () {

    const validacao = userHelperPost.validarDadosInsert('josé','jose@gmail.com')
    const expected = {
      status: 200,
      msg: 'Campos validados com sucesso'
    }
    assert.deepEqual(validacao, expected)

    const cadastro1 = await userHelperPost.criarUsuario('josé','jose@gmail.com')
    assert.deepEqual(
      200,
      cadastro1.status
    )

    const cadastro2 = await userHelperPost.criarUsuario('antonio','antonio@gmail.com')
    assert.deepEqual(
      200,
      cadastro2.status
    )

    const editarUsuario = await userHelperUpdate.alterarUsuario(cadastro2.data[0].id, 'josé', 'jose@gmail.com')
    assert.deepEqual(
      400,
      editarUsuario.status
    )

    const _delete1 = await userHelperDelete.deletarUsuario(cadastro1.data[0].id)
    assert.deepEqual(
      200,
      _delete1.status,
      'Deveria deletar o primeiro usuario cadastrado mais não deletou'
    )

    const _delete2 = await userHelperDelete.deletarUsuario(cadastro2.data[0].id)
    assert.deepEqual(
      200,
      _delete2.status,
      'Deveria deletar o segundo usuario cadastrado mais não deletou'
    )

  });

  it('deve trazer a quantidade de usuarios cadastrados correto', async function () {

    const cadastro1 = await userHelperPost.criarUsuario('josé','jose@gmail.com')
    assert.deepEqual(
      200,
      cadastro1.status
    )

    const cadastro2 = await userHelperPost.criarUsuario('antonio','antonio@gmail.com')
    assert.deepEqual(
      200,
      cadastro2.status
    )

    const usuarios = await userHelperGet.listarUsuario({
      id: null
    })

    assert.deepEqual(
      2,
      usuarios.data[0].length
    )

    const _delete1 = await userHelperDelete.deletarUsuario(cadastro1.data[0].id)
    assert.deepEqual(
      200,
      _delete1.status,
      'Deveria deletar o primeiro usuario cadastrado mais não deletou'
    )

    const _delete2 = await userHelperDelete.deletarUsuario(cadastro2.data[0].id)
    assert.deepEqual(
      200,
      _delete2.status,
      'Deveria deletar o segundo usuario cadastrado mais não deletou'
    )

  });

});