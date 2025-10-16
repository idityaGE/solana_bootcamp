import { Button } from '@/components/ui/button'
import { UiWalletAccount } from '@wallet-ui/react'

import { useTokenlotteryInitializeMutation } from '@/features/tokenlottery/data-access/use-tokenlottery-initialize-mutation'

export function TokenlotteryUiButtonInitialize({ account }: { account: UiWalletAccount }) {
  const mutationInitialize = useTokenlotteryInitializeMutation({ account })

  return (
    <Button onClick={() => mutationInitialize.mutateAsync()} disabled={mutationInitialize.isPending}>
      Initialize Tokenlottery {mutationInitialize.isPending && '...'}
    </Button>
  )
}
