import React from 'react';
import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Approve from "./pages/approve/Approve";
import Approve from "./pages/Approve/Approve"
import Web3 from "web3";
import tenderabijsonfile from "../src/components/abijsonfiles/tenderAbi.json";
import { newKitFromWeb3 } from "@celo/contractkit";
import BiderForm from "./pages/biderpostform/BiderForm";
import LandingPage from "./pages/LandingPage";
import TenderAllocation from "./pages/tenderallocation/TenderAllocation";
import AvailableTenders from "./pages/tenderpost/AvailableTenders";
import DisplayTenders from "./pages/tenderpost/DisplayAvailableTenders";
import Tenders from "./pages/tenderpost/Tenders";
import TenderStatus from "./pages/tenderstatus/TenderStatus";
import { AppContext } from "./contexts/AppContexts";
let kit;
let contract;

function App() {
  const [userAccount, setUserAccount] = useState(null);
  const TenderAddressContract ="0x0E14730CCeB6dCb4D4eDacC24DEB2d8b103C5aD1";
  const connectWallet = async function () {
    if (window.celo) {
      try {
        await window.celo.enable();

        const web3 = new Web3(window.celo);
        kit = newKitFromWeb3(web3);

        const accounts = await kit.web3.eth.getAccounts();
        kit.defaultAccount = accounts[0];
        setUserAccount(kit.defaultAccount);
        contract = new kit.web3.eth.Contract(tenderabijsonfile, TenderAddressContract);
        console.log("the contract is",contract);
      } catch (error) {
        notification(`⚠️ ${error}.`);
      }
    } else {
      notification("⚠️ Please install the CeloExtensionWallet.");
    }
   
  };
  //alert notification
  const notification = (message) => {
    alert(message);
  };
  
  
  
  return (
    <AppContext.Provider
    value={{
      userAccount,
      kit,
      TenderAddressContract,
      contract,
      connectWallet,
      
      notification,
    }

    }>
      

     
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Tenders" element={<Tenders />} />
          <Route path="/BiderForm" element={<BiderForm />} />
          <Route path="/TenderAllocation" element={<TenderAllocation />} />
          <Route path="/DisplayAvailableTenders" element={<DisplayTenders />} />
          <Route path="/AvailableTenders" element={<AvailableTenders />} />
          <Route path="/TenderStatus" element={<TenderStatus />} />
          <Route path="/Approve" element={<Approve />} />
        </Routes>
      </Router>
     
    
    </AppContext.Provider>
  )
}

export default App
