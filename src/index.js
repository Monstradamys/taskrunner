import React from "react"; 
import ReactDOM from "react-dom";
import App from "./app.js";

import "./styles/style.scss";

ReactDOM.render(<App/>, document.getElementById("root"));

if(module.hot !== undefined) module.hot.accept();
