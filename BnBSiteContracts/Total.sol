// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// interface 파일 가져오기
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./iToken.sol";
import "./IUser.sol";
import "./iMission.sol";
import "./Token.sol";

contract Total is ReentrancyGuard {
    uint8 totalAward = 3;
    PizzoToken public token;

    // 이벤트 정의
    event AwardsMinted(address[] recipients, uint256[] amounts);
    event UserGameEnded(address indexed userAddress, uint points);
    event PointQueried(address indexed userAddress, uint256 points);
    event TwitterChecked(address indexed missionAddress);
    event InviteChecked(address indexed missionAddress);
    event TodayChecked(address indexed missionAddress, uint256 today);
    event TodayMissionChecked(address indexed missionAddress, uint256 today);

    constructor() {
        token = new PizzoToken(address(this));
    }

    function mintTokens(uint256 amount) external {
        token.mint(amount);
    }

    function getTokenBalance(address account) external view returns (uint256) {
        return token.balanceOf(account);
    }

    // 외부에서 상을 받는 유저의 address를 배열값으로 전송하면
    function awardsMint(
        address[] memory recipients,
        uint256[] memory amounts
    ) public nonReentrant {
        require(recipients.length == totalAward, "Invalid recipients value");
        require(amounts.length == totalAward, "Invalid amounts value");

        token.awardsSend(recipients, amounts);
        emit AwardsMinted(recipients, amounts);
    }

    function userGameEnd(address userAddr, uint points) public nonReentrant {
        UserInterface(userAddr).updatePoint(points);
        emit UserGameEnded(userAddr, points);
    }

    // function getPoint(address userAddr) public view returns (uint256, uint256) {
    //     return UserInterface(userAddr).getUserPoint();
    // }

    function checkMission(
        address missionAddr,
        string memory missionType,
        uint256 today
    ) public nonReentrant {
        if (
            keccak256(abi.encodePacked(missionType)) ==
            keccak256(abi.encodePacked("Twitter"))
        ) {
            MissionInterface(missionAddr).twitterCheck();
            emit TwitterChecked(missionAddr);
        } else if (
            keccak256(abi.encodePacked(missionType)) ==
            keccak256(abi.encodePacked("Invite"))
        ) {
            MissionInterface(missionAddr).inviteCheck();
            emit InviteChecked(missionAddr);
        } else if (
            keccak256(abi.encodePacked(missionType)) ==
            keccak256(abi.encodePacked("CheckIn"))
        ) {
            MissionInterface(missionAddr).checkIn(today);
            emit TodayChecked(missionAddr, today);
        } else if (
            keccak256(abi.encodePacked(missionType)) ==
            keccak256(abi.encodePacked("Mission"))
        ) {
            MissionInterface(missionAddr).getMission(today);
            emit TodayMissionChecked(missionAddr, today);
        } else {
            revert("Unknown mission type");
        }
    }
}
