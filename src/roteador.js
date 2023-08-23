const express = require('express')
const { listarContas, criarConta, alterarConta, excluirConta, depositarEmConta, sacarDeConta, transferir, consultarSaldo, consultarExtrato } = require('./controladores/transacoes')
const { validarSenhaBanco, validarPreenchimento, verificarDadosRepetidos, validarSenhaConta } = require('./intermediarios')
const rotas = express()

rotas.get('/contas', validarSenhaBanco, listarContas)
rotas.get('/contas/saldo', consultarSaldo)
rotas.get('/contas/extrato', consultarExtrato)
rotas.post('/contas', validarPreenchimento, verificarDadosRepetidos, criarConta)
rotas.post('/transacoes/depositar', depositarEmConta)
rotas.post('/transacoes/sacar', validarSenhaConta, sacarDeConta)
rotas.post('/transacoes/transferir', transferir)
rotas.put('/contas/:numeroConta/usuario', validarPreenchimento, verificarDadosRepetidos, alterarConta)
rotas.delete('/contas/:numeroConta', excluirConta)

module.exports = rotas