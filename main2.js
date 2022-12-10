
const bip39 = require("bip39");
const { parseSeedPhrase, generateSeedPhrase} = require('near-seed-phrase');
const nearAPI = require('near-api-js');
const { utils } = require("near-api-js");
const knownAccountSeed = "message naive run wing crucial soldier apart connect element street dove end"; //seed for sidharths.testnet
const {
  transactions: { functionCall },
  utils: {
      format: { parseNearAmount, formatNearAmount },
  },
} = nearAPI;




async function transferUSDC(newAccountName) {
    let seedFromImplicitAccount = "message naive run wing crucial soldier apart connect element street dove end";
  
    let parsedKey = parseSeedPhrase(seedFromImplicitAccount);
  
    const { keyStores, KeyPair, connect } = nearAPI;
    const keyStore = new keyStores.InMemoryKeyStore();
    const PRIVATE_KEY = parsedKey.secretKey;
    const keyPair1 = KeyPair.fromString(PRIVATE_KEY);
    const config = {
      keyStore,
      networkId: "testnet",
      nodeUrl: "https://rpc.testnet.near.org",
    };
  
  
    const near = await connect({ ...config, keyStore });
    const creatorAccount = await near.account("8afcbf063717d4b23d890a374c45a6224b9fd6a8eb6012735418cb68d832902d");
    const keyPair = KeyPair.fromRandom("ed25519");
    const publicKey = keyPair.publicKey.toString();
    await keyStore.setKey(config.networkId, "8afcbf063717d4b23d890a374c45a6224b9fd6a8eb6012735418cb68d832902d", keyPair1);
    await keyStore.setKey(config.networkId, newAccountName, keyPair);
  
    return await creatorAccount.functionCall({
      contractId: "testnet",
      methodName: "create_account",
      args: {
        new_account_id: newAccountName,
        new_public_key: publicKey,
      },
      gas: "300000000000000",
      attachedDeposit: utils.format.parseNearAmount("2"),
    });
    console.log("done");
  }