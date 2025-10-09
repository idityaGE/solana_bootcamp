import { generateSigner, percentAmount, publicKey } from '@metaplex-foundation/umi'
import {
  createNft,
  fetchDigitalAsset,
} from '@metaplex-foundation/mpl-token-metadata'
import { umi, umiWallet } from './index';
import { getExplorerLink } from '@solana-developers/helpers';

const nftMint = generateSigner(umi);

const ix = await createNft(umi, {
  mint: nftMint,
  name: 'Iditya NFT',
  symbol: 'IDITYA',
  uri: "https://raw.githubusercontent.com/solana-developers/professional-education/main/labs/sample-nft-offchain-data.json",
  sellerFeeBasisPoints: percentAmount(5),
  isCollection: false,
  updateAuthority: umiWallet.publicKey,
  creators: [
    {
      address: umiWallet.publicKey,
      verified: true,
      share: 100,
    }
  ],
  isMutable: true,
  collection: {
    key: publicKey("4dejgcwmwnTPswn3kHkcWqaDqXCEY4U9WuSfwuf1TR84"),
    verified: false,
  },
}).sendAndConfirm(umi, { send: { skipPreflight: true, maxRetries: 3 } });

console.log(`NFT created: ${getExplorerLink('address', nftMint.publicKey, 'devnet')}`);

const nft = await fetchDigitalAsset(umi, nftMint.publicKey, {
  commitment: 'processed'
});

console.log(getExplorerLink('address', nft.mint.publicKey, 'devnet'));