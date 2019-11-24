import { BrowserWindow } from "electron";
import indexPage from "../index.html";

const window_ref = {};

export function createWindow(key, options = {}) {
  console.log('createWindow', key, options);
  // forceNew alias
  const isForceNew = options.forceNew && options.alias;
  const k = isForceNew ? `${key}:${options.alias}` : key;
  const theWin = window_ref[k];

  if (theWin && !isForceNew) {
    return theWin;
  }

  const sizeConfig = {
    width: 800,
    height: 600
  };
  if (options.type === "navi") {
    sizeConfig.width = 400;
    sizeConfig.height = 650;
  }
  const newWin = new BrowserWindow({
    ...sizeConfig,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: false
    }
  });
  window_ref[k] = newWin;
  newWin.loadFile(indexPage);
  newWin.once("ready-to-show", () => {
    newWin.show();
  });
  newWin.once("closed", () => {
    window_ref[k] = undefined;
  });

  return newWin;
}
