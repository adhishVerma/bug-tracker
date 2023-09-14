import React from 'react';
import styled from '@emotion/styled';
import { SideMenu } from './SideMenu';
import useUser from "../../functions/store";


export const Layout = (props) => {
  const user = useUser((state) => state.user);

  return (
    <Container>
      {user && <Sidebar>
        <SideMenu />
      </Sidebar>}
      <Content>
        {props.children}
      </Content>
    </Container>
  )
}

const Container = styled.div`
  min-height: calc(100vh - 80px);
  display : flex;
`;

const Sidebar = styled.div`
    min-width : 300px;
    padding : 1em; 
    background : rgba(233,233,233,1);   
`;

const Content = styled.div`
    padding : 1em;
    width : 100%;
`;