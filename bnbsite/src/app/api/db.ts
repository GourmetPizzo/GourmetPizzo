import { MongoClient, ServerApiVersion } from "mongodb";

// 데이터베이스 불러오기
export async function DataBase() {
  try {
    // DB연결 URL
    const uri = `mongodb+srv://${process.env.NEXT_PUBLIC_DB_USER}:${process.env.NEXT_PUBLIC_DB_PW}@cluster0.iy6m7ez.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

    // DB Client 불러오기
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    return client;
  } catch (err) {
    console.log("Error : " + err);
  }
}

/* --------------------------------------------Rank관련 함수-------------------------------------------- */

// UserRank collection 연결
export async function Rank() {
  try {
    const client = await DataBase();
    const DB = client?.db("CoinRank");
    const Collection = DB?.collection("UserRank");

    return Collection;
  } catch (error) {
    console.log("ERROR : " + error);
  }
}

// 유저 조회 함수
export async function FindUser(Address: string) {
  try {
    console.log(Address);
    const Collection = await Rank();

    const result = Collection?.findOne({ User_Address: Address });

    return result;
  } catch (error) {
    console.log("ERROR : " + error);
  }
}

// 게임 업데이트 데이터 타입
export type Data = {
  User_Address: string;
  point: number;
  total_point: number;
};

// 게임 끝나고 게임 데이터를 DB에 업데이트 하는 함수
export async function GameDataUpdate(InSertData: Data, UserData: Data) {
  try {
    // Data는 게임이 끝나서 받아온 데이터, User는 기존에 존재하는 데이터
    const Data = InSertData;
    const User = UserData;

    // 포인트가 존재하지 않으면 에러로 보내준다. 테스트 필요함
    if (!Data.point) {
      return Response.json({
        status: 404,
        message: "GameDataUpdate but point not Found",
      });
    }

    const point = User.point > Data.point ? User.point : Data.point;
    const total_point = User.total_point
      ? User.total_point + Data.point
      : Data.point;
    console.log("total_point :", total_point);

    const Ranking = await Rank();
    const result = Ranking?.updateOne(
      { User_Address: User.User_Address },
      {
        $set: {
          point: point,
          total_point: total_point,
        },
      }
    );

    return result;
  } catch (error) {
    console.log("GameDataUpdate Error : ", error);
  }
}

// MyRankingData의 등수 조회시켜주는 함수
export async function RankingData() {
  try {
    // 몽고DB는 SORT기능이 있어서 그걸로 바꾸면 좋을듯
    const Ranking = await Rank();
    const total_point = await Ranking?.find()
      ?.sort({ total_point: -1 })
      .toArray();
    const point = await Ranking?.find()?.sort({ point: -1 }).toArray();

    const result = {
      total_point,
      point,
    };

    return result;
  } catch (error) {
    console.log("RankingData Error : ", error);
  }
}

/* --------------------------------------------Item관련 함수-------------------------------------------- */

// Item Collection에 접속
export async function ItemData() {
  try {
    const client = await DataBase();
    const DB = client?.db("CoinRank");
    const Collection = DB?.collection("Item");

    return Collection;
  } catch (error) {
    console.log("ItemData Collection ERROR : " + error);
  }
}

// Item 데이터를 가져와주는 함수
export async function ItemDataGet() {
  try {
    const Collection = await ItemData();

    const result = Collection?.find().toArray();

    return result;
  } catch (error) {
    console.log("ItemDataGet ERROR : " + error);
  }
}

// UserItem collection 연결
export async function UserItem() {
  try {
    const client = await DataBase();
    const DB = client?.db("CoinRank");
    const Collection = DB?.collection("UserItem");

    return Collection;
  } catch (error) {
    console.log("ERROR : " + error);
  }
}

// 새로운 유저가 들어오면 데이터 생성
export async function NewUserItemInsert(User_Address: string) {
  try {
    const User = await UserItem();
    const Address = User_Address;

    User?.insertOne({
      User_Address: Address,
      coin_remove: 0,
      coin_select: 0,
      coin_boom: 0,
    });
  } catch (error) {
    console.log("NewUserItemInsert", error);
  }
}

// 아이템 사용하면 개수 차감
export async function UseItem(User_Address: string, ItemName: string) {
  try {
    const User = await UserItem();
    const GetUserItem = await User?.findOne({ User_Address });

    if (!GetUserItem || GetUserItem[ItemName] === 0) {
      return false;
    }
    const name = ItemName;
    const value = GetUserItem[ItemName] - 1;

    await User?.updateOne(
      { User_Address },
      {
        $set: {
          [name]: value,
        },
      }
    );
    return true;
  } catch (error) {
    console.log("NewUserItemInsert", error);
  }
}

// 아이템 사면 개수 증가
export async function BuyItem(User_Address: string, ItemName: string) {
  try {
    const User = await UserItem();
    const GetUserItem = await User?.findOne({ User_Address });

    // 나중에 포인트 조건 걸어야함 + 차감식 추가
    if (!GetUserItem) {
      return false;
    }

    const name = ItemName;
    const value = GetUserItem[ItemName] + 1;

    await User?.updateOne(
      { User_Address },
      {
        $set: {
          [name]: value,
        },
      }
    );
    return true;
  } catch (error) {
    console.log("NewUserItemInsert", error);
  }
}
