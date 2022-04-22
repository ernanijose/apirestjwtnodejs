require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");

app.use(express.json());
app.use("/api/users", userRouter);
// app.get("/api", (req, res) => {
//     res.status(200).json({
//         success: 1,
//         message: "API está funcionando..."
//     });
// });

const PORT = process.env.PORT_APP;

app.listen(PORT, () => {
    console.log(`O Servidor está funcionando na porta ${PORT}`);
});