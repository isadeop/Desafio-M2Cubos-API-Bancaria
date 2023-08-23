const { contas, saques, depositos, transferencias } = require('../dados/bancodedados')

let idSequencial = 1
let saldoAberturaDeConta = 0

const listarContas = (req, res) => {
    if (contas.length === 0) {
        return res.status(200).json({ mensagem: 'Nenhuma conta encontrada.' })
    }

    return res.status(200).json(contas)
}

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    const novaConta = {
        numero: idSequencial,
        saldo: saldoAberturaDeConta,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    }

    contas.push(novaConta)
    idSequencial++
    return res.status(201).json()
}

const alterarConta = (req, res) => {
    const { numeroConta } = req.params
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    const contaAlterada = contas.find(conta => conta.numero == numeroConta)

    if (!contaAlterada) {
        return res.status(400).json({ mensagem: 'Não existe conta com o número informado.' })
    }

    contaAlterada.usuario.nome = nome
    contaAlterada.usuario.cpf = cpf
    contaAlterada.usuario.data_nascimento = data_nascimento
    contaAlterada.usuario.telefone = telefone
    contaAlterada.usuario.email = email
    contaAlterada.usuario.senha = senha

    return res.status(201).json()
}

const excluirConta = (req, res) => {
    const { numeroConta } = req.params

    const indexConta = contas.findIndex(conta => conta.numero == numeroConta)

    if (indexConta === -1) {
        return res.status(404).json({ mensagem: "Não existe conta com o número informado." })
    }

    if (contas[indexConta].saldo !== 0) {
        return res.status(400).json({ 'mensagem': 'A conta só pode ser removida se o saldo for zero!' })
    }
    contas.splice(indexConta, 1)
    return res.status(200).json()
}

const depositarEmConta = (req, res) => {
    const { numero_conta, valor } = req.body
    const valorDepositado = Number(valor)

    if (!numero_conta || valorDepositado <= 0 || !valorDepositado) {
        return res.status(400).json({ mensagem: 'Os campos número de conta e valor a depositar precisam estar preenchidos, e o valor a ser depositado não pode ser menor que zero.' })
    }

    const contaADepositar = contas.find(conta => conta.numero == numero_conta)

    if (!contaADepositar) {
        return res.status(404).json({ mensagem: 'A conta informada não existe. Gentileza inserir um número de conta válido para que o depósito seja efetuado.' })
    }

    const novoDepósito = {
        data: new Date().toLocaleString(),
        numero: numero_conta,
        valor: valorDepositado
    }

    depositos.push(novoDepósito)
    contaADepositar.saldo += valorDepositado
    return res.status(200).json()
}

const sacarDeConta = (req, res) => {
    const { numero_conta, valor } = req.body

    if (!valor || valor <= 0) {
        return res.status(401).json({ mensagem: 'O valor a sacar é campo obrigatório e precisa ser maior que zero.' })
    }

    const contaParaSaque = contas.find(conta => conta.numero == numero_conta)

    if (valor > contaParaSaque.saldo) {
        return res.status(400).json({ mensagem: 'Não será possível realizar o saque. Não existe saldo suficiente em conta.' })
    }

    const saqueRealizado = {
        data: new Date().toLocaleString(),
        numero: numero_conta,
        valor
    }

    saques.push(saqueRealizado)
    contaParaSaque.saldo -= valor
    return res.status(200).json()
}

const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body

    if (!numero_conta_destino || !numero_conta_origem || !valor || !senha) {
        return res.status(400).json({ mensagem: 'Os campos número da conta de origem, número da conta de destino, valor a transferir e senha são obrigatórios.' })
    }

    const contaDeOrigem = contas.find(conta => conta.numero == numero_conta_origem)
    const contaDestino = contas.find(conta => conta.numero == numero_conta_destino)

    if (!contaDeOrigem || !contaDestino) {
        return res.status(404).json({ mensagem: 'A conta de origem e/ou conta de destino não foram encontradas.' })
    }

    if (senha !== contaDeOrigem.usuario.senha) {
        return res.status(403).json({ mensagem: 'A senha está incorreta.' })
    }

    if (valor > contaDeOrigem.saldo) {
        return res.status(400).json({ mensagem: 'Não será possível realizar a transferência. Não existe saldo suficiente em conta.' })
    }


    const tranferenciaRealizada = {
        data: new Date().toLocaleString(),
        numero_conta_origem,
        numero_conta_destino,
        valor
    }

    transferencias.push(tranferenciaRealizada)
    contaDeOrigem.saldo -= valor
    contaDestino.saldo += valor
    return res.status(200).json()
}

const consultarSaldo = (req, res) => {
    const { numero_conta, senha } = req.query

    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: 'O número da conta e senha são informações obrigatórias.' })
    }

    const contaConsultar = contas.find(conta => conta.numero == numero_conta)

    if (!contaConsultar) {
        return res.status(404).json({ mensagem: 'Não foi encontrada conta com o número fornecido.' })
    }

    if (contaConsultar.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: 'A senha está incorreta.' })
    }

    return res.status(200).json(contaConsultar.saldo)
}

const consultarExtrato = (req, res) => {
    const { numero_conta, senha } = req.query

    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: 'O número da conta e senha são informações obrigatórias.' })
    }

    const contaExtrato = contas.find(conta => conta.numero == numero_conta)

    if (!contaExtrato) {
        return res.status(404).json({ mensagem: 'Não foi encontrada conta com o número fornecido.' })
    }

    if (contaExtrato.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: 'A senha está incorreta.' })
    }

    const extratoDepositos = depositos.filter(deposito => deposito.numero == numero_conta)
    const extratoSaques = saques.filter(saque => saque.numero == numero_conta)
    const transferenciasEnviadas = transferencias.filter(transferencia => transferencia.numero_conta_origem == numero_conta)
    const transferenciasRecebidas = transferencias.filter(transferencia => transferencia.numero_conta_destino == numero_conta)

    const transacoesConta = {
        depositos: extratoDepositos,
        saques: extratoSaques,
        transferenciasEnviadas,
        transferenciasRecebidas
    }

    return res.status(200).json(transacoesConta)
}

module.exports = {
    listarContas,
    criarConta,
    alterarConta,
    excluirConta,
    depositarEmConta,
    sacarDeConta,
    transferir,
    consultarSaldo,
    consultarExtrato
}