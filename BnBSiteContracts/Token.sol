// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// import "./ERC20/token/ERC20/ERC20.sol";
import "./ERC20/access/Ownable.sol";
import "./ERC20/token/ERC20/extensions/ERC20Permit.sol";
import "./iToken.sol";

contract PizzoToken is ERC20, Ownable, ERC20Permit, IPizzoToken {
    // 이벤트 정의
    event Mint(address indexed to, uint256 amount);
    event AwardsSent(address[] recipients, uint256[] amounts);

    constructor(
        address initialOwner
    )
        ERC20("PizzoToken", "PZO")
        Ownable(initialOwner)
        ERC20Permit("PizzoToken")
    {}

    // 소유자만 새로운 토큰을 발행할 수 있는 함수
    function mint(uint256 amount) public onlyOwner {
        // require(to != address(0), "Mint to the zero address");
        uint256 value = decimal(amount);
        _mint(address(this), value);
        emit Mint(address(this), value);
    }
    

    function decimal(uint256 value) public pure returns (uint256) {
        return value * (10 ** 18);
    }

    // 여러 수신자에게 토큰을 전송하는 함수
    function awardsSend(
        address[] memory recipients,
        uint256[] memory amounts
    ) public returns (bool) {
        require(recipients.length == amounts.length, "Arrays length mismatch");
        require(recipients.length > 0, "No recipients");

        for (uint256 i = 0; i < recipients.length; i++) {
            require(
                recipients[i] != address(0),
                "Transfer to the zero address"
            );
            uint256 _amount = decimal(amounts[i]);

            _transfer(address(this), recipients[i], _amount);
        }

        emit AwardsSent(recipients, amounts);
        return true;
    }

    function userTransfer(
        address TokenAddress,
        address to,
        uint value
    ) public returns (bool) {
        uint256 _amount = decimal(value);
        _transfer(TokenAddress, to, _amount);
        return true; // or return the result of _transfer if it returns a boolean
    }
}
