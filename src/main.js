import { app } from "electron";
import { createWindow } from "./window";
import mainWindow from "./window/main";
import { init, addService } from "./service";

app.on("ready", () => {
  init();
  addService("createWindow", createWindow);
  mainWindow.create();
});
