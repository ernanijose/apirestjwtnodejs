const { 
    create,
    getUserByUserId,
    getUsers,
    updateUser,
    deleteUser 
} = require('./user.service');

const { genSaltSync, hashSync } = require('bcrypt');

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
    }
}