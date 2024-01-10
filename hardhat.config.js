require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks:{
    localRes:{
      url:process.env.API_URL,
      accounts:[process.env.PRIVATE_KEY]
    },
    hardhat:{
      chainId:31337
    }
  }
};
