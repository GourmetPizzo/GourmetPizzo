// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract MissonContract {
    struct Mission {
        bool twitter; // 트위터
        bool invite; // 친구 초대
        mapping(uint256 => bool) attendance; // 출석체크를 한 날짜를 저장하는 매핑
    }
    mapping(address => Mission) userMission;

    // 출석체크 함수 
    function checkIn(uint256 today) external {
        // 이미 출석했는지 확인
        require(
            !userMission[tx.origin].attendance[today],
            "Already checked in today"
        );
        userMission[tx.origin].attendance[today] = true;
    }

    // 트위터 팔로우 함수
    function twitterCheck() external {
        // 트위터 체크
        require(!userMission[tx.origin].twitter, "Already checked in today");
        userMission[tx.origin].twitter = true;
    }

    // 초대링크 함수
    function inviteCheck() external {
        // 초대 체크
        require(!userMission[tx.origin].invite, "Already checked in today");
        userMission[tx.origin].invite = true;
    }

    // 미션 조회
    function getMission(
        uint256 today
    ) external view returns (bool, bool, bool) {
        return (
            userMission[tx.origin].twitter,
            userMission[tx.origin].invite,
            _getAttendance(today)
        );
    }

    // 출석체크 내역 조회
    function _getAttendance(uint256 today) internal view returns (bool) {
        return userMission[tx.origin].attendance[today];
    }
}
