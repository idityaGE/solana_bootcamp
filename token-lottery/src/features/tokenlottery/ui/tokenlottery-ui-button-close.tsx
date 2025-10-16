import { TokenlotteryAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'

import { useTokenlotteryCloseMutation } from '@/features/tokenlottery/data-access/use-tokenlottery-close-mutation'

export function TokenlotteryUiButtonClose({ account, tokenlottery }: { account: UiWalletAccount; tokenlottery: TokenlotteryAccount }) {
  const closeMutation = useTokenlotteryCloseMutation({ account, tokenlottery })

  return (
    <Button
      variant="destructive"
      onClick={() => {
        if (!window.confirm('Are you sure you want to close this account?')) {
          return
        }
        return closeMutation.mutateAsync()
      }}
      disabled={closeMutation.isPending}
    >
      Close
    </Button>
  )
}
