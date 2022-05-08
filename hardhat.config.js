require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("deploy", "Deploy the smart contracts", async (taskArgs, hre) => {
  const Junglade = await hre.ethers.getContractFactory("Junglade");
  const artwork = await Junglade.deploy("Junglade Members Only", "ART");

  await artwork.deployed();

  await hre.run("verify:verify", {
    address: artwork.address,
    constructorArguments: ["Junglade Members Only", "ART"],
  });
});

module.exports = {
  solidity: "0.8.9",
  networks: {
    mumbai: {
      // url: "https://matic-testnet-archive-rpc.bwarelabs.com",
      url: "https://matic-mumbai.chainstacklabs.com",
      accounts: [process.env.PRIVATE_KEY],
    },
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/0fP3WTlyJac9nbGvIOmF5IAKOyZ5uirQ",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
