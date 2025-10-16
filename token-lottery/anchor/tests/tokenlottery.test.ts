import {
  Blockhash,
  createSolanaClient,
  createTransaction,
  generateKeyPairSigner,
  Instruction,
  isSolanaError,
  KeyPairSigner,
  signTransactionMessageWithSigners,
} from 'gill'
import {
  fetchTokenlottery,
  getCloseInstruction,
  getDecrementInstruction,
  getIncrementInstruction,
  getInitializeInstruction,
  getSetInstruction,
} from '../src'
// @ts-ignore error TS2307 suggest setting `moduleResolution` but this is already configured
import { loadKeypairSignerFromFile } from 'gill/node'

const { rpc, sendAndConfirmTransaction } = createSolanaClient({ urlOrMoniker: process.env.ANCHOR_PROVIDER_URL! })

describe('tokenlottery', () => {
  let payer: KeyPairSigner
  let tokenlottery: KeyPairSigner

  beforeAll(async () => {
    tokenlottery = await generateKeyPairSigner()
    payer = await loadKeypairSignerFromFile(process.env.ANCHOR_WALLET!)
  })

  it('Initialize Tokenlottery', async () => {
    // ARRANGE
    expect.assertions(1)
    const ix = getInitializeInstruction({ payer: payer, tokenlottery: tokenlottery })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSER
    const currentTokenlottery = await fetchTokenlottery(rpc, tokenlottery.address)
    expect(currentTokenlottery.data.count).toEqual(0)
  })

  it('Increment Tokenlottery', async () => {
    // ARRANGE
    expect.assertions(1)
    const ix = getIncrementInstruction({
      tokenlottery: tokenlottery.address,
    })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSERT
    const currentCount = await fetchTokenlottery(rpc, tokenlottery.address)
    expect(currentCount.data.count).toEqual(1)
  })

  it('Increment Tokenlottery Again', async () => {
    // ARRANGE
    expect.assertions(1)
    const ix = getIncrementInstruction({ tokenlottery: tokenlottery.address })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSERT
    const currentCount = await fetchTokenlottery(rpc, tokenlottery.address)
    expect(currentCount.data.count).toEqual(2)
  })

  it('Decrement Tokenlottery', async () => {
    // ARRANGE
    expect.assertions(1)
    const ix = getDecrementInstruction({
      tokenlottery: tokenlottery.address,
    })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSERT
    const currentCount = await fetchTokenlottery(rpc, tokenlottery.address)
    expect(currentCount.data.count).toEqual(1)
  })

  it('Set tokenlottery value', async () => {
    // ARRANGE
    expect.assertions(1)
    const ix = getSetInstruction({ tokenlottery: tokenlottery.address, value: 42 })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSERT
    const currentCount = await fetchTokenlottery(rpc, tokenlottery.address)
    expect(currentCount.data.count).toEqual(42)
  })

  it('Set close the tokenlottery account', async () => {
    // ARRANGE
    expect.assertions(1)
    const ix = getCloseInstruction({
      payer: payer,
      tokenlottery: tokenlottery.address,
    })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSERT
    try {
      await fetchTokenlottery(rpc, tokenlottery.address)
    } catch (e) {
      if (!isSolanaError(e)) {
        throw new Error(`Unexpected error: ${e}`)
      }
      expect(e.message).toEqual(`Account not found at address: ${tokenlottery.address}`)
    }
  })
})

// Helper function to keep the tests DRY
let latestBlockhash: Awaited<ReturnType<typeof getLatestBlockhash>> | undefined
async function getLatestBlockhash(): Promise<Readonly<{ blockhash: Blockhash; lastValidBlockHeight: bigint }>> {
  if (latestBlockhash) {
    return latestBlockhash
  }
  return await rpc
    .getLatestBlockhash()
    .send()
    .then(({ value }) => value)
}
async function sendAndConfirm({ ix, payer }: { ix: Instruction; payer: KeyPairSigner }) {
  const tx = createTransaction({
    feePayer: payer,
    instructions: [ix],
    version: 'legacy',
    latestBlockhash: await getLatestBlockhash(),
  })
  const signedTransaction = await signTransactionMessageWithSigners(tx)
  return await sendAndConfirmTransaction(signedTransaction)
}
