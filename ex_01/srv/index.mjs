import { createServer } from 'http'
import { fileURLToPath } from 'url'
import path from 'path'
import express from 'express'
import { config } from 'dotenv'
import { MongoClient } from 'mongodb'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const portNumber = 4200
const app = express()
const server = createServer(app)

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/client', clientRoute)

config()
const url = process.env.MONGO_DB_URI
const client = new MongoClient(url, {
  serverApi: {
    version: '1',
    deprecationErrors: true,
  },
})

async function run() {
  try {
    const database = client.db('exec')
    const lpt = database.collection('lpt')
    await lpt.createIndex({ postTitle: 'text' })

    let handlePost = async function (request, response) {
      await client.connect()
      let subreddit = request.body.sub === 'ysk' ? 'YouShouldKnow' : 'LifeProTips'
      const query = {
        $text: { $search: request.body.text },
        subreddit,
      }
      const projection = {
        _id: 0,
        postTitle: 1,
        postUrl: 1,
        author: 1,
        score: 1
      }
      const res = await lpt.find(query).project(projection).limit(10).toArray()
      response.send(res)
    }
    app.use('/postForm', handlePost)
  } catch (error) {
    console.error('error:', error)
  } finally {
    await client.close()
  }
}

run()

server.listen(portNumber, () => console.log(`listening on port: ${portNumber}`))

app.get('/', (req, res) => {
  res.send('<p>You are looking for <a href="client.html">this</a>.</p>')
})

function clientRoute(req, res, next) {
  res.sendFile(__dirname + '/public/client.html')
}
