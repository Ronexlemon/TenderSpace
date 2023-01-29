import React from 'react';
import { BiderAbi } from "../../abi/bidercontract_abi";
import Web3Modal from "web3modal";
import { useRef, useEffect, useState } from "react";
import { providers, Contract } from "ethers";
import DisplayTenderStatus from "./DisplayTenderStatus"
import NavbarHome from '../../components/NavbarHome';

function TenderStatus() {
  const [walletconnect, setWalletConnect] = useState(false);
  const [BidTenders, setBidTenders] = useState([]);
  const [index, setIndex] = useState();
  const ContractBiderAddress = "0x8fF171857abe05f4642e90Ec243A9553f0853678";
  const Web3ModalRef = useRef();
  //provide sugner or provider
  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await Web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    // check if network is Mumbai
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 80001) {
      window.alert("Change network to Mumbai");
      throw new Error("Change network To Mumbai");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;

    }
    return web3Provider;
  }

  //getallbids tenders
  const getAllBids = async () => {
    let _bidTenders = [];
    const provider = await getProviderOrSigner();
    const BidersContract = new Contract(
      ContractBiderAddress,
      BiderAbi,
      provider,
    )
    const totalItemsLength = await BidersContract.getTotalBindsLength();
    //alert(totalItemsLength);
    for (let i = 0; i < (totalItemsLength); i++) {
      let _tenderBids = new Promise(async (resolve, reject) => {
        let bids = await BidersContract.readBiderDetails(i);
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