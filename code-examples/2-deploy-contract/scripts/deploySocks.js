async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const ContractFactory = await ethers.getContractFactory("Socks");

    const contract = await ContractFactory.deploy();
  
    console.log("Socks Contract address:", contract.address);
   
    console.log("Deploying Unisocks NFT Smart contract");

    const UnisocksContractFactory = await ethers.getContractFactory("Unisocks");
    
    const unisocksContractFactory = await UnisocksContractFactory.deploy(contract.address,"https://abc.png");
  
    console.log("UniSocks Contract address:", unisocksContractFactory.address);

    console.log("NFT address before updates",await contract.nftAddress());

    const setNFTtx = await contract.setNFTAddress(unisocksContractFactory.address);

    console.log("Set NFT address tx hash",setNFTtx);

    console.log("NFT address after updating address",await contract.nftAddress());

    console.log("Owner address of Unisocks Contract before update",await unisocksContractFactory.owner())

    const transferownershipTx = await unisocksContractFactory.transferOwnership(contract.address);

    console.log("Owner address of Unisocks Contract after update",await unisocksContractFactory.owner())

  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  