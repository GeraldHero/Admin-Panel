import React from 'react';
import { Nav } from 'react-bootstrap';
import myStyle from './MyDashboardSidebar.module.css';
import BusinessIcon from '@mui/icons-material/Business';
const MyDashboardSidebar = () => {
  return (
    <Nav
      className={`d-none d-md-block ${myStyle.sidebarNav}`}
      activeKey="/dashboard"
      onSelect={(selectedKey) => {}}
    >
      <Nav.Item>
        <Nav.Link href="/dashboard/Company">
          <BusinessIcon color="secondary" />
          Company Data
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Link</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">Link</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="disabled" disabled>
          Disabled
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default MyDashboardSidebar;
