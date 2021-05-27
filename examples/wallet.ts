
import {
  solana,
  Wallet,
} from ".."


async function main() {
  // Connect to https://devnet.solana.com
  const conn = solana.connect("dev")
  // "spin canyon tuition upset pioneer celery liquid conduct boy bargain dust seed"

  const my = "vivid afford sail army doctor canvas image isolate world off depart close case someone hamster cycle stage glue truck venue vehicle cup match dry"
  const mnemonic = my

  const wallet = await Wallet.fromMnemonic(mnemonic, conn)
  // 2DnNQXDg8hKkwkxa2ve4x5DSvJhha2TYSpyLPCcEQdcC
  console.log(wallet.address)

  await conn.requestAirdrop(wallet.pubkey, 1e9)

  // https://explorer.solana.com/address/4i7YkLD9RiiACd4gbG9HdTUUH2wTfTycuRwB8GcehzMd?cluster=devnet
}

main().catch(err => console.log(err))

