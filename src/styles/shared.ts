import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { colors } from './colors';
import { darken, lighten } from 'polished';

export const outer = css`
  position: relative;
  padding: 0 4vw;
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
`;

export const SiteTitle = styled.h1`
  z-index: 10;
  margin: 0;
  padding: 0;
  font-size: 3.8rem;
  font-weight: 700;
`;

export const SiteDescription = styled.h2`
  z-index: 10;
  margin: 0;
  padding: 5px 0;
  font-size: 2.2rem;
  font-weight: 300;
  letter-spacing: 0.5px;
  opacity: 0.8;
`;

export const PostFeed = css`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin: 0 -20px;
  padding: 40px 0 0 0;
`;

export const PostFeedRaise = css`
  @media (min-width: 900px) {
    margin-top: -70px;
    padding-top: 0;
  }
`;

export const SocialLink = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 10px;
  color: #fff;
  opacity: 0.8;

  :hover {
    opacity: 1;
  }

  svg {
    height: 1.8rem;
    fill: #fff;
  }
`;

export const SiteHeader = css`
  position: relative;
  padding-top: 12px;
  padding-bottom: 12px;
  color: #fff;
  /* background: color(var(--darkgrey) l(-5%)) no-repeat center center; */
  background: ${darken('0.05', colors.darkgrey)} no-repeat center center;
  background-size: cover;
`;

export const SiteHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10vw 4vw;
  min-height: 200px;
  max-height: 450px;
  text-align: center;
`;

export const SiteHeaderStyles = css`
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: auto;
  left: 0;
  z-index: 10;
  display: block;
  height: 80px;
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0));

  :before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    display: block;
    background: rgba(0, 0, 0, 0.18);
  }

  :after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: auto;
    left: 0;
    z-index: 10;
    display: block;
    height: 80px;
    background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0));
  }
  @media (max-width: 700px) {
    padding-right: 0;
    padding-left: 0;
  }
`;

export const AuthorProfileImage = css`
  display: block;
  /* background: color(var(--lightgrey) l(+10%)); */
  background: ${lighten('0.1', colors.lightgrey)};
  border-radius: 100%;
  object-fit: cover;
  margin-right: 15px;
  width: 60px;
  height: 60px;
`;
