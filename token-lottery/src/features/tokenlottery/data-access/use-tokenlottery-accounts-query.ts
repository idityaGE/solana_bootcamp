import { useSolana } from '@/components/solana/use-solana'
import { useQuery } from '@tanstack/react-query'
import { getTokenlotteryProgramAccounts } from '@project/anchor'
import { useTokenlotteryAccountsQueryKey } from './use-tokenlottery-accounts-query-key'

export function useTokenlotteryAccountsQuery() {
  const { client } = useSolana()

  return useQuery({
    queryKey: useTokenlotteryAccountsQueryKey(),
    queryFn: async () => await getTokenlotteryProgramAccounts(client.rpc),
  })
}
