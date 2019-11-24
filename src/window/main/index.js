import { createWindow } from "..";
class MainWindow {
  create() {
    this.win = createWindow("navi-main", {
      type: "navi"
    });
    
  }
  show() {
    this.win.show();
  }
}

export default new MainWindow();
