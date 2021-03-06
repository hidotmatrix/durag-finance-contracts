// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./Duragfinance.sol";

/** title Contract Socks inherits functionality of ERC20 and Ownable contracts */
contract Durags is ERC20, Ownable {
    uint256 public supply;

    address public nftAddress;

    DuragFinance duragFinance;

    constructor(uint256 _supply) ERC20("Durag Finance Edition 0", "DURAGS") {
        supply = _supply;

        /**
         * @dev mint supply tokens to the owner's address
         */
        _mint(0x3C8C40cE9d651f1791e9B0b5aA0B58B873c60660, supply);
    }

    /**
     * @dev burn ERC20 tokens and mint equal amount of ERC721 NFT
     * @param _value amount of ERC20 tokens to be burned
     */
    function burn(uint256 _value) external returns (bool) {
        require(nftAddress != address(0), "burn: nft address cannot be null");
        require(
            _value % (10**decimals()) == 0 && _value != 0,
            "burn: token must be whole number"
        );
        _burn(msg.sender, _value);
        duragFinance = DuragFinance(nftAddress);
        duragFinance.mint(msg.sender, _value / (10**decimals()));
        return true;
    }

    /**
     * @dev allow user to burn ERC20 tokens on behalf of owner and mint ERC721 NFT
     * @param _from user's address
     * @param _value amount of ERC20 tokens to be burned
     */
    function burnFrom(address _from, uint256 _value) external returns (bool) {
        require(
            nftAddress != address(0),
            "burnFrom: nft address cannot be null"
        );
        require(
            _value % (10**decimals()) == 0 && _value != 0,
            "burnFrom: token must be whole number"
        );
        require(allowance(_from, msg.sender) >= _value);
        _burn(_from, _value);
        duragFinance = DuragFinance(nftAddress);
        duragFinance.mint(_from, _value / (10**decimals()));
        return true;
    }

    /**
     * @dev only owner can transfer DuragFinance's Contract ownership
     * @param _newOwner new owner's address
     */
    function transferUnisocksOwnership(address _newOwner) external onlyOwner {
        duragFinance = DuragFinance(nftAddress);
        duragFinance.transferOwnership(_newOwner);
    }

    /**
     * @dev set DuragFinance contract address
     * @param _nftaddress DuragFinance contract address
     * @return nftAddress new DuragFinance contract address
     */
    function setNFTAddress(address _nftaddress)
        external
        onlyOwner
        returns (address)
    {
        nftAddress = _nftaddress;
        return nftAddress;
    }
}
