import { TokenlotteryAccount, getDecrementInstruction } from '@project/anchor'
import { useMutation } from '@tanstack/react-query'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill'
import { toastTx } from '@/components/toast-tx'
import { useTokenlotteryAccountsInvalidate } from './use-tokenlottery-accounts-invalidate'

export function useTokenlotteryDecrementMutation({
  account,
  tokenlottery,
}: {
  account: UiWalletAccount
  tokenlottery: TokenlotteryAccount
}) {
  const invalidateAccounts = useTokenlotteryAccountsInvalidate()
  const signer = useWalletUiSigner({ account })
  const signAndSend = useWalletUiSignAndSend()

  return useMutation({
    mutationFn: async () => await signAndSend(getDecrementInstruction({ tokenlottery: tokenlottery.address }), signer),
    onSuccess: async (tx) => {
      toastTx(tx)
      await invalidateAccounts()
    },
  })
}
