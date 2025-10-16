import { TOKENLOTTERY_PROGRAM_ADDRESS } from '@project/anchor'
import { AppExplorerLink } from '@/components/app-explorer-link'
import { ellipsify } from '@wallet-ui/react'

export function TokenlotteryUiProgramExplorerLink() {
  return <AppExplorerLink address={TOKENLOTTERY_PROGRAM_ADDRESS} label={ellipsify(TOKENLOTTERY_PROGRAM_ADDRESS)} />
}
