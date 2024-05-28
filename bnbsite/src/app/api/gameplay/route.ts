import {
  Data,
  FindUser,
  GameDataUpdate,
  NewUserItemInsert,
  Rank,
  RankingData,
} from "../db";
import { UserVerify } from "../jwtkey";

// /api/gameplay get 요청 : 랭킹데이터 조회
export async function GET() {
  try {
    const Ranking_Data = await RankingData();

    const PersonalRank = Ranking_Data?.point?.filter((data, idx) => {
      return idx < 10;
    });
    const TotalRank = Ranking_Data?.total_point?.filter((data, idx) => {
      return idx < 10;
    });
    console.log("TotalRank", TotalRank);
    return Response.json({
      status: 200,
      message: "GamePlay GET Success",
      Data: {
        PersonalRank: PersonalRank,
        TotalRank: TotalRank,
      },
    });
  } catch (error) {
    console.log("GamePlay Ranking Search Error : " + error);
  }
}

// /api/gameplay post 요청 : 게임 끝나고 요청하는 부분
export async function POST(req: Request) {
  try {
    const Ranking = await Rank();
    const data = await req.json();
    const User_Address = await data["User_Address"];

    const Access_Token: string = req.headers.get("authorization") || "";

    const LoginAccess = await UserVerify(
      User_Address,
      Access_Token.split(" ")[1]
    );
    if (!data.point || !User_Address || !LoginAccess) {
      return Response.json({
        status: 404,
        message: "GamePlay Update User point Not Found!!! plz point send!",
      });
    }

    const FindData = await FindUser(User_Address);

    if (!FindData) {
      const InsertData = {
        ...data,
        total_point: data.point,
      };
      const result = await Ranking?.insertOne(InsertData);
      await NewUserItemInsert(User_Address);
      console.log("result", result);

      return Response.json({
        status: 205,
        message: "New User Update Success",
      });
    }

    await GameDataUpdate(data, FindData as unknown as Data);

    return Response.json({
      status: 205,
      message: "GamePlay Update Success",
    });
  } catch (error) {
    console.log("GamePlay Update ERROR : " + error);
  }
}
