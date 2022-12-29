// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract AiNFT is ERC721A, Ownable {
    using Strings for uint256;
    
    string public baseURI; 
    string public baseExtension = ".json";
    uint256 public MAX_AMOUNT_PER_MINT = 10;
    uint256 public COST_PER_NFT = 0.08 ether;
    uint256 public maxNFT = 555;
    bool metadataLocked = false;

    constructor() ERC721A("Ai Nft", "AINFT") {
    }

    function mint(uint256 quantity) external payable {
        require(_totalMinted() + quantity <= maxNFT,"not enough NFT to mint");
        require(msg.value >= quantity * COST_PER_NFT, "not enough ethers sent");
        require(quantity <= MAX_AMOUNT_PER_MINT,"cant mint more than max amount per mint");
        _safeMint(msg.sender, quantity);
    }

    function totalMinted() public view returns(uint256){
        return _totalMinted();
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override(ERC721A)
        returns (string memory)
    {
        require(
        _exists(tokenId),
        "URI query for nonexistent token!"
        );

        string memory currentBaseURI = _baseURI();
        return bytes(currentBaseURI).length > 0
            ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), ".json"))
            : "";
    }

    function _baseURI() internal view virtual override(ERC721A) returns (string memory) {
        return baseURI;
    }

    function setCost(uint256 _newCost) public onlyOwner {
        COST_PER_NFT = _newCost;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        require(metadataLocked == false, "Metadata locked");
        baseURI = _newBaseURI;
    }

    function lockMetadata() public onlyOwner {
        require(metadataLocked == false, "Metadata already locked");
        metadataLocked = true;
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    //receive function
    receive() external payable {}
}