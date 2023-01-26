// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./TenderOwner.sol";

contract Bider is Ownable, TenderPoster {
    using SafeMath for uint;
    //include Rejected Status

    enum statuschoices {
        Waiting,
        Approved,
        Rejected
    }

    struct biderDetails {
        address payable bidowner;
        string companyName;
        string contact;
        string goodsDealsWith;
        string tenderOwnerName;
        uint bidsTenderIndex;
        statuschoices choice;
        string goodsDescription;
    }
    mapping(uint => biderDetails) bidItems;
    uint bidstenderlength = 0;

    function writeBiderDetails(
        uint _tenderIndex,
        string memory _companyName,
        string memory _contact,
        string memory _goodsDealsWith
    ) public {
        //require to bid onlyonce
        require(
            msg.sender != bidItems[_tenderIndex].bidowner,
            "Can Only Bid Once"
        );
        uint _bidsindex = bidstenderlength;
        bidItems[_tenderIndex] = biderDetails(
            payable(msg.sender),
            _companyName,
            _contact,
            _goodsDealsWith,
            tenderItems[_tenderIndex].companyName,
            _bidsindex,
            statuschoices.Waiting,
            tenderItems[_tenderIndex].tenderDescription
        );
        bidstenderlength = bidstenderlength.add(1);
        //status
        //choice = statuschoices.Waiting;
    }

    function readBiderDetails(
        uint _tenderbidsIndex
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            uint,
            statuschoices,
            string memory
        )
    {
        return (
            bidItems[_tenderbidsIndex].companyName,
            bidItems[_tenderbidsIndex].contact,
            bidItems[_tenderbidsIndex].goodsDealsWith,
            bidItems[_tenderbidsIndex].tenderOwnerName,
            bidItems[_tenderbidsIndex].bidsTenderIndex,
            bidItems[_tenderbidsIndex].choice,
            bidItems[_tenderbidsIndex].goodsDescription
        );
    }

    function getTotalBindsLength() public view returns (uint) {
        return bidstenderlength;
    }

    //Approve function
    function approveTender(
        uint _tenderbidsIndex
    )
        public
        onlyOwner
        returns (address, string memory, string memory, string memory)
    {
        require(
            msg.sender == tenderItems[_tenderbidsIndex].owner,
            "Only The Owner can Approve"
        );
        require(
            bidItems[_tenderbidsIndex].choice == statuschoices.Waiting,
            "Waitng Aproval"
        );
        // choice = statuschoices.Approved;
        bidItems[_tenderbidsIndex].choice = statuschoices.Approved;
        return (
            bidItems[_tenderbidsIndex].bidowner,
            bidItems[_tenderbidsIndex].companyName,
            bidItems[_tenderbidsIndex].contact,
            bidItems[_tenderbidsIndex].goodsDealsWith
        );
    }

    //DisplayOnlyApproved Tenders
    function onlyApproveTender(
        uint _tenderbidsIndex
    )
        public
        view
        returns (address, string memory, string memory, string memory)
    {
        //require(msg.sender != address(this),"Only The Owner can Approve");
        require(
            bidItems[_tenderbidsIndex].choice == statuschoices.Approved,
            "Waitng Aproval"
        );
        // choice = statuschoices.Approved;
        //bidItems[_tenderbidsIndex].choice = statuschoices.Approved;
        return (
            bidItems[_tenderbidsIndex].bidowner,
            bidItems[_tenderbidsIndex].companyName,
            bidItems[_tenderbidsIndex].contact,
            bidItems[_tenderbidsIndex].goodsDealsWith
        );
    }

    //Rejected Tenders
    //added
    function rejectTender(
        uint _tenderbidsIndex
    )
        public
        onlyOwner
        returns (address, string memory, string memory, string memory)
    {
        require(
            msg.sender == tenderItems[_tenderbidsIndex].owner,
            "Only The Owner can Approve"
        );
        require(
            bidItems[_tenderbidsIndex].choice == statuschoices.Waiting,
            "Waitng Aproval"
        );
        // choice = statuschoices.Approved;
        bidItems[_tenderbidsIndex].choice = statuschoices.Rejected;
        return (
            bidItems[_tenderbidsIndex].bidowner,
            bidItems[_tenderbidsIndex].companyName,
            bidItems[_tenderbidsIndex].contact,
            bidItems[_tenderbidsIndex].goodsDealsWith
        );
    }
}
