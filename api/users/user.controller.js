const { 
    create,
    getUserByUserId,
    getUsers,
    updateUser,
    deleteUser,
    getUserByUserEmail
} = require('./user.service');

const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        //console.log(req.body);
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Erro na conexão com o banco de dados"                
                });
            }

            return res.status(200).json({
                sucess: 1,
                data: results
            });
        });
    },
    getUserByUserId: (req, res) => {
        const id = req.params.id;
        getUserByUserId(id, (err, results) => {
            if(err){
                console.log(err);
                return;
            }

            if(!results){
                return res.status(501).json({
                    success: 0,
                    message: "Não possivel encontrar o dado!"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if(err){
                console.log(err);
                return;
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    updateUser: (req, res) =>{
        const body = req.body;
        console.log(body);
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results)=> {
            if(err){
                console.log(err);
                return;
            }
            console.log(results);
            if(!results){
                return res.status(501).json({
                    success: 0,
                    message: "Não foi possivel encontrato a dado"
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Dado atualizado com sucess",
                data: results,
            });
        });
    },
    deleteUser: (req, res) => {
        const id = req.params.id;
        console.log(id);
        deleteUser(id, (err, results) => {
            if(err){
                console.log(err);
                return;
            }

            if(!results){
                return res.status(501).json({
                    sucess: 0,
                    message: "Não foi possivel excluir o dado selecionado"
                });
            }
            
            return res.status(200).json({
                success: 1,
                message: "Dado excluido com sucesso",
                data: results
            });
        });
    },
    login: (req, res) => {
        const body = req.body;
        //console.log(body);
        getUserByUserEmail(body.email, (err, results) =>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.status(403).json({
                    success: 0,
                    message: "E-mai ou Senha inválidos"
                });                
            }
            console.log(results);
            const result = compareSync(body.password, results.password);
            if(result){
                results.password = undefined;
                const jsontoken = sign({ result: results}, 'secret123456', { 
                    expiresIn: "1h"
                });

                return res.status(200).json({
                    success: 1,
                    message: "Login efetuado com sucesso",
                    token: jsontoken
                });
            }else{
                return res.status(403).json({
                    success: 0,
                    message: "E-mai ou Senha inválidos"
                }); 
            }
        });
    }
}