import { useQueryClient } from '@tanstack/react-query'
import { useTokenlotteryAccountsQueryKey } from './use-tokenlottery-accounts-query-key'

export function useTokenlotteryAccountsInvalidate() {
  const queryClient = useQueryClient()
  const queryKey = useTokenlotteryAccountsQueryKey()

  return () => queryClient.invalidateQueries({ queryKey })
}
