const { parseSeedPhrase } = require('near-seed-phrase');
const { utils } = require("near-api-js");

// known seed phrase = "around sport foil shuffle cement rigid soccer worry doll second charge adult"
// known privKey of above phrase : ed25519:5yZdSEVRdoye23dwtYt2GHsrrGgaJyDrzu9jz1yTsDFaisUPSesXt8YMLkU29VBt9AGPg4h8ozJVniLuygTPayY2
// Known accountid= f3fe9a3f1fc698996455196be3877e436311d45dd10b4a664b15b59c9fc1456f

//test("around sport foil shuffle cement rigid soccer worry doll second charge adult"); // replace the phrase with the one you want to check

pubkeyconvert("ed25519:LCnuKnrhQy259PaDpFmL8EohrbzvKk1xekqdKM1otG9");

function test(seed) {

    const keyPair = parseSeedPhrase(seed);
    console.log(keyPair);

    accountId = accountId = utils.PublicKey.fromString(keyPair.publicKey).data.toString('hex');
    console.log(accountId);
}

function pubkeyconvert(key) {
    console.log(utils.PublicKey.fromString(key).data.toString('hex'));
  }