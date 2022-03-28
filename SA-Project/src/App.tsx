import { Route } from "react-router-dom";

import Navbar from "./components/Headers/Navbar";
import Wizard from "./components/Creator/Wizard";
// import SA_Creator from "./components/Creator/SA-creator";
// import CreatorTemplates from "./components/Templates/SA-templates";

const App = () => {
  return (
    <div>
      <Navbar />
      <Route path="/" component={Wizard} />
      {/* <SA_Form/> */}
      {/* <CreatorTemplates /> */}
      {/* <SA_Creator /> */}
    </div>
  );
};

export default App;
