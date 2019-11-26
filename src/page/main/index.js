import React from "react";
import ReactDOM from "react-dom";

import styles from "./index.css";

export default function AppMain() {
  return (
    <div className={styles.mainWindow}>
      <div className={styles.content}></div>
      <div className={styles.footer}>
        <div className={styles.footerItem}>HighLight</div>
        <div className={styles.footerItem}>ToDo</div>
        <div className={styles.footerItem}>Note</div>
      </div>
    </div>
  );
}

ReactDOM.render(<AppMain />, document.getElementById("app-root"));
