import { create } from "zustand";

type State = {
  Address: string;
  MyData: MyData;
  InviteAddress: string;
  Balance: number;
  NFTName: string;
};
interface MyData {
  id: string;
  User_Address: string;
  total_rank: number;
  personal_rank: number;
  total_point: number;
  point: number;
}
type Actions = {
  AddressUpdate: (address: string) => void;
  AddressDelete: () => void;
  MyDataUpdate: (data: MyData) => void;
  InviteAddressUpdate: (address: string) => void;
  BalanceUpdate: (balance: number) => void;
  NFTUpdate: (name: string) => void;
  NFTDelete: () => void;
};

export const useCountStore = create<State & Actions>((set) => ({
  Address: "",
  Balance: 0,
  MyData: {
    id: "",
    User_Address: "",
    total_rank: 0,
    personal_rank: 0,
    total_point: 0,
    point: 0,
  },
  InviteAddress: "",
  NFTName: "",
  InviteAddressUpdate: (address: string) => set({ InviteAddress: address }),
  MyDataUpdate: (data: MyData) => set({ MyData: data }),
  AddressUpdate: (address: string) => set({ Address: address }),
  AddressDelete: () => set(() => ({ Address: "" })),
  BalanceUpdate: (balance: number) => set({ Balance: balance }),
  NFTUpdate: (name: string) => set({ NFTName: name }),
  NFTDelete: () => set(() => ({ NFTName: "" })),
}));
