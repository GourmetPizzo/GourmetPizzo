// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

interface UserInterface {
    // UserPoint 업데이트 함수
    function updatePoint(uint point) external;

    // UserPoint 죄회하는 함수
    function getUserPoint() external view;
}
