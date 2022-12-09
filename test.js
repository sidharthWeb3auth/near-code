const bip39 = require("bip39");
const { parseSeedPhrase, generateSeedPhrase} = require('near-seed-phrase');
const nearAPI = require('near-api-js');
const { utils } = require("near-api-js");
const knownAccountSeed = "clarify coconut bone inner tilt shrug feed rate multiply exclude knock refuse"; //seed for sidharths.testnet

// below are the available methods, please uncomment them and run
// check sidharths.testnet on explorer to see the onchain events.

//createNamedAccount("sidhasdsdsdsdsds.sidharths.testnet"); /// provide a new sub account each time
//createAccountFromContract("fifcovdjfiuyryscsatupmnflaubwveosqft"); /// provide a 32char string to generate explicit account.
//sendTokenToId("sample12345.testnet")
//generateImplicitAccount();   /// generates a random seed phrase and keypair and logs it. 




/// generates and logs phrase and keys for an implicit account
function generateImplicitAccount() {
    const {seedPhrase, publicKey, secretKey} = generateSeedPhrase(); // generates seedPhrase, pub and priv key ED25519 ( Implicit Account)
    let accountId;

    accountId = utils.PublicKey.fromString(publicKey).data.toString('hex');
    console.log("############### random key IMPLICIT ACCOUNT DETAILS #####################################");
    console.log("seed phrase: ", seedPhrase);
    console.log("publicKey :", publicKey );
    console.log("priv key :", secretKey);
    console.log("accountId :", accountId);
    console.log("##############################################################################");
    return {
      accountId :accountId,
      secretKey :secretKey,
      publicKey: publicKey
    }
}
/// Send some near token to the receiverId(accountID)
async function sendTokenToId(receiverId) {

    let parsedKey = parseSeedPhrase(knownAccountSeed);

    const { keyStores, KeyPair, connect } = nearAPI;
    const myKeyStore = new keyStores.InMemoryKeyStore();
    const PRIVATE_KEY = parsedKey.secretKey;
    // creates a public / private key pair using the provided private key
    const keyPair = KeyPair.fromString(PRIVATE_KEY);

    // adds the keyPair you created to keyStore
    await myKeyStore.setKey("testnet", "sidharths.testnet", keyPair);
    const connectionConfig = {
        networkId: "testnet",
        keyStore: myKeyStore, // first create a key store 
        nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org",
      };
      const nearConnection = await connect(connectionConfig);

      const account = await nearConnection.account("sidharths.testnet");
      // transfer coin for sidharths.testnet to receiverId
      await account.sendMoney(
        receiverId, // receiver account
        "1000000000000000000000000" // amount in yoctoNEAR
      );

}
/// creates a sub account for sidharth.testnet account
async function createNamedAccount(accountName) {

  let parsedKey = parseSeedPhrase(knownAccountSeed);

  const { keyStores, KeyPair, connect } = nearAPI;
  const myKeyStore = new keyStores.InMemoryKeyStore();
  const PRIVATE_KEY = parsedKey.secretKey;
  const keyPair = KeyPair.fromString(PRIVATE_KEY);


  await myKeyStore.setKey("testnet", "sidharths.testnet", keyPair);
  const connectionConfig = {
      networkId: "testnet",
      keyStore: myKeyStore,
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://explorer.testnet.near.org",
    };
    const nearConnection = await connect(connectionConfig);

    const account = await nearConnection.account("sidharths.testnet");
    let newKey = KeyPair.fromRandom('ed25519').getPublicKey();
    // create a new explicit account
    await account.createAccount(
      accountName, 
      newKey, // public key for new account
      "181000000000000000000000" // initial balance for new account in yoctoNEAR
    );
  
}

///  Creates an explicit account for an implicit account with accountId: 8afcbf063717d4b23d890a374c45a6224b9fd6a8eb6012735418cb68d832902d
async function createAccountFromContract(newAccountName) {
  let seedFromImplicitAccount = "offer begin rule later stove toy method two vanish burger party win";

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