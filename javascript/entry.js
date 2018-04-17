import GameEngine from './game/game_engine';

window.onload = () => {
  const canvas = document.getElementById("game");
  const myGame = new GameEngine(canvas, 60);
}
