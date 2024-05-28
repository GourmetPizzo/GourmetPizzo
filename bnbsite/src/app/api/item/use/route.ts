import { UseItem } from "../../db";
import { UserVerify } from "../../jwtkey";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const Address = await data.User_Address;
    const ItemName = await data.name;

    const Access_Token: string = req.headers.get("authorization") || "";
    const LoginAccess = await UserVerify(Address, Access_Token.split(" ")[1]);

    if (!Address || !ItemName || !LoginAccess) {
      return Response.json({
        status: 404,
        message: "Item Update Address or name Not Found",
      });
    }

    const result = await UseItem(Address, ItemName);

    if (!result) {
      return Response.json({
        status: 404,
        message: "Insufficient number of items",
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
