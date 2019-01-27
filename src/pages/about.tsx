import IndexLayout from '../layouts';
import Wrapper from '../components/Wrapper';
import SiteNav from '../components/header/SiteNav';
import { SiteHeader, outer, inner, SiteMain } from '../styles/shared';
import * as React from 'react';
import { css } from '@emotion/core';

import { PostFullHeader, PostFullTitle, NoImage, PostFull } from '../templates/post';
import { PostFullContent } from '../components/PostContent';
import Footer from '../components/Footer';
import Helmet from 'react-helmet';

const PageTemplate = css`
  .site-main {
    background: #fff;
    padding-bottom: 4vw;
  }
`;


const About: React.FunctionComponent = () => (
  <IndexLayout>
    <Helmet>
      <title>About</title>
    </Helmet>
    <Wrapper css={PageTemplate}>
      <header css={[outer, SiteHeader]}>
        <div css={inner}>
          <SiteNav />
        </div>
      </header>
      <main id="site-main" className="site-main" css={[SiteMain, outer]}>
        <article className="post page" css={[PostFull, NoImage]}>
          <PostFullHeader>
            <PostFullTitle>About</PostFullTitle>
          </PostFullHeader>

          <PostFullContent className="post-full-content">
            <div className="post-content">
              <p>
                Ghost is professional publishing platform designed for modern journalism. This is a
                demo site of a basic Ghost install to give you a general sense of what a new Ghost
                site looks like when set up for the first time.
              </p>
              <blockquote>
                <p>
                  If you'd like to set up a site like this for yourself, head over to{' '}
                  <a href="https://ghost.org">Ghost.org</a> and start a free 14 day trial to give
                  Ghost a try!
                </p>
              </blockquote>
              <p>
                If you're a developer: Ghost is a completely open source (MIT) Node.js application
                built on a JSON API with an Ember.js admin client. It works with MySQL and SQLite,
                and is publicly available <a href="https://github.com/TryGhost/ghost">on Github</a>.
              </p>
              <p>
                If you need help with using Ghost, you'll find a ton of useful articles on{' '}
                <a href="https://help.ghost.org">our knowledgebase</a>, as well as extensive{' '}
                <a href="https://docs.ghost.org">developer documentation</a>.
              </p>
            </div>
          </PostFullContent>
        </article>
      </main>
      <Footer />
    </Wrapper>
  </IndexLayout>
);

export default About;
