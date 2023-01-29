import React from 'react';


import { useRef, useEffect, useState,useContext } from "react";
import { providers, Contract } from "ethers";
import DisplayTenderStatus from "./DisplayTenderStatus"
import NavbarHome from '../../components/NavbarHome';
import { AppContext } from '../../contexts/AppContexts';

function TenderStatus() {
  const {
    userAccount,
    kit,
    TenderAddressContract,
    contract,
    connectWallet,
    notification,
  } = useContext(AppContext);
  const [walletconnect, setWalletConnect] = useState(false);
  const [BidTenders, setBidTenders] = useState([]);
  const [index, setIndex] = useState();
  
  
  //getallbids tenders
  const getAllBids = async () => {
    let _bidTenders = [];
    
    const totalItemsLength = await contract.methods.getTotalBindsLength().call({from: kit.defaultAccount});
    //alert(totalItemsLength);
    for (let i = 0; i < (totalItemsLength); i++) {
      let _tenderBids = new Promise(async (resolve, reject) => {
        let bids = await contract.readBiderDetails(i).call({from: kit.defaultAccount});
        resolve({
          companyNames: bids[0],
          contactAddress: bids[1],
          goodDealsWith: bids[2],
          companyOfferTender: bids[3],
          bidIndex: bids[4],
          choice: bids[5]


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
  const approveTender = async (ids) => {

    const signer = await getProviderOrSigner(true);

    const BiderContract = new Contract(
      ContractBiderAddress,
      BiderAbi,
      signer,
    )
    const approves = await BiderContract.approveTender(ids);
    // alert(approves);

  }

  //call the metamask on page reload
  // useEffect(()=>{
  //   getAllBids();
  // },[])
  useEffect(() => {
    Web3ModalRef.current = new Web3Modal({
      network: "Mumbai",
      providerOptions: {},
      disableInjectedProvider: false,
      cacheProvider: false

    });
    getAllBids();

  }, [walletconnect]);

  return (
    <div>

      <main className='w-full'>
        <NavbarHome/>
        <DisplayTenderStatus bids={BidTenders} approve={approveTender} />
      </main>
    </div>
  )
}

export default TenderStatus;