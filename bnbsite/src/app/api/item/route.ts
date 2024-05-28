import { BuyItem, ItemDataGet } from "../db";
import { UserVerify } from "../jwtkey";

export async function GET() {
  try {
    // Item 데이터를 받아오기
    const Items = await ItemDataGet();

    // Item 데이터가 존재하지 않을 떄 or 찾을수 없을 때 오는 오류 메세지
    if (!Items?.length) {
      return Response.json({
        status: 404,
        message: "ItemData not Search DataBase or ItemCollection Not Found",
      });
    }

    return Response.json({
      status: 205,
      message: "Item Data List Search Success!!!",
      Data: Items,
    });
  } catch (error) {
    console.log("Item Data Search Error : ", error);
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const Address = await data?.User_Address;
    const ItemName = await data?.name;

    const Access_Token: string = req.headers.get("authorization") || "";
    const LoginAccess = await UserVerify(Address, Access_Token.split(" ")[1]);

    if (!Address || !ItemName || !LoginAccess) {
      return Response.json({
        status: 404,
        message: "Item Update Address or name Not Found",
      });
    }

    const result = await BuyItem(Address, ItemName);

    if (!result) {
      return Response.json({
        status: 404,
        message: "Not enough points.",
      });
    }

    return Response.json({
      status: 200,
      message: "Item Buy Update Success",
    });
  } catch (error) {
    console.log("Item Update Error : ", error);
  }
}
