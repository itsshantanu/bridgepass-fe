// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
 
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol"; 


    /**
    * @title GiftCard
    * @author Karan J Goraniya & Jeet Patel
    * @notice Crypto Gift Card for cross-domain.
    */
 
contract GiftCard is ERC721, ERC721URIStorage, Ownable {

    using Counters for Counters.Counter;
 
    Counters.Counter private _tokenIdCounter;

    uint public constant PASS_PRICE = 0.0001 ether;

    uint public currentSupply = 10;

    mapping(uint256 => uint256) public paidAmounts;

    constructor() ERC721("GiftCard", "GC") {}

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize) internal override(ERC721) {
        require(from == address(0), "Token not transferable");
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    /**
    * @notice Mint a new gift card for the specified recipient
    * @param to The address of the gift card recipient
    */

    function mintGiftCard(address to) public payable {
    require(msg.value == PASS_PRICE , "Invalid price");
    require(currentSupply > 0, "Sold out");

    payable(address(this)).transfer(msg.value);

    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    _safeMint(to, tokenId);
    _setTokenURI(tokenId, 'https://roadtoweb3.infura-ipfs.io/ipfs/QmaTu3g9pZT8wzXmb4nXJwpqkGj1XRUxcD12o6ApyA4wEx');

    // Store the paid amount in the paidAmounts mapping
    paidAmounts[tokenId] = msg.value;

    currentSupply--;
}

    receive() external payable{
    }

    /**
    * @notice redeemGift will redeem the Gift Card 
    * @param _tokenId The token Id of your Gift Card
    */
    
    function redeemGift(uint256 _tokenId) external {
    require(ownerOf(_tokenId) == msg.sender, "You do not own the required NFT token ID.");
    uint256 amount = paidAmounts[_tokenId];
    require(amount > 0, "This token has already been redeemed or was never paid for.");

    // Transfer the amount to the token owner's address
    payable(msg.sender).transfer(amount);

    // Remove the redeemed token's amount from the paidAmounts mapping
    delete paidAmounts[_tokenId];
    }

    /**
    * @notice Withdraw contract funds only owner can call this function
    * @param _to The token Id of your Gift Card
    * @param _amount Amount of ether to withdraw
    */

    function withdraw(address payable _to, uint256 _amount) external onlyOwner {
    require(_to != address(0), "Invalid address");
    require(address(this).balance >= _amount, "Insufficient balance");
    _to.transfer(_amount);
    }

    /**
    * @notice It will increase supply of Gift Card, Onlyowner can call this function
    * @param amount amount to increase supply of Gift Card
    */

    function increaseSupply(uint amount) public onlyOwner {
        currentSupply += amount;
    }

    function getTokenPrice() public pure  returns (uint256) {
        return PASS_PRICE;
    }

   // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage)returns (string memory) {
        return super.tokenURI(tokenId);
    }
}