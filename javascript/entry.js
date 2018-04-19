import GameEngine from './game/game_engine';

import MainScene from './game/scenes/main_scene';
import MainMenuScene from './game/scenes/main_menu_scene';

window.onload = () => {
  const canvas = document.getElementById("game");
  const myGame = new GameEngine(canvas, 60, [MainMenuScene, MainScene]);
}
