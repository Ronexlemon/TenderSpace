const {ethers} = require("hardhat")
////TenderSpaceAddress 0x82395FC034cd820930445d6A5Ff04D0849bE2a94
//2. TenderSpaceAddress 0x3bfe526bD2631E8d9417abfe2D1Abc0548B03Be4
//3. TenderSpaceAddress 0x5CEfA59731cB9B03a2761d5278B025D6B8DB3B58
//4.  TenderSpaceAddress 0x0E14730CCeB6dCb4D4eDacC24DEB2d8b103C5aD1
async function main(){
//get the contract
const TenderSpaceContract = await ethers.getContractFactory("Bider");

//deploy contract
const TenderSpaceContractDeploy = await TenderSpaceContract.deploy();

//await deployement
TenderSpaceContractDeploy.deployed();

//console the address
console.log("TenderSpaceAddress",TenderSpaceContractDeploy.address);

}
//call main
main().then(()=>process.exit(0))
.catch((error)=>{
    console.error(error);
    process.exit(1);
})
