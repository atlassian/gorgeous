// @flow
import React, { Fragment } from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
import { colors as akColors } from '@atlaskit/theme';
import { grid, sidebarWidth } from '../../constants';
import type { docsPage, sitePage } from '../types';
import { getTitleFromExamplePath } from '../../utils';

const Sidebar = styled.div`
  height: 100vh;
  width: ${sidebarWidth}px;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  top: 0;
  background: ${akColors.G50};
  overflow: auto;
  padding-bottom: ${grid * 2}px;

  ::-webkit-scrollbar {
    width: ${grid}px;
  }

  ::-webkit-scrollbar-track {
    background-color: pink;
  }

  ::-webkit-scrollbar-thumb {
    background-color: darkgrey;
  }
`;

const Section = styled.div`
  margin-top: ${grid * 3}px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 20px;
  padding: ${grid}px;
  padding-left ${grid * 2}px;
`;
const Item = styled.h4`
  padding: ${grid}px;
  padding-left: ${grid * 3}px;
`;

const StyledLink = styled(Link)`
  color: ${akColors.N600};
  transition: background-color ease 0.2s, color ease 0.2s;

  :hover, :active, :focus {
    color: white;
    background: ${props => props.hoverColor};
    text-decoration: none;
  }
`;

type NavItemProps = {|
  href: string,
  title: string,
  hoverColor: string,
  // TODO
  // isActive?: boolean,
  isTitle?: boolean,
|}

const NavItem = ({ isTitle, href, title, hoverColor }: NavItemProps) => {
  const Wrapper = isTitle ? Title : Item;
  return (
    <StyledLink hoverColor={hoverColor} to={href} href={href}>
      <Wrapper>
        {title}
      </Wrapper>
    </StyledLink>
  );
};

type NavFromUrlsProsp = {
  pages: sitePage,
  href: string,
  title: string,
}

const NavFromUrls = ({ pages, href, title }: NavFromUrlsProsp) => (
  <Fragment>
    <NavItem hoverColor={akColors.Y300} isTitle href={href} title={title} />
    {pages.edges.map((page) => {
    const { path } = page.node;
    return (
      <NavItem
        key={path}
        hoverColor={akColors.Y300}
        href={path}
        title={getTitleFromExamplePath(path, href)}
      />
    );
  })}
  </Fragment>
);

type Props = {
  docs: docsPage,
  examples: sitePage,
  internal: sitePage,
  showInternal: boolean,
}

export default ({ docs, examples, internal, showInternal }: Props) => (
  <Sidebar>
    <h2>Header goes here</h2>
    <Section>
      <NavItem isTitle href="/documentation" title="Documentation" hoverColor={akColors.B300} />
      {docs.edges.map((page) => {
        const { slug, title } = page.node.fields;
        return <NavItem key={slug} href={slug} title={title} hoverColor={akColors.B300} />;
      })}
    </Section>
    <Section>
      <NavFromUrls href="/examples/" title="Examples" pages={examples} />
    </Section>
    {showInternal ? <Section><NavFromUrls href="/internal/" title="Internal Examples" pages={internal} /></Section> : null}
  </Sidebar>
);
