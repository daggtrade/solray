import { solana, Wallet, BPFLoader } from '../..';

import fs from 'fs';

import Demo from './Demo';

import { Account } from '@solana/web3.js';

const programBinary = fs.readFileSync('./demo.so');


async function main() {
  
  const conn = solana.connect('dev');
  
  // const mnemonic = "spin canyon tuition upset pioneer celery liquid conduct boy bargain dust seed"
  
  const mnemonic = "vivid afford sail army doctor canvas image isolate world off depart close case someone hamster cycle stage glue truck venue vehicle cup match dry"
  const wallet = await Wallet.fromMnemonic(mnemonic, conn);

  console.log('Account address:', wallet.address);

  console.log('Get some airdrop...');
  await wallet.conn.requestAirdrop(wallet.pubkey, 1e9);

  await new Promise(resolve => setTimeout(resolve, 1000));

  let balance = await wallet.conn.getBalance(wallet.pubkey);
  console.log('Account banalce:', balance);

  console.log('Load demo program...')
  const loader = new BPFLoader(wallet);
  const program = await loader.load(programBinary);

  console.log('Program loaded to account:', program.publicKey.toBase58());

  const demo = new Demo(wallet, program.publicKey);
  const demoAccount = new Account();

  console.log('Excute instruction with account: ', demoAccount.publicKey.toBase58());
  await demo.request(demoAccount.publicKey);

  console.log('Success!');

}

main().catch(console.log)