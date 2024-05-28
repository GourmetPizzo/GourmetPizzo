// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts@5.0.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@5.0.2/access/Ownable.sol";

contract MyToken is ERC721, Ownable {
    uint256 private _nextTokenId;

    constructor(address initialOwner)
        ERC721("PIZZO", "POK")
        Ownable(initialOwner)
    {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://magenta-causal-bass-432.mypinata.cloud/ipfs/Qma7GkAUL3vUrNy8FdvLXXAnLoG49BG5M8JPVai8F963Ve/metadata.json";
    }

    function safeMint() public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        tokenURI(tokenId);
    }

}
