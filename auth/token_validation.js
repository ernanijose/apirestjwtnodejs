const { verify } = require('jsonwebtoken');

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("Authorization");
        if(token){
            token = token.slice(7);
            verify(token, "secret123456", (err, decoded) => {
                if(err){
                    res.status(401).json({
                        success: 0,
                        message: "Token invalido!, usuario não autorizado"
                    });
                }else{
                    next();
                }     
            });
        }else{
            res.status(401).json({
                success: 0,
                message: "Acesso negado!, usuario não autorizado"
            });
        }
    }
}