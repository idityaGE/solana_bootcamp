import {
  findMetadataPda,
  verifyCollectionV1,
} from "@metaplex-foundation/mpl-token-metadata";
import { umi } from "./index";
import { publicKey } from "@metaplex-foundation/umi";
import { getExplorerLink } from "@solana-developers/helpers";

const collectionMint = publicKey("4dejgcwmwnTPswn3kHkcWqaDqXCEY4U9WuSfwuf1TR84");
const nftMint = publicKey("Jf58XN9RaBn5QkUqemsMBUwsJSy2FZzrpkvonwNzwAG");

const ix =
  await verifyCollectionV1(umi, {
    metadata: findMetadataPda(umi, { mint: nftMint }),
    collectionMint: collectionMint,
    authority: umi.identity,
  }).sendAndConfirm(umi, { send: { skipPreflight: true, maxRetries: 3 } });

console.log(`NFT verified: ${getExplorerLink('address', nftMint, 'devnet')}`);