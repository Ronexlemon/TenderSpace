require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({path: ".env"});
const PRIVATE_KEY = process.env.PRIVATE_KEY;
//TenderSpaceAddress 0x82395FC034cd820930445d6A5Ff04D0849bE2a94

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    alfajores:{
      url:"https://alfajores-forno.celo-testnet.org",
      accounts: [PRIVATE_KEY],
    },
    
  },
};
