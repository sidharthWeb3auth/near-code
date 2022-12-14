const bip39 = require("bip39");
const { parseSeedPhrase, generateSeedPhrase} = require('near-seed-phrase');
const nearAPI = require('near-api-js');
const { utils } = require("near-api-js");
"message naive run wing crucial soldier apart connect element street dove end"; //seed for sidharthsuresh.near
"normal skate person fever upgrade rib muscle youth hip rabbit predict solid" // seed for accoutid :668c2fcb108ebb1b22e5950977395f743a484348450f866d46632a120a0b03f8

const seed1 = "message naive run wing crucial soldier apart connect element street dove end"; //seed for sidharthsuresh.near
const seed2 = "normal skate person fever upgrade rib muscle youth hip rabbit predict solid" // seed for accoutid :668c2fcb108ebb1b22e5950977395f743a484348450f866d46632a120a0b03f8
const accountID_1 = "sidharthsuresh.near";
const accountID_2 = "668c2fcb108ebb1b22e5950977395f743a484348450f866d46632a120a0b03f8";

// Please check block explorer to see which of the above account ID's have USDC at the moment and invoke the appropriate function for transferring.




// sendTokenUSDCToId(accountID_2, seed1, accountID_1, "1000000" ) /// sending 1 USDC from sidharthsuresh.near to 668c2fcb108ebb1b22e5950977395f743a484348450f866d46632a120a0b03f8

//sendTokenUSDCToId(accountID_1, seed2, accountID_2, "10" ) /// sending 1 USDC from "668c2fcb108ebb1b22e5950977395f743a484348450f866d46632a120a0b03f8" to sidharthsuresh.near
namedAccountWithSamePhrase() // create a explicit account with the same seed phrase as an implicit key


/// Send USDC token to the receiverId(accountID)
async function sendTokenUSDCToId(receiverId, senderSeedPhrase,senderAccountID, amount) {

    let parsedKey = parseSeedPhrase(senderSeedPhrase);

    const { keyStores, KeyPair, connect } = nearAPI;
    const myKeyStore = new keyStores.InMemoryKeyStore();
    const PRIVATE_KEY = parsedKey.secretKey;
    // creates a public / private key pair using the provided private key
    const keyPair = KeyPair.fromString(PRIVATE_KEY);

    // adds the keyPair you created to keyStore
    await myKeyStore.setKey("mainnet", senderAccountID, keyPair);
    const connectionConfig = {
        networkId: "mainnet",
        keyStore: myKeyStore, // first create a key store 
        nodeUrl: "https://rpc.mainnet.near.org",
        walletUrl: "https://wallet.mainnet.near.org",
        helperUrl: "https://helper.mainnet.near.org",
        explorerUrl: "https://explorer.mainnet.near.org",
      };
      const nearConnection = await connect(connectionConfig);

      const account = await nearConnection.account(senderAccountID);

    await account.functionCall({
      contractId: "a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.factory.bridge.near", //contract name in bridge for sending usdc ft.
      methodName: "ft_transfer",
      args: {
        amount: amount,
        receiver_id: receiverId,
      },
      gas: "300000000000000", //setting gas allowance for running contract
      attachedDeposit: "1",
    });

}

/// create named account with the same passphrase
async function namedAccountWithSamePhrase() {

  let parsedKey = parseSeedPhrase("purchase pioneer voyage reveal again open obtain cliff retire seek mouse smart"); //known seedphrase of an implicit account with id  "04eb5e333a8b0d1cd0acb1dc3d23dec81ef997d589a038e65fb3fec2d2d549ca"

  const { keyStores, KeyPair, connect } = nearAPI;
  const myKeyStore = new keyStores.InMemoryKeyStore();
  const PRIVATE_KEY = parsedKey.secretKey;
  // creates a public / private key pair using the provided private key
  const keyPair = KeyPair.fromString(PRIVATE_KEY);

  // adds the keyPair you created to keyStore
  await myKeyStore.setKey("mainnet", "04eb5e333a8b0d1cd0acb1dc3d23dec81ef997d589a038e65fb3fec2d2d549ca", keyPair);
  const connectionConfig = {
      networkId: "mainnet",
      keyStore: myKeyStore, // first create a key store 
      nodeUrl: "https://rpc.mainnet.near.org",
      walletUrl: "https://wallet.mainnet.near.org",
      helperUrl: "https://helper.mainnet.near.org",
      explorerUrl: "https://explorer.mainnet.near.org",
    };
    const nearConnection = await connect(connectionConfig);

    const account = await nearConnection.account("04eb5e333a8b0d1cd0acb1dc3d23dec81ef997d589a038e65fb3fec2d2d549ca");
    console.log(parsedKey.publicKey);

  await account.functionCall({
    contractId: "near", // near contract to create a mainnet AccountId
    methodName: "create_account",
    args: {
      "new_account_id": "sidharthsuresh123.near",
      "new_public_key": parsedKey.publicKey,
    },
    gas: "300000000000000", //setting gas allowance for running contract
    attachedDeposit: "1829999999999999999990",
  });

}