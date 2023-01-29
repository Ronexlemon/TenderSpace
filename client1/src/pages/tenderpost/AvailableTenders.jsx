import React from "react";
import DisplayTenders from "./DisplayAvailableTenders";
import { useState, useEffect, useRef, useCallback,useContext } from "react";
import { AppContext } from "../../contexts/AppContexts";




const AvailableTenders = () => {
    const {
        userAccount,
        kit,
        TenderAddressContract,
        contract,
        connectWallet,
        notification,
      } = useContext(AppContext);
    const [Tenders, setTenders] = useState([]);
   
    const [tenderslength, setLength] = useState(0);
   
    const Approve = () => {
        alert("yooh");
    }
    //getAllTenders
    const getAllTenders = useCallback(async () => {
        let _tenders = [];
        
        

        const tenderLength = await contract.methods.tenderTotals().call({from: kit.defaultAccount});


        for (let i = 0; i < tenderLength; i++) {
            let _tender = new Promise(async (resolve, reject) => {
                let t = await contract.methods.readTenderDetails(i).call({from: kit.defaultAccount});
                resolve({
                    owners: t[0],
                    companyNames: t[1],
                    tenderDescriptions: t[2],
                    deadlineDates: t[3],
                    contactEmails: t[4],
                    tenderAmounts: t[5],
                    tenderindexs: t[6],

                });
                reject(new Error('Will this be ignored?')); // ignored


            })
            _tenders.push(_tender);


        }
        const tenderss = await Promise.all(_tenders);
        setTenders(tenderss);
        //renderProducts();

        //add function to render tenders
    }, [])
   
    useEffect(() => {
 connectWallet();
       
        //getTotalTendersLength();
        getAllTenders();
        //renderProducts();
    }, [tenderslength]);

    return (
        <div>
            <main  className='w-full '>
                
                <DisplayTenders tenders={Tenders} approve={Approve} />
                
            </main>

        </div>
    )
}
export default AvailableTenders;