import { generateSigner, percentAmount } from '@metaplex-foundation/umi'
import {
  createNft,
  fetchDigitalAsset,
} from '@metaplex-foundation/mpl-token-metadata'
import { umi, umiWallet } from './index';
import { getExplorerLink } from '@solana-developers/helpers';

const collectionMint = generateSigner(umi);

const ix = await createNft(umi, {
  mint: collectionMint,
  name: 'Iditya Collection',
  symbol: 'IDITYA',
  uri: "https://raw.githubusercontent.com/solana-developers/professional-education/main/labs/sample-nft-collection-offchain-data.json",
  sellerFeeBasisPoints: percentAmount(5),
  isCollection: true,
  updateAuthority: umiWallet.publicKey,
  creators: [
    {
      address: umiWallet.publicKey,
      verified: true,
      share: 100,
    }
  ],
  isMutable: true,
}).sendAndConfirm(umi, { send: { skipPreflight: true } });

const collectionNft = await fetchDigitalAsset(umi, collectionMint.publicKey, { commitment: 'finalized' });

console.log(getExplorerLink('address', collectionNft.mint.publicKey, 'devnet'));