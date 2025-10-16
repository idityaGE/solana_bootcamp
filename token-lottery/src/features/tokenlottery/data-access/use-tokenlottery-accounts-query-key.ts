import { useSolana } from '@/components/solana/use-solana'

export function useTokenlotteryAccountsQueryKey() {
  const { cluster } = useSolana()

  return ['tokenlottery', 'accounts', { cluster }]
}
