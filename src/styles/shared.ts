import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { colors } from './colors';
import { darken, lighten } from 'polished';

export const outer = css`
  position: relative;
  padding: 0 5vw;
`;

// Centered content container blocks
export const inner = css`
  margin: 0 auto;
  max-width: 1040px;
  width: 100%;
`;

export const SiteMain = css`
  z-index: 100;
  flex-grow: 1;

  @media (prefers-color-scheme: dark) {
    background: ${colors.darkmode};
  }
`;

export const SiteTitle = styled.h1`
  z-index: 10;
  margin: 0 0 0 -2px;
  padding: 0;
  font-size: 5.0rem;
  line-height: 1em;
  font-weight: 600;
`;

export const SiteDescription = styled.h2`
  z-index: 10;
  margin: 0;
  padding: 5px 0;
  font-size: 2.1rem;
  line-height: 1.4em;
  font-weight: 400;
  opacity: 0.8;
`;

export const Posts = css`
  overflow-x: hidden;
`;

export const PostFeed = css`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin: 0 -20px;
  padding: 50px 0 0;
  background: #fff;

  @media (prefers-color-scheme: dark) {
    background: ${colors.darkmode};
  }
`;

export const SocialLink = css`
  display: inline-block;
  margin: 0;
  padding: 10px;
  opacity: 0.8;

  :hover {
    opacity: 1;
  }

  svg {
    height: 1.8rem;
    fill: #fff;
  }
`;

export const SocialLinkFb = css`
  svg {
    height: 1.6rem;
  }
`

export const SiteHeader = css`
  color: #fff;
`;

export const SiteHeaderContent = styled.div`
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6vw 3vw;
  min-height: 200px;
  max-height: 340px;
`;

export const SiteHeaderStyles = css`
  position: relative;
  margin-top: 64px;
  padding-bottom: 12px;
  color: #fff;
  background: color(var(--darkgrey) l(-5%)) no-repeat center center;
  background-size: cover;

  :before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    display: block;
    background: rgba(0,0,0,0.18);
  }
  :after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: auto;
    left: 0;
    z-index: 10;
    display: block;
    height: 140px;
    background: linear-gradient(rgba(0,0,0,0.15),rgba(0,0,0,0));
  }
`;

export const AuthorProfileImage = css`
  flex: 0 0 60px;
  margin: 0;
  width: 60px;
  height: 60px;
  border: none;

  @media (prefers-color-scheme: dark) {
    box-shadow: 0 0 0 6px hsla(0,0%,100%,0.04);
    background: ${colors.darkmode};
  }
`;
