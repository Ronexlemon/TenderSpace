const {ethers} = require("hardhat")
////TenderSpaceAddress 0x82395FC034cd820930445d6A5Ff04D0849bE2a94
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
