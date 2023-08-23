const { contas } = require("./dados/bancodedados")

const validarSenhaBanco = (req, res, next) => {
    const { senha_banco } = req.query

    if (!senha_banco) {
        return res.status(401).json({ mensagem: 'A senha é um campo obrigatório.' })
    }

    if (senha_banco !== 'Cubos123Bank') {
        return res.status(403).json({ mensagem: 'A senha está incorreta.' })
    }
    next()
}

const validarPreenchimento = (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos são de preenchimento obrigatório (nome, CPF, data de nascimento, telefone, email e senha).' })
    }
    next()
}

//Inicialmente ia deixar todos os motivos de erro discriminados, achei que seria melhor para o usuário saber exatamente qual é o erro.
//Depois achei que poderia ser ruim por permitir a pessoa incorrer em erros repetidamente, deixando campos vazios.
//Transformei em uma mensagem só, mas especificando todos os campos necessários.
const verificarDadosRepetidos = (req, res, next) => {
    const { cpf, email } = req.body

    const cpfRepetido = contas.find(conta => conta.usuario.cpf == cpf)

    const emailRepetido = contas.find(conta => conta.usuario.email == email)

    if (cpfRepetido || emailRepetido) {
        return res.status(400).json({ mensagem: 'Já existe conta cadastrada com o CPF ou email informado!' })
    }

    next()
}

const validarSenhaConta = (req, res, next) => {
    const { senha, numero_conta } = req.body

    if (!senha) {
        return res.status(401).json({ mensagem: 'A senha é campo obrigatório.' })
    }

    const contaParaSaque = contas.find(conta => conta.numero == numero_conta)

    if (!contaParaSaque) {
        return res.status(404).json({ mensagem: 'A conta não foi encontrada.' })
    }

    if (senha !== contaParaSaque.usuario.senha) {
        return res.status(403).json({ mensagem: 'A senha está incorreta.' })
    }
    next()
}

module.exports = {
    validarSenhaBanco,
    validarPreenchimento,
    verificarDadosRepetidos,
    validarSenhaConta
}