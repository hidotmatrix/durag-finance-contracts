require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-vyper");
const PRIVATE_KEY= "0x786ae7e69667d8273de61f6441d26c753bac2c62baccaa48953d6e7b06de916d"

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  vyper: {
    version: "0.1.9",
  },
  networks: {
    'godwoken-testnet': {
        url: `https://godwoken-testnet-v1.ckbapp.dev`,
        accounts: [PRIVATE_KEY]
    }
  }
};
