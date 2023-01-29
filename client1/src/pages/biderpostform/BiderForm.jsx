import React from "react";

import { useRef, useEffect, useState,useContext } from "react";
import { useLocation } from "react-router-dom";
import { SiBitcoincash } from "react-icons/si";
import { useNavigate } from "react-router-dom";


import NavbarHome from "../../components/NavbarHome";
import { AppContext } from "../../contexts/AppContexts";

const BiderForm = () => {
  const {
    userAccount,
    kit,
    TenderAddressContract,
    contract,
    connectWallet,
    notification,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = state; // Read values passed on state
  
  const [biderCompanyName, setBiderCompanyName] = useState("");
  const [biderCompanyRegistrationNumber, setBiderCompanyRegistrationNumber] = useState("");
  const [biderContact, setBiderContact] = useState("");
  const [_tenderIndex, settenderIndex] = useState("");
  const [bidertypeOfGoods, setTypeOfGoods] = useState("");

  
  //call the metamask on page reload
  useEffect(() => {
   
    settenderIndex(id);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);
  //btnsubmit to submit the biders tender details
  const btnsubmit = async () => {
    const params = [
      _tenderIndex,
      biderCompanyName,
      biderContact,
      bidertypeOfGoods,
    ];

    try {
      
      
      const results = await contract.methods.writeBiderDetails(...params).send({from:kit.defaultAccount});

      notification("BidSuccessful ");
    } catch (error) {
      alert(error);
    }
  };
  // //Form submit event
  const handleAddTender = (e) => {
    //prevent page refresh
    e.preventDefault();

   
    setBiderCompanyName("");
    setBiderContact("");
    setTypeOfGoods("");
  };

  return (
    <div className="mainBiderForm">
      <NavbarHome />
      {/* <div className="connect-wallet-button">
        <button className="connectWallet">
          <h2 id="connect">
            {" "}
            Connect
            <br />
            Wallet{" "}
          </h2>
        </button>
      </div>

      <div className="bidForm-container">
        <div className="bidForm-description">
          <h1>Bid For Tender</h1>
          <br />
        </div>
        <div className="tenderForm-description-p-container">
          <div className="tenderForm-description-p-container-blank"></div>
          <div className="tenderForm-description-p">
            <p>
              <SiBitcoincash /> Connect to wallet
              <br /> Fill in the form below to bid for the tender
            </p>
          </div>
        </div>
        <div className="bidForm-content-container">
          <div className="BiderFormInput">
            <form onSubmit={handleAddTender}>
              <label className="label">Company Name:</label>
              <br />
              <input
                type="text"
                className="form-input"
                id="biderCompanyName"
                placeHolder="Company Name..."
                required
                onChange={(e) => setBiderCompanyName(e.target.value)}
                value={biderCompanyName}
              />
              <br />
              <label className="label">Company Registration Number</label>
              <br />
              <input
                type="text"
                className="form-input"
                id="biderCompanyRegistrationNumber"
                placeHolder="SL002900"
              />
              <br />
              <label className="label">Contact :</label>
              <br />
              <input
                type="text"
                className="form-input"
                id="biderContact"
                placeHolder="0792271915"
                required
                onChange={(e) => setBiderContact(e.target.value)}
                value={biderContact}
              />
              <br />
              <label className="label">Link To Company Documents</label>
              <br />
              <input
                type="text"
                className="form-input"
                id="biderGoods"
                placeHolder="https://documents.tender.io"
                required
                onChange={(e) => setTypeOfGoods(e.target.value)}
                value={bidertypeOfGoods}
              />
              <br />
              <div className="btnpostcancel">
                <button onClick={() => navigate("/home")} className="btnClose">
                  Close
                </button>
                <button onClick={btnsubmit} className="btnPost">
                  Post Tender
                </button>
              </div>
            </form>
          </div>
        </div>
      </div> */}

      <div className="mx-auto w-10/12 my-10">
        <div className="">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h1 className="font-jakarta text-3xl font-extrabold">
                Bid For Tender
              </h1>
              <p className="py-4 pr-4 font-josefin">
                Connect wallet to fill in the form below to bid for the tender.
              </p>
            </div>

            <div>
              <button className="px-4 py-2 font-josefin text-white bg-primary-color rounded-full shadow-md hover:shadow-lg">
                Connect Wallet
              </button>
            </div>
          </div>

          <div className="bg-gray/30 my-4 p-10 rounded-md">
            <div className="my-6 w-full">
              <form
                onSubmit={handleAddTender}
                className="flex justify-between w-11/12 mx-auto"
              >
                <div>
                  <div className="w-full">
                    <label className="font-josefin">Company Name</label>
                    <br />
                    <input
                      className="py-3 pr-24 pl-4 border-2 rounded-lg"
                      type="text"
                      id="company"
                      name="biderCompanyName"
                      placeholder="Company Name..."
                      required
                      onChange={(e) => setBiderCompanyName(e.target.value)}
                      value={biderCompanyName}
                    />
                  </div>

                  <div>
                    <label className="font-josefin pt-2">
                      Company Registration Number
                    </label>
                    <br />
                    <input
                      className="py-3 pr-24 pl-4 border-2 rounded-lg"
                      type="text"
                      id="biderCompanyRegistrationNumber"
                      name="description"
                      placeholder="SL002900"
                      required
                      onChange={(e) => setBiderCompanyRegistrationNumber(e.target.value)}
                      value={biderCompanyRegistrationNumber}
                    />
                  </div>

                  <div>
                    <label className="font-josefin">Contact</label>
                    <br />
                    <input
                      className="py-3 px-4 border-2 rounded-lg"
                      type="text"
                      id="deadline"
                      name="deadline"
                      placeholder="0792271915"
                      required
                      onChange={(e) => setBiderContact(e.target.value)}
                      value={biderContact}
                    />
                  </div>
                  <div>
                    <label className="font-josefin">
                      Link To Company Documents
                    </label>
                    <br />
                    <input
                      className="py-3 px-4 border-2 rounded-lg"
                      type="text"
                      id="deadline"
                      name="deadline"
                      placeholder="https://documents.tender.io"
                      required
                      onChange={(e) => setTypeOfGoods(e.target.value)}
                      value={bidertypeOfGoods}
                    />
                  </div>

                  <div className="">
                    <button
                      className="px-10 py-2 border-2 border-secondary-color text-secondary-color rounded-full mb-2 font-josefin"
                      onClick={() => navigate("/TenderStatus")}
                    >
                      Close
                    </button>
                    <button
                      className="px-10 py-2 bg-secondary-color text-[#fff] rounded-full shadow-md mb-2 font-josefin"
                      onClick={btnsubmit}
                      type="submit"
                      value="Submit"
                    >
                      Bid Tender
                    </button>
                  </div>
                </div>
                <div></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BiderForm;
