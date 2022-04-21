const express = require('express');
const app = express();

app.get("/api", (req, res) => {
    res.status(200).json({
        success: 1,
        message: "API está funcionando..."
    });
});

const PORT = 3636 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`O Servidor está funcionando na porta ${PORT}`);
});