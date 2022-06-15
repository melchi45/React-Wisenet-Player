import React from 'react';
import { render } from 'react-dom';

import Newtab from './Newtab';
import './index.css';

import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

//https://www.npmjs.com/package/react-pro-sidebar
//https://github.com/azouaoui-med/react-pro-sidebar
render(
  <ProSidebar>
    <Menu iconShape="square">
      <SubMenu title="Components">
        <MenuItem>Component 1</MenuItem>
        <MenuItem>Component 2</MenuItem>
      </SubMenu>
    </Menu>
    <SidebarHeader>
      {/**
       *  You can add a header for the sidebar ex: logo
       */
      }
    </SidebarHeader>
    <SidebarContent>
      {/**
       *  You can add the content of the sidebar ex: menu, profile details, ...
       */}
    </SidebarContent>
    <SidebarFooter>
      {/**
       *  You can add a footer for the sidebar ex: copyright
       */}
    </SidebarFooter>
  </ProSidebar>,
  window.document.querySelector('#menu-container')
);
render(<Newtab />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
