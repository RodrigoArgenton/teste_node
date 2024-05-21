import express from 'express';
import { searchDB, insertDB } from '../database/dbUser.js';
import validationUser from '../validator/controllers.js'; // Ajuste o caminho conforme necessário

const app = express();
// Middleware para analisar o corpo das requisições como JSON
app.use(express.json());

app.get('/users', async (req, res) => {
    try {
        const users = await searchDB();
        return res.setHeader('Content-Type', 'application/json').json(users);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.post('/users', async (req, res) => {
    const { name, email } = req.body;

    try {
        const schema = validationUser();
        await schema.validateAsync(req.body, { abortEarly: false }); // abortEarly= false, faz com que não retorne somente um erro, caso exista mais de um 

        await insertDB(name, email);
        return res.status(201).json({ message: 'Cadastro realizado com sucesso!' });
    } catch (err) {
        if (err.isJoi) {
            // Retorna os erros existentes
            return res.status(400).json({
                error: err.details.map(detail => ({
                    message: detail.message,
                    path: detail.path,
                }))
            });
        } else {
            console.error(err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
});

// Configuração de porta
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
