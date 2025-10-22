import "./styles.css";
import * as globals from "./globals.js";
import * as domManager from "./dom/dom-manager.js";
import "./data-manager.js";

domManager.updateProjectList();
domManager.displaySelectedTab(globals.getSelectedTab());
