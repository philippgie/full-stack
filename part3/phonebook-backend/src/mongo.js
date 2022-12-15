const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password> <name> <number>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://philipp:${password}@cluster1.wrsm1yx.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number:String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length===5){
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })
    person.save()
        .then(result => {
            mongoose.connection.close()
        })
}else{
    Person.find({})
        .then(result => {
            console.log("phonebook:")
            result.forEach(person => {
                console.log(person.name, person.number)
            })
            mongoose.connection.close()
        })
}
