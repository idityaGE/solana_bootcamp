import {
  Blockhash,
  createSolanaClient,
  createTransaction,
  generateKeyPairSigner,
  Instruction,
  isSolanaError,
  KeyPairSigner,
  signTransactionMessageWithSigners,
  getProgramDerivedAddress,
  Address,
  getU8Decoder
} from 'gill'
import {
  fetchTokenLottery,
  getInitConfigInstructionAsync,
  getInitLotteryInstructionAsync,
  TOKENLOTTERY_PROGRAM_ADDRESS
} from '../src'
// @ts-ignore error TS2307 suggest setting `moduleResolution` but this is already configured
import { loadKeypairSignerFromFile } from 'gill/node'
import { TOKEN_2022_PROGRAM_ADDRESS, TOKEN_METADATA_PROGRAM_ADDRESS } from 'gill/programs'

const { rpc, sendAndConfirmTransaction } = createSolanaClient({ urlOrMoniker: process.env.ANCHOR_PROVIDER_URL! })

describe('tokenlottery', () => {
  let payer: KeyPairSigner
  let tokenLottery: Address


  beforeAll(async () => {
    payer = await loadKeypairSignerFromFile(process.env.ANCHOR_WALLET!);
    const [tokenLotteryPDA] = await getProgramDerivedAddress({
      programAddress: TOKENLOTTERY_PROGRAM_ADDRESS,
      seeds: [Buffer.from('token_lottery')]
    })
    tokenLottery = tokenLotteryPDA;
  })

  it('should init config', async () => {
    // ARRANGE
    expect.assertions(1)
    const ix = await getInitConfigInstructionAsync({
      payer: payer,
      end: 1760724910,
      start: 1660724910,
      price: 100000000,
      tokenLottery: tokenLottery
    })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSERT
    const currentTokenlottery = await fetchTokenLottery(rpc, tokenLottery)
    expect(currentTokenlottery.data.winnerChosen).toEqual(false)
  })

  it('should init lottery', async () => {
    // ARRANGE
    expect.assertions(1)
    const ix = await getInitLotteryInstructionAsync({
      payer: payer,
    });

    // ACT
    const signature = await sendAndConfirm({ ix, payer })
    console.log(signature)
    
    // ASSERT
    expect(signature).toBeDefined()
  })
})

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
  return await sendAndConfirmTransaction(signedTransaction, { skipPreflight: true, commitment: 'confirmed' })
}
