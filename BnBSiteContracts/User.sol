// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// 맵핑 -> 어드레스 : {point:포인트, 누적포인트 : 누적포인, 토큰(?)}
// 포인트는 그 저 점수고
// 랭킹에 따라 토큰을 배분하기로 함
// 토큰 => 어드레스로 받아와서 관리 ERC-20로직에 관리로직이 있음
// 주소로 바로조회도 되고, 서명해서 가져오게하기도 됨
// 유저의 점수를 관리하는 거랑 토큰을 가지고 있는 컨트랙트 통합시킨 컨트랙트가 필요
// Getter, Setter 필요, 시즌제라서 값초기화 만들어야함

// contract User {

//     struct Test {
//         uint256 User_Point; // High_Point 한판최고점수
//         uint256 Total_Point; // 누적포인트
//     }

//     mapping(address => Test) Users;

//     // 기존 User_Point보다 입력받은 포인트가 크면 point를 반환한다.
//     function UserPointSolstice(uint256 point) public view returns (uint256){
//         return Users[tx.origin].User_Point < point ? point : Users[tx.origin].User_Point;
//     }

//     // 자신이외의 사람이 업데이트 하는 걸 막아야 한다. revort, address를 빼고 본인 주소 넣기
//     function UpdatePoint(uint point) public {
//         require(point > 0, "pint zero impossible");
//         Users[tx.origin].User_Point = UserPointSolstice(point);
//         Users[tx.origin].Total_Point += point;
//     }

//     // 지금 들어온 address의 포인트 조회 함수
//     function GetUserPoint() public view returns(Test memory){
//         return Users[tx.origin];
//     }
// }

contract User {
    struct Test {
        uint256 userPoint; // High_Point 한판최고점수
        uint256 totalPoint; // 누적포인트
    }

    mapping(address => Test) users;

    function _userPointSolstice(uint256 point) private view returns (uint256) {
        return users[tx.origin].userPoint < point ? point : users[tx.origin].userPoint;
    }

    function updatePoint(uint point) public {
        require(point > 0, "pint zero impossible");
        users[tx.origin].userPoint = _userPointSolstice(point);
        users[tx.origin].totalPoint += point;
    }

    // 지금 들어온 address의 포인트 조회 함수
    function getUserPoint() public view returns (uint256, uint256) {
        return (users[tx.origin].userPoint, users[tx.origin].totalPoint);
    }
}
