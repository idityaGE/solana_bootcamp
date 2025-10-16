import { useSolana } from '@/components/solana/use-solana'
import { WalletDropdown } from '@/components/wallet-dropdown'
import { AppHero } from '@/components/app-hero'
import { TokenlotteryUiButtonInitialize } from './ui/tokenlottery-ui-button-initialize'
import { TokenlotteryUiList } from './ui/tokenlottery-ui-list'
import { TokenlotteryUiProgramExplorerLink } from './ui/tokenlottery-ui-program-explorer-link'
import { TokenlotteryUiProgramGuard } from './ui/tokenlottery-ui-program-guard'

export default function TokenlotteryFeature() {
  const { account } = useSolana()

  return (
    <TokenlotteryUiProgramGuard>
      <AppHero
        title="Tokenlottery"
        subtitle={
          account
            ? "Initialize a new tokenlottery onchain by clicking the button. Use the program's methods (increment, decrement, set, and close) to change the state of the account."
            : 'Select a wallet to run the program.'
        }
      >
        <p className="mb-6">
          <TokenlotteryUiProgramExplorerLink />
        </p>
        {account ? (
          <TokenlotteryUiButtonInitialize account={account} />
        ) : (
          <div style={{ display: 'inline-block' }}>
            <WalletDropdown />
          </div>
        )}
      </AppHero>
      {account ? <TokenlotteryUiList account={account} /> : null}
    </TokenlotteryUiProgramGuard>
  )
}
