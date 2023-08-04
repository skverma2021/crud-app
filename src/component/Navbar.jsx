import { AppBar, Toolbar, Typography, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';

const Header = styled(AppBar)`
  background: #111111;
`;

const Tabs = styled(NavLink)`
  color: #ffffff;
  margin-right: 20px;
  text-decoration: none;
  font-size: 20px;
`;

function Navbar() {
  return (
    <Header position='static'>
      <Toolbar>
        <Tabs to='/emp'>Employees</Tabs>
        {/* <Tabs to='/add'>Add</Tabs> */}
        {/* <Tabs to='/upd'>Modify</Tabs>
        <Tabs to='/del'>Delete</Tabs> */}
        <Tabs to='/job/all'>Jobs</Tabs>
      </Toolbar>
    </Header>
  );
}

export default Navbar;
