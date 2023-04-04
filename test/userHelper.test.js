const assert = require('assert');

const userHelper = require('../src/helpers/user/post')

describe('userHelper', function () {

  it('não deve aceitar o name vazio', function () {
    const validacao = userHelper.validarDados('','')
    const expected = {
      status: 422,
      msg: 'O campo name não pode ser vazio'
    }
    assert.deepEqual(validacao, expected)
  });

  it('não deve aceitar o email vazio', function () {
    const validacao = userHelper.validarDados('josé','')
    const expected = {
      status: 422,
      msg: 'O campo email não pode ser vazio'
    }
    assert.deepEqual(validacao, expected)
  });

  it('deve passar os testes com status 200', function () {
    const validacao = userHelper.validarDados('josé','jose@gmail.com')
    const expected = {
      status: 200,
      msg: 'Campos validados com sucesso'
    }
    assert.deepEqual(validacao, expected)
  });

});