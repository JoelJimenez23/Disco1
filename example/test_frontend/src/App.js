import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Home from "./Home"
import Register from "./Register";
import Login from "./Login";
import PremiumContent from "./PremiumContent";
import PrivateRoute from "./PrivateRoute";
import ExperimentRoute from "./ExperimentRoute";



// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//       <div className="header">
//         <NavLink exact activeClassName="active" to="/">Home</NavLink>
//         <NavLink activeClassName="active" to="/register">Register</NavLink>
//         <NavLink activeClassName="active" to="/login">Login</NavLink>
//         <NavLink activeClassName="active" to="/premium-content">Premium Page</NavLink>
//       </div>
//       <div className="content">
//         <Routes>
//           <Route exac path="/" Component={Home}/>
//           <Route path="/register" Component={Register}/>
//           <Route path="/login" Component={Login}/>
//           <ExperimentRoute path="/premium-content" Component={PremiumContent}/>
//         </Routes>
//       </div>
//       </BrowserRouter>
//     </div>
//   );
// }
// export default App;




function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className="header">
        <NavLink exact activeClassName="active" to="/">Home</NavLink>
        <NavLink activeClassName="active" to="/register">Register</NavLink>
        <NavLink activeClassName="active" to="/login">Login</NavLink>
        <NavLink activeClassName="active" to="/premium-content">Premium Page</NavLink>
      </div>
      <div className="content">
        <Routes>
          <Route exac path="/" element={<Home />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />}/>

          <Route path="/premium-content" element={<ExperimentRoute/>}>
            <Route path="/premium-content" element={<PremiumContent/>}/>
          </Route>
          
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}
export default App;


          {/* <ExperimentRoute path="/premium-content" component={<PremiumContent/>}/> */}
