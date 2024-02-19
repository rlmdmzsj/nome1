const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
    const userInput = req.body.message;
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'Você é um assistente útil projetado para integrar OpenAI GPT e qualquer blog Wordpress com códigos em um repositório no Github.' },
                { role: 'user', content: userInput }
            ]
        })
    });

    const data = await response.json();
    const assistantResponse = data.choices[0].message.content;
    res.json({ message: assistantResponse });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
