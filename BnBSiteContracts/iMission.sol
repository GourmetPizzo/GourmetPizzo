// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

interface MissionInterface {
    // 출석체크
    function checkIn(uint256 today) external;

    // 초대
    function inviteCheck() external;

    // 트위터
    function twitterCheck() external;

    // 미션 확인
    function getMission(uint256 today) external view;
}
