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

const About: React.FC = () => (
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
                I am a professional Software Developer for the past 15 years or so. Since a very young age
                I tinkered with computers and always remember myself enjoying building things. I always take
                on new challenges and try to find solutions to everyday problems in the most creative and efficient
                way possible.
              </p>
              <p>
                During the day I make a lot of architecture and design decisions over [@Covve](https://covve.com) but I also get my hands *dirty* writing
                lots and lots of code. I feel at home when working inside a fully automated workflow, with lots of tests supporting
                my refactoring frenzies and code reviews that make both me and my collegues better developers and better people.
              </p>
              <p>
                I have done a lot of freelancing in the past, which gave me the opportunity to work with different
                technologies, but also people. I have done about 7+ years of C# development, mostly for Geographic Information
                Systems, 3D and Data Intensive applications. Half the last decade I am more into javascript (or more accurately typescript)
                development mostly for front end and mobile, but also some interesting nodejs backend microservices.
              </p>
              <p>
                I love to cook, I love carpentry, I love teaching myself new things and I love spending time with my two little boys, teaching them as many things
                about our universe as they can possibly handle. I sometimes tweet some interesting stuff over on Twitter [@masimplo](https://twitter.com/masimplo), write a short blog article at masimplo.dev and
                enjoy taking pictures of things I cook on Instagram [@masimplo](https://www.instagram.com/masimplo/). I do not have a Facebook account and I am
                not interested in getting one, so don't look me up there.
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
