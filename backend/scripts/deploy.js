const {ethers} = require("hardhat")

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
