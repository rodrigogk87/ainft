//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract AINFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    uint256 public price = 0.005 ether;
    mapping(uint256 => string) prompts;

    constructor() ERC721("AINFTs", "AINFT") {}

    function mint() public payable returns (uint256 newItemId_) {
        require(msg.value >= price, "not enough eth sent");
        _tokenIds.increment();

        newItemId_ = _tokenIds.current();
        _mint(msg.sender, newItemId_);
    }

    function getTokenPrompt(uint256 _tokenId)
        public
        virtual
        returns (string memory)
    {
        return prompts[_tokenId];
    }

    function setTokenPrompt(uint256 _tokenId, string memory _tokenPrompt)
        public
        onlyOwner
    {
        prompts[_tokenId] = _tokenPrompt;
    }

    function setTokenURI(uint256 _tokenId, string memory _tokenURI)
        public
        onlyOwner
    {
        _setTokenURI(_tokenId, _tokenURI);
    }
}
