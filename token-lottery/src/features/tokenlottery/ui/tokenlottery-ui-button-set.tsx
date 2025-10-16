import { TokenlotteryAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'

import { useTokenlotterySetMutation } from '@/features/tokenlottery/data-access/use-tokenlottery-set-mutation'

export function TokenlotteryUiButtonSet({ account, tokenlottery }: { account: UiWalletAccount; tokenlottery: TokenlotteryAccount }) {
  const setMutation = useTokenlotterySetMutation({ account, tokenlottery })

  return (
    <Button
      variant="outline"
      onClick={() => {
        const value = window.prompt('Set value to:', tokenlottery.data.count.toString() ?? '0')
        if (!value || parseInt(value) === tokenlottery.data.count || isNaN(parseInt(value))) {
          return
        }
        return setMutation.mutateAsync(parseInt(value))
      }}
      disabled={setMutation.isPending}
    >
      Set
    </Button>
  )
}
