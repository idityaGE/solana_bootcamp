import { TokenlotteryAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'
import { useTokenlotteryIncrementMutation } from '../data-access/use-tokenlottery-increment-mutation'

export function TokenlotteryUiButtonIncrement({ account, tokenlottery }: { account: UiWalletAccount; tokenlottery: TokenlotteryAccount }) {
  const incrementMutation = useTokenlotteryIncrementMutation({ account, tokenlottery })

  return (
    <Button variant="outline" onClick={() => incrementMutation.mutateAsync()} disabled={incrementMutation.isPending}>
      Increment
    </Button>
  )
}
