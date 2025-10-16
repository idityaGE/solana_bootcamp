import { TokenlotteryAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'

import { useTokenlotteryDecrementMutation } from '../data-access/use-tokenlottery-decrement-mutation'

export function TokenlotteryUiButtonDecrement({ account, tokenlottery }: { account: UiWalletAccount; tokenlottery: TokenlotteryAccount }) {
  const decrementMutation = useTokenlotteryDecrementMutation({ account, tokenlottery })

  return (
    <Button variant="outline" onClick={() => decrementMutation.mutateAsync()} disabled={decrementMutation.isPending}>
      Decrement
    </Button>
  )
}
