import { DefaultPageSetting } from "./Style";
import Header from "./components/header/header";
import GameIntroduction from "./components/mainpages/gameintroduction/gameintroduction";
import MainContents from "./components/mainpages/maincontents/maincontents";
import MainStory from "./components/mainpages/mainmiddle/mainstory";

export default function Home() {
  return (
    <div className={`flex flex-col`}>
      <Header />
      <div className={`flex flex-col ${DefaultPageSetting} gap-[100px]`}>
        <MainContents />
        <MainStory />
        <GameIntroduction />
      </div>
    </div>
  );
}
