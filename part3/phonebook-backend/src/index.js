const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

app.use(express.static('build'))
app.use(express.json())
 app.use((req, res, next) => {
     morgan.token('body', request => request?JSON.stringify(request.body):null)
    next();
  });
app.use(morgan(':method :url :status :response-time ms - :body'))
app.use(cors())


app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

const generateId = () => {
    return Math.round(Math.random()*0xffffffff)
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    morgan.token('body', request => JSON.stringify(request.body))

    if (!body.name | !body.number) {
        return response.status(400).json({ 
            error: 'missing data' 
        })
    }
    if (persons.some(person => person.name === body.name)) {
        return response.status(400).json({ 
            error: 'name must be unique' 
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        //important: body.important || false,
        date: new Date(),
        id: generateId(),
    }

    persons = persons.concat(person)

    response.json(person)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
