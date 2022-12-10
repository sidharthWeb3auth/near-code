This repo contains some reference code to make near blockchain interactions

## test.js

this file contains 4 functions:

generateImplicitAccount() : This method generates a random seedphrase and ED25519 keypair using 'near-seed-phrase' package and log the details.

createNamedAccount() : This is a sample function on how to generate a sub account for an existing near named account. eg home.sidharth.near, work.sidharth.near etc.

createAccountFromContract(): This is a sample function on how to generate an explicit account by making a contract call to near blockchain. only permits names with >=32 chars

sendTokenToId() : This function demonstrates how to initiate token transfer of near tokens.




## mainnet.js

This file contains only one function and the execution takes place on near mainnet and involves real tokens.
Reference implementation on how to send USDC token from one account to another invoking a smart contract on mainnet.