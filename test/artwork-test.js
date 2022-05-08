const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Junglade Smart Contract Tests", function () {
  let artwork;

  this.beforeEach(async function () {
    // This is executed before each test
    // Deploying the smart contract
    const Junglade = await ethers.getContractFactory("Junglade");
    artwork = await Junglade.deploy("Junglade", "ART");
  });

  it("NFT is minted successfully", async function () {
    // [account1] = await ethers.getSigners();
    [owner] = await ethers.getSigners();

    expect(await artwork.balanceOf(owner.address)).to.equal(0);

    const tokenURI =
      "https://opensea-creatures-api.herokuapp.com/api/creature/1";
    const tx = await artwork.connect(owner).mint(tokenURI);

    expect(await artwork.balanceOf(owner.address)).to.equal(1);
  });

  it("tokenURI is set sucessfully", async function () {
    [owner, account2] = await ethers.getSigners();

    const tokenURI_1 =
      "https://opensea-creatures-api.herokuapp.com/api/creature/1";
    const tokenURI_2 =
      "https://opensea-creatures-api.herokuapp.com/api/creature/2";

    const tx1 = await artwork.connect(owner).mint(tokenURI_1);
    const tx2 = await artwork.connect(owner).mint(tokenURI_2);

    expect(await artwork.tokenURI(0)).to.equal(tokenURI_1);
    expect(await artwork.tokenURI(1)).to.equal(tokenURI_2);
  });
});
