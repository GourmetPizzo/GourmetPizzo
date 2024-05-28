import { headers } from "next/headers";
import { RankingData } from "../db";
import { UserVerify } from "../jwtkey";

// /api/mydata post 요청 : 나의 랭킹데이터 조회
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const User_Address = await data?.User_Address;

    if (!data) {
      return Response.json({
        status: 404,
        message: "MyRanking Data Search Not Found1",
      });
    }

    const Ranking_Data = await RankingData();

    const total_point = Ranking_Data?.total_point?.findIndex(
      (data) => +data.User_Address === +User_Address
    );

    const point = Ranking_Data?.point?.findIndex(
      (data) => +data.User_Address === +User_Address
    );

    const Ranking = Ranking_Data?.point?.find((data) => {
      if (data.User_Address === User_Address) {
        return data;
      }
    });

    if (!Ranking) {
      return Response.json({
        status: 404,
        message: "MyRanking Data Search Not Found2",
      });
    }

    const result = {
      ...Ranking,
      total_rank: total_point !== undefined ? total_point + 1 : "unknown",
      personal_rank: point !== undefined ? point + 1 : "unknown",
    };

    return Response.json({
      status: 200,
      message: "MyRanking Data Search Success",
      Data: result,
    });
  } catch (error) {
    console.log("MyRanking Data Search Error : " + error);
  }
}
