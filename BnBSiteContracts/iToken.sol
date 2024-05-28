// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

interface IPizzoToken  {
    // Token발행 to = 주소, amount = 발행할 총량
    function mint(uint256 amount) external;

    // 상금을 탄 유저들에게 상금을 보내는 함수
    function awardsSend(
        address[] memory recipients,
        uint256[] memory amounts
    ) external returns (bool);

    // User에게 Transfer하는 거
    function userTransfer(
        address TokenAddress,
        address to,
        uint value
    ) external returns (bool);
}
