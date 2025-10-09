import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata'
import { Connection, clusterApiUrl } from '@solana/web3.js'
import { getKeypairFromFile } from "@solana-developers/helpers"
import { keypairIdentity } from '@metaplex-foundation/umi';

const wallet = await getKeypairFromFile();

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')

const umi = createUmi(connection.rpcEndpoint)
umi.use(mplTokenMetadata());

export const umiWallet = umi.eddsa.createKeypairFromSecretKey(wallet.secretKey);
umi.use(keypairIdentity(umiWallet));

export { umi };