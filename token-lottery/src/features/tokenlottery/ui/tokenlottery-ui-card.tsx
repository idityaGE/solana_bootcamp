import { TokenlotteryAccount } from '@project/anchor'
import { ellipsify, UiWalletAccount } from '@wallet-ui/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AppExplorerLink } from '@/components/app-explorer-link'
import { TokenlotteryUiButtonClose } from './tokenlottery-ui-button-close'
import { TokenlotteryUiButtonDecrement } from './tokenlottery-ui-button-decrement'
import { TokenlotteryUiButtonIncrement } from './tokenlottery-ui-button-increment'
import { TokenlotteryUiButtonSet } from './tokenlottery-ui-button-set'

export function TokenlotteryUiCard({ account, tokenlottery }: { account: UiWalletAccount; tokenlottery: TokenlotteryAccount }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tokenlottery: {tokenlottery.data.count}</CardTitle>
        <CardDescription>
          Account: <AppExplorerLink address={tokenlottery.address} label={ellipsify(tokenlottery.address)} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 justify-evenly">
          <TokenlotteryUiButtonIncrement account={account} tokenlottery={tokenlottery} />
          <TokenlotteryUiButtonSet account={account} tokenlottery={tokenlottery} />
          <TokenlotteryUiButtonDecrement account={account} tokenlottery={tokenlottery} />
          <TokenlotteryUiButtonClose account={account} tokenlottery={tokenlottery} />
        </div>
      </CardContent>
    </Card>
  )
}
