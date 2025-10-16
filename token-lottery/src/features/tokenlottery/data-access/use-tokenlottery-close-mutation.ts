import { TokenlotteryAccount, getCloseInstruction } from '@project/anchor'
import { useMutation } from '@tanstack/react-query'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill'
import { toastTx } from '@/components/toast-tx'
import { useTokenlotteryAccountsInvalidate } from './use-tokenlottery-accounts-invalidate'

export function useTokenlotteryCloseMutation({ account, tokenlottery }: { account: UiWalletAccount; tokenlottery: TokenlotteryAccount }) {
  const invalidateAccounts = useTokenlotteryAccountsInvalidate()
  const signAndSend = useWalletUiSignAndSend()
  const signer = useWalletUiSigner({ account })

  return useMutation({
    mutationFn: async () => {
      return await signAndSend(getCloseInstruction({ payer: signer, tokenlottery: tokenlottery.address }), signer)
    },
    onSuccess: async (tx) => {
      toastTx(tx)
      await invalidateAccounts()
    },
  })
}
