// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import {IConnext} from "@connext/smart-contracts/contracts/core/connext/interfaces/IConnext.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol"; 

interface IWETH {
  function deposit() external payable;
  function approve(address guy, uint wad) external returns (bool);
}

/**
 * @title BridgePass
 * @author Karan J Goraniya & Jeet Patel
 * @notice Crypto Gift Card for cross-chain.
 */

contract BridgePass is ERC721, ERC721URIStorage, Ownable{
  // The connext contract on the origin domain
    IConnext public immutable connext;

    using Counters for Counters.Counter;
 
    Counters.Counter private _tokenIdCounter;

    // Pass price is 0.0001 ETH + Relayer Fee
    // uint public constant PASS_PRICE = 0.0301 ether;

    // for mainnet Pass Price + Relayer Fee 0.0001 ETH + 0.0004 ETH  Op
    uint public constant PASS_PRICE = 0.0004 ether;

    uint public currentSupply = 50;


    struct giftCardItem {
        address payable minter; // address of the minter
        address payable giftCardOwner; // address of the giftCardOwner
        bool isRedeemed; // redeemed or not
        uint256 giftCardAmt; // gift card amount
    }

    mapping(uint256 => giftCardItem) private trackGiftCard;

    constructor(address _connext) ERC721("BridgePass", "BDP") {
        connext = IConnext(_connext);
    }

    receive() external payable{
    }

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

        // send the ether to the contract address
        payable(address(this)).transfer(msg.value);

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, 'https://roadtoweb3.infura-ipfs.io/ipfs/QmaTu3g9pZT8wzXmb4nXJwpqkGj1XRUxcD12o6ApyA4wEx');
        
        // decrease the current supply
        currentSupply--;

        // update the giftcard information
        trackGiftCard[tokenId] = giftCardItem(
            payable(msg.sender), // address of minter
            payable(to), // address of giftCard user
            false, // isRedeemed
            msg.value // update value
        );
    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

     /**
    * @notice It will increase supply of Gift Card, Onlyowner can call this function
    * @param amount amount to increase supply of Gift Card
    */

    function increaseSupply(uint amount) public onlyOwner {
        currentSupply += amount;
    }


    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function getTokenPrice() public pure returns (uint256) {
        return PASS_PRICE;
    }

    function burn(uint256 tokenId) external  {
        require(ownerOf(tokenId) == msg.sender,"You are not owner!");
        _burn(tokenId);
    }
 
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage)returns (string memory) {
        return super.tokenURI(tokenId);
    }

    /**
   * @notice Transfers native assets from one chain to another.
   * @param destinationUnwrapper Address of the Unwrapper contract on destination.
   * @param weth Address of the WETH contract on this domain.
   * @param amount The amount to transfer.
   * @param recipient The destination address (e.g. a wallet).
   * @param destinationDomain The destination domain ID.
   * @param slippage The maximum amount of slippage the user will accept in BPS.
   * @param relayerFee The fee offered to relayers.
   * @param _tokenId Id of your Gift Card to redeem
   */

    function redeemGiftCard(
        address destinationUnwrapper,
        address weth,
        uint256 amount,
        address recipient,
        uint32 destinationDomain,
        uint256 slippage,
        uint256 relayerFee,
        uint256 _tokenId
    ) external {
        // require user does not own the nft id already
        require(ownerOf(_tokenId) == msg.sender, "You do not own the required NFT token ID.");

        // require the sender is the inteded giftcard user
        require(msg.sender == trackGiftCard[_tokenId].giftCardOwner, "This giftCard is not valid for you");

        // require the gift card has not been redeemed already
        require(!trackGiftCard[_tokenId].isRedeemed, "You have already redeemed this NFT.");

        // require the gift card value is not zero
        require(trackGiftCard[_tokenId].giftCardAmt > 0, "Gift card has Zero Balance");

        // Wrap ETH into WETH to send with the xcall
        IWETH(weth).deposit{value: amount}();
        // This contract approves transfer to Connext
        IWETH(weth).approve(address(connext), amount);

        // Encode the recipient address for calldata
        bytes memory callData = abi.encode(recipient);

        // xcall the Unwrapper contract to unwrap WETH into ETH on destination
        connext.xcall{value: relayerFee}(
            destinationDomain,    // _destination: Domain ID of the destination chain
            destinationUnwrapper, // _to: Unwrapper contract
            weth,                 // _asset: address of the WETH contract
            msg.sender,           // _delegate: address that can revert or forceLocal on destination
            amount,               // _amount: amount of tokens to transfer
            slippage,             // _slippage: the maximum amount of slippage the user will accept in BPS (e.g. 30 = 0.3%)
            callData              // _callData: calldata with encoded recipient address
        );

        // update to giftcard redeemed and update giftcard amount to 0
        trackGiftCard[_tokenId] = giftCardItem(
            trackGiftCard[_tokenId].minter,
            trackGiftCard[_tokenId].minter,
            true,
            0
        );
    } 
}