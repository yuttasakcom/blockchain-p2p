const express = require('express')
const app = express()

const Blockchain = require('./blockchain/blockchain')
const P2pServer = require('./blockchain/p2p-server')

const bc = new Blockchain()
const p2pServer = new P2pServer(bc)

app.set('port', process.env.PORT || '3000')
app.use(express.json())

app.get('/blocks', (req, res) => {
  res.json(bc.chain)
})

app.post('/mine', (req, res, next) => {
  const block = bc.addBlock(req.body.data)
  console.log(`New block added: ${block.toString()}`)

  p2pServer.syncChains()

  res.redirect('/blocks')
})

app.listen(app.get('port'), () => {
  console.log(`Server running at port:${app.get('port')}`)
})

p2pServer.listen()
