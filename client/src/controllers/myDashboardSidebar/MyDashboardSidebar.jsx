import React from 'react';
import { Nav } from 'react-bootstrap';
import myStyle from './MyDashboardSidebar.module.css';
import BusinessIcon from '@mui/icons-material/Business';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { Link } from 'react-router-dom';

const MyDashboardSidebar = () => {
  return (
    <Nav
      className={`d-none d-md-block ${myStyle.sidebarNav}`}
      activeKey="/company"
      defaultActiveKey="/company"
      onSelect={(selectedKey) => {}}
    >
      {' '}
      <Nav.Item>
        {' '}
        <Nav.Link className={myStyle.buttonWithIcon} as={Link} to="/company">
          <BusinessIcon className="mx-2" /> Companies
        </Nav.Link>{' '}
      </Nav.Item>{' '}
      <Nav.Item>
        <Nav.Link className={myStyle.buttonWithIcon} as={Link} to="/employee">
          <BadgeOutlinedIcon className="mx-2" />
          Employees
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className={myStyle.buttonWithIcon} as={Link} to="/profile">
          <PermIdentityIcon className="mx-2" />
          My Profile
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className={myStyle.buttonWithIcon} as={Link} to="/admin">
          <AdminPanelSettingsOutlinedIcon className="mx-2" />
          Admin
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default MyDashboardSidebar;
