import React from 'react'


import { useRef,useEffect,useState,useContext } from "react";

import DisplayTenderAllocation from './DisplayTenderAllocation';
import NavbarHome from '../../components/NavbarHome';
import { AppContext } from '../../contexts/AppContexts';

function TenderAllocation() {
  const {
    userAccount,
    kit,
    TenderAddressContract,
    contract,
    connectWallet,
    notification,
  } = useContext(AppContext);
  const [walletconnect,setWalletConnect] = useState(false);
  const [BidTenders,setBidTenders] = useState([]);
  const [index,setIndex] = useState();
 


//getallbids tenders
const getAllBids =async () =>{
  let _bidTenders =[];
  
  const totalItemsLength = await contract.methods.getTotalBindsLength().call({from: kit.defaultAccount});
  
  for(let i=0;i< (totalItemsLength);i++){
    let _tenderBids = new Promise(async(resolve,reject)=>{
      let bids = await contract.methods.readBiderDetails(i).call({from : kit.defaultAccount});
      resolve({
        companyNames : bids[0],
        contactAddress : bids[1],
        goodDealsWith : bids[2],
        companyOfferTender : bids[3],
        bidIndex: bids[4], 
        choice: bids[5],
        tenderDescription: bids[6]


      }

      );
      reject("Please Try Again after some Minutes");

    })
    _bidTenders.push(_tenderBids);

  }
  const allbids = await Promise.all(_bidTenders);
  setBidTenders(allbids);

}
//Approve function
const approveTender =async (ids)=>{
  
  

  
  const approves = await contract.methods.approveTender(ids).send({from : kit.defaultAccount});
 // alert(approves);
  
}

//call the metamask on page reload
// useEffect(()=>{
//   getAllBids();
// },[])
useEffect(()=>{
  //connectWallet();
 
   getAllBids();

},[]);
  
  return (
    <div>
      
      <main className=''>
        <NavbarHome/>
        <DisplayTenderAllocation bids={BidTenders} approve={approveTender}/>
      </main>
    </div>
  )
}

export default TenderAllocation;