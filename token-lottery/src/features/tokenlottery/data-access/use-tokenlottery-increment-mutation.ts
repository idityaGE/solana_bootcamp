import { TokenlotteryAccount, getIncrementInstruction } from '@project/anchor'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill'
import { useMutation } from '@tanstack/react-query'
import { toastTx } from '@/components/toast-tx'
import { useTokenlotteryAccountsInvalidate } from './use-tokenlottery-accounts-invalidate'

export function useTokenlotteryIncrementMutation({
  account,
  tokenlottery,
}: {
  account: UiWalletAccount
  tokenlottery: TokenlotteryAccount
}) {
  const invalidateAccounts = useTokenlotteryAccountsInvalidate()
  const signAndSend = useWalletUiSignAndSend()
  const signer = useWalletUiSigner({ account })

  return useMutation({
    mutationFn: async () => await signAndSend(getIncrementInstruction({ tokenlottery: tokenlottery.address }), signer),
    onSuccess: async (tx) => {
      toastTx(tx)
      await invalidateAccounts()
    },
  })
}
