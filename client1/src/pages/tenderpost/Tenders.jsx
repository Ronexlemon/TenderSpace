import React from "react";
import { useState, useEffect, useRef, useCallback,useContext } from "react";



import { useNavigate } from "react-router-dom";
import NavbarHome from "../../components/NavbarHome";
import { AppContext } from "../../contexts/AppContexts";


const Tenders = () => {
  //input field states
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const {
    userAccount,
    kit,
    TenderAddressContract,
    contract,
    connectWallet,
    notification,
  } = useContext(AppContext);
  let ref = useRef(null);
  let getformdiv = useRef(null);
  let btnapprove = useRef(null);
  //let Tenders =[];
 
  
  const [tenderslength, setLength] = useState(0);
 
  const [walletconnect, setWalletConnect] = useState(false);
  
  
  
  const postsall =async()=>{
    let name ="comp";
    let des = "des";
    let dead = "0/456/67";
    let email ="email@email";
    let amount1 = 100;
    alert("useraccount",userAccount);
   
    
  }
  const btnPosts = async () => {
    const params = [companyName, description, deadline, email, amount];

    try {
      
      
      await contract.methods.writeTenderDetails(...params).send({from:kit.defaultAccount})
      
      notification("add results successful");
      notification(`🎉 You successfully added "${params[0]}".`);
    } catch (error) {
      console.log("the error is", error);
    }
    
    // getAllTenders()
  };
  
 
  const navigate = useNavigate();
  

  
  

  

  

  // //Form submit event
  const handleAddTender = (e) => {
    //prevent page refresh
    e.preventDefault();

    
    setCompanyName("");
    setDescription("");
    setDeadline("");
    setContact("");
    setEmail("");
    setAmount("");
  };
  

  
  
  useEffect(() => {
   // connectWallet();
    
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <>
      <NavbarHome />
      <div className="mx-auto w-10/12 my-10">
        <div ref={getformdiv} className="">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h1 className="font-jakarta text-3xl font-extrabold">
                Advertise Tender
              </h1>
              <p className="py-4 pr-4 font-josefin">
                Connect wallet to fill the form below.
                
              </p>
            </div>

            <div>
            {userAccount ==  null?  <button
                onClick={()=>{connectWallet()}}
                className="px-4 py-2 font-josefin text-white bg-primary-color rounded-full shadow-md hover:shadow-lg"
              >
                
                Connect Wallet
              </button>: <button
                
                className="px-4 py-2 font-josefin text-white rounded-full shadow-md hover:shadow-lg bg-green"
              >
                
                {userAccount.substring(0, 8)} ...
              </button> }
             
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
                      name="company"
                      placeholder="Company Name..."
                      required
                      onChange={(e) => setCompanyName(e.target.value)}
                      value={companyName}
                    />
                  </div>

                  <div>
                    <label className="font-josefin pt-2">
                      Tender Description
                    </label>
                    <br />
                    <input
                      className="py-3 pr-24 pl-4 border-2 rounded-lg"
                      type="text"
                      id="description"
                      name="description"
                      placeholder="Tender description..."
                      required
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    />
                  </div>

                  <div>
                    <label className="font-josefin">DeadLine</label>
                    <br />
                    <input
                      className="py-3 px-4 border-2 rounded-lg"
                      type="date"
                      id="deadline"
                      name="deadline"
                      required
                      onChange={(e) => setDeadline(e.target.value)}
                      value={deadline}
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label className="font-josefin">Contact</label>
                    <br />
                    <input
                      className="py-3 pr-24 pl-4 border-2 rounded-lg"
                      type="text"
                      id="contact"
                      name="contact"
                      placeholder="0792271915"
                      required
                      onChange={(e) => setContact(e.target.value)}
                      value={contact}
                    />
                  </div>

                  <div>
                    <label className="font-josefin">Email</label>
                    <br />
                    <input
                      className="py-3 pr-24 pl-4 border-2 rounded-lg"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="stansmith@gmail.com"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>

                  <div>
                    <label className="font-josefin">Amount</label>
                    <br />
                    <input
                      className="py-3 pr-24 pl-4 border-2 rounded-lg"
                      type="number"
                      id="amount"
                      name="amount"
                      required
                      onChange={(e) => setAmount(e.target.value)}
                      value={amount}
                    />
                  </div>

                  <div className="flex gap-4 my-4">
                    <button
                      className="px-10 py-2 border-2 border-secondary-color text-secondary-color rounded-full mb-2 font-josefin"
                      onClick={() => navigate("/Tenders")}
                    >
                      Close
                    </button>
                    <button
                      className="px-10 py-2 bg-secondary-color text-[#fff] rounded-full shadow-md mb-2 font-josefin"
                      onClick={() => {
                        btnPosts();
                        
                      }}
                      type="submit"
                      value="Submit"
                    >
                      Post Tender
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Tenders;
