import React from "react";
import {Link,useHistory} from 'react-router-dom';
import { removeUserSession } from "../../../utils/Common";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { props } from "bluebird";
import "../Sidenav/Sidenav.css";

// import "./styles.css";

function Sidenav(props){
  let history = useHistory();
const Logout=()=>{

  removeUserSession();
// history.push("/");
}


    return (
        <SideNav
          onSelect={selected => {
            // Add your code here
          }}
        >
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="home">

          <NavItem eventKey="home">
              <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
              </NavIcon>
              
              <NavText><Link
              to="/homepage"
              >Home</Link></NavText>
            </NavItem>
            <NavItem eventKey="home">
              <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
              </NavIcon>
              
              <NavText><Link
              to="/dashboard"
              >Dashboard</Link></NavText>
            </NavItem>
            <NavItem eventKey="charts">
              <NavIcon>
                <i
                  className="fa fa-fw fa-line-chart"
                  style={{ fontSize: "1.75em" }}
                />
              </NavIcon>
              <NavText><Link
              to="/stock-dashboard"
              >Stock Dashboard
                </Link></NavText>
            
            
            
            </NavItem>

            <NavItem eventKey="home">
              <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
              </NavIcon>
              
              <NavText>

                <Link to="/" onClick={Logout}>Logout </Link>
                {/* <button onClick={Logout} className="logoutbutton"> */}
                {/* Logout */}
                {/* </button> */}
              </NavText>
            </NavItem>
          </SideNav.Nav>
        </SideNav>
      );
}

export default Sidenav;
