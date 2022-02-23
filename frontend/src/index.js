import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/navigation/header/header.component";
import Footer from "./components/navigation/footer/footer.component";
import Game2 from "./components/svg/game/game2.component";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename='/'>
      {/* <Game2 /> */}

      <Header />
      <main className='main'>
        <App />
      </main>
      <Footer />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
