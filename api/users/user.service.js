const pool = require('../../confg/database');
//console.log(process.env);
module.exports = {
    create: (data, callBack) => {
        pool.query(
          `insert into registration(firstName, lastName, gender, email, password, number) 
                    values(?,?,?,?,?,?)`,
          [
            data.first_name,
            data.last_name,
            data.gender,
            data.email,
            data.password,
            data.number
          ],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
      getUsers: callBack => {
        pool.query(
            `select * from registration`, 
            [],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }

                return callBack(null, results);
            }
        );
      },
      getUserByUserId: (id, callBack) => {
          pool.query(
              `select * from registration where id = ?`,
              [id],
              (error, results, fields) => {
                if(error){
                    return callBack(error);
                }

                return callBack(null, results[0]);
              }
          );
      },
      updateUser: (data, callBack) => {
          //console.log(data);
          pool.query(
              `update registration set firstName = ?, lastName = ?, gender = ?, email = ?, password = ?, number = ? where id = ?`,
              [
                  data.first_name,
                  data.last_name,
                  data.gender,
                  data.email,
                  data.password,
                  data.number,
                  data.id
              ],
              (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                //console.log(results[0]);
                return callBack(null, results);
              }
          );
      },
      deleteUser: (id, callBack) => {
          pool.query(
              `delete from registration where id = ?`,
              [id],
              (error, results, fields) => {
                  if(error){
                    return callBack(error);
                  }

                  return callBack(null, results);
              }
          );
      },
      getUserByUserEmail: (email, callBack) => {
        //console.log(email);
        pool.query(
          `select * from registration where email = ?`,
          [email],
          (error, results, fields) => {
            if(error){
              return callBack(error);
            }

            return callBack(null, results[0]);
          });
      }
}