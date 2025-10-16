// Here we export some useful types and functions for interacting with the Anchor program.
import { Account, getBase58Decoder, SolanaClient } from 'gill'
import { getProgramAccountsDecoded } from './helpers/get-program-accounts-decoded'
import { Tokenlottery, TOKENLOTTERY_DISCRIMINATOR, TOKENLOTTERY_PROGRAM_ADDRESS, getTokenlotteryDecoder } from './client/js'
import TokenlotteryIDL from '../target/idl/tokenlottery.json'

export type TokenlotteryAccount = Account<Tokenlottery, string>

// Re-export the generated IDL and type
export { TokenlotteryIDL }

export * from './client/js'

export function getTokenlotteryProgramAccounts(rpc: SolanaClient['rpc']) {
  return getProgramAccountsDecoded(rpc, {
    decoder: getTokenlotteryDecoder(),
    filter: getBase58Decoder().decode(TOKENLOTTERY_DISCRIMINATOR),
    programAddress: TOKENLOTTERY_PROGRAM_ADDRESS,
  })
}
