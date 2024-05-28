import { getAccessKey, getRefreshKey } from "../jwtkey";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const User_Address = await data?.User_Address;

    if (!User_Address) {
      return Response.json({
        status: 404,
        message: "User Address Data Search Not Found",
      });
    }

    const Access_Token = "Beare " + getAccessKey(User_Address);
    const Refresh_Token = getRefreshKey(User_Address);
    console.log("Access_Token", Access_Token);
    console.log("Refresh_Token", Refresh_Token);

    if (!Access_Token || !Refresh_Token) {
      return Response.json({
        status: 404,
        message: "Token Not Found!",
      });
    }

    return Response.json(
      {
        status: 200,
        message: "Token Success",
      },
      {
        headers: {
          "Content-Type": "text/html",
          Access_Token,
          "Set-Cookie": `Refresh_Token=${Refresh_Token}`,
        },
      }
    );
  } catch (error) {
    console.log("Login Error : ", error);
  }
}
