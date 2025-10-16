import { TokenlotteryUiCard } from './tokenlottery-ui-card'
import { useTokenlotteryAccountsQuery } from '@/features/tokenlottery/data-access/use-tokenlottery-accounts-query'
import { UiWalletAccount } from '@wallet-ui/react'

export function TokenlotteryUiList({ account }: { account: UiWalletAccount }) {
  const tokenlotteryAccountsQuery = useTokenlotteryAccountsQuery()

  if (tokenlotteryAccountsQuery.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }

  if (!tokenlotteryAccountsQuery.data?.length) {
    return (
      <div className="text-center">
        <h2 className={'text-2xl'}>No accounts</h2>
        No accounts found. Initialize one to get started.
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {tokenlotteryAccountsQuery.data?.map((tokenlottery) => (
        <TokenlotteryUiCard account={account} key={tokenlottery.address} tokenlottery={tokenlottery} />
      ))}
    </div>
  )
}
