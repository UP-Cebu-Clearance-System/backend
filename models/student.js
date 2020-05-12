const { db } = require('../db')

function getStudent(id){
    const query = 'SELECT * from Student WHERE StudentID = ?'
    return new Promise(function(resolve, reject){
        db.get(query, [id], (err, rows) => {
            if(err) reject(err)
            else resolve(rows)
        })
    }) 
}

module.exports = { getStudent }