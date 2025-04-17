import Header from "components/header/Header";
import Router from "Router";
import { GlobalStyle } from "style/GlobalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Router />
    </>
  );
}

export default App;
