// Here we export some useful types and functions for interacting with the Anchor program.
import { Account, getBase58Decoder, SolanaClient } from 'gill'
import { getProgramAccountsDecoded } from './helpers/get-program-accounts-decoded'
import { TokenLottery, TOKEN_LOTTERY_DISCRIMINATOR, TOKENLOTTERY_PROGRAM_ADDRESS, getTokenLotteryDecoder } from './client/js'
import TokenLotteryIDL from '../target/idl/tokenlottery.json'

export type TokenLotteryAccount = Account<TokenLottery, string>

// Re-export the generated IDL and type
export { TokenLotteryIDL }

export * from './client/js'

export function getTokenLotteryProgramAccounts(rpc: SolanaClient['rpc']) {
  return getProgramAccountsDecoded(rpc, {
    decoder: getTokenLotteryDecoder(),
    filter: getBase58Decoder().decode(TOKEN_LOTTERY_DISCRIMINATOR),
    programAddress: TOKENLOTTERY_PROGRAM_ADDRESS,
  })
}
