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
  transactionToBase64WithSigners,
} from 'gill'
import {
  fetchTokenLottery,
  getInitializeConfigInstructionAsync,
  getInitializeLotteryInstructionAsync,
  TOKENLOTTERY_PROGRAM_ADDRESS
} from '../src'
// @ts-ignore error TS2307 suggest setting `moduleResolution` but this is already configured
import { loadKeypairSignerFromFile } from 'gill/node'
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
    const ix = await getInitializeConfigInstructionAsync({
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
    const ix = await getInitializeLotteryInstructionAsync({
      payer: payer,
    });

    // ACT
    const signature = await sendAndConfirm({ ix, payer })
    console.log(signature)

    // ASSERT
    expect(signature).toBeDefined()
  })
})


async function sendAndConfirm({ ix, payer }: { ix: Instruction; payer: KeyPairSigner }) {
  const tx = createTransaction({
    feePayer: payer,
    instructions: [ix],
    version: 'legacy',
    latestBlockhash: await rpc.getLatestBlockhash().send().then(({ value }) => value),
  })
  const signedTransaction = await signTransactionMessageWithSigners(tx)

  console.log(await transactionToBase64WithSigners(signedTransaction))
  const signature = await sendAndConfirmTransaction(signedTransaction, { skipPreflight: true, commitment: 'confirmed' })
  console.log("Signature : ", signature)

  return signature
}
