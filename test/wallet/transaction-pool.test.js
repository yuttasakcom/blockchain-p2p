const TransactionPool = require('../../src/wallet/transaction-pool')
const Transaction = require('../../src/wallet/transaction')
const Wallet = require('../../src/wallet')
// const Blockchain = require('../../src/blockchain/blockchain')

describe('TransactionPool', () => {
  let tp, wallet, bc, transaction

  beforeEach(() => {
    tp = new TransactionPool()
    wallet = new Wallet()
    // bc = new Blockchain()
    transaction = Transaction.newTransaction(wallet, 'r4nd-4dr355', 30)
    tp.updateOrAddTransaction(transaction)
  })

  it('adds a transaction to the pool', () => {
    expect(tp.transactions.find(t => t.id === transaction.id)).toEqual(
      transaction
    )
  })
})
