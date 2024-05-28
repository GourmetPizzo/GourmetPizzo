const buttonBgm = () => {
  const bgm = new Audio("/sounds/button.mp3");
  bgm.volume = 0.5;
  return bgm.play();
};

export default buttonBgm;
