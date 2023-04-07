const assert = require('assert');
const postHelperGet = require('../src/helpers/postUser/get')
const postHelperPost = require('../src/helpers/postUser/post')
const postHelperUpdate = require('../src/helpers/postUser/put')
const postHelperDelete = require('../src/helpers/postUser/delete')

const userHelperGet = require('../src/helpers/user/get')
const userHelperPost = require('../src/helpers/user/post')
const userHelperUpdate = require('../src/helpers/user/update')
const userHelperDelete = require('../src/helpers/user/delete')

describe('userHelpers', function () {

  it('não deve aceitar sem o usuarioId', async function () {

    const validacao = await postHelperPost.validarDadosInsert(
      null,
      'post de teste'
    )
    assert.deepEqual(
      validacao.status,
      422,
      'não deveria deixar passar sem um usuario id vinculado mais deixou'
    )

  });

  it('não deve aceitar sem o conteudo', async function () {

    const validacao = await postHelperPost.validarDadosInsert(
      1,
      ''
    )
    assert.deepEqual(
      validacao.status,
      422,
      'não deveria deixar passar sem op conteúdo do post mais deixou'
    )

  });

  it('deve cadastrar corretamente o post', async function () {


    const criandoUsuario = await userHelperPost.criarUsuario('josé','jose@gmail.com')
    assert.deepEqual(
      200,
      criandoUsuario.status
    )

    const criandoPost = await postHelperPost.criarPost(
      'post de teste',
      criandoUsuario.data[0].id
    )
    assert.deepEqual(
      200,
      criandoPost.status
    )

    const deletandoPost = await postHelperDelete.deletarPost(criandoPost.data[0].id)
    assert.deepEqual(
      200,
      deletandoPost.status
    )

    const deletandoUsuario = await userHelperDelete.deletarUsuario(criandoUsuario.data[0].id)
    assert.deepEqual(
      200,
      deletandoUsuario.status
    )

  });

  it('deve alterar corretamente o post', async function () {

    const criandoUsuario = await userHelperPost.criarUsuario('josé','jose@gmail.com')
    assert.deepEqual(
      200,
      criandoUsuario.status
    )

    const criandoPost = await postHelperPost.criarPost(
      'post de teste',
      criandoUsuario.data[0].id
    )
    assert.deepEqual(
      200,
      criandoPost.status
    )

    const alterandoPost = await postHelperUpdate.alterarPost(
      criandoPost.data[0].id,
      'teste alteração post',
      criandoUsuario.data[0].id
    )
    assert.deepEqual(
      200,
      alterandoPost.status
    )

    const deletandoPost = await postHelperDelete.deletarPost(criandoPost.data[0].id)
    assert.deepEqual(
      200,
      deletandoPost.status
    )

    const deletandoUsuario = await userHelperDelete.deletarUsuario(criandoUsuario.data[0].id)
    assert.deepEqual(
      200,
      deletandoUsuario.status
    )

  });

});