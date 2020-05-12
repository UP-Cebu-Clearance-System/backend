const { Database, OPEN_READWRITE } = require('sqlite3').verbose()

const db = new Database(`./clearance.sqlite`, OPEN_READWRITE, err => {
    if(err){
        console.log(`Can't connect to the database.`)
        console.log(err)
    } else {
        console.log(`Connected to the database.`)
    }
})

module.exports = { db }