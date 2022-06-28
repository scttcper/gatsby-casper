import { Helmet } from 'react-helmet';

import { css } from '@emotion/react';

import { Footer } from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import { PostFullContent } from '../components/PostContent';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import { colors } from '../styles/colors';
import {
  inner,
  outer,
  SiteArchiveHeader,
  SiteHeader,
  SiteMain,
  SiteNavMain
} from '../styles/shared';
import { NoImage, PostFull, PostFullHeader, PostFullTitle } from '../templates/post';

const PageTemplate = css`
  .site-main {
    margin-top: 64px;
    padding-bottom: 4vw;
    background: #fff;
  }

  @media (prefers-color-scheme: dark) {
    .site-main {
      /* background: var(--darkmode); */
      background: ${colors.darkmode};
    }
  }
`;

function About() {
  return (
    <IndexLayout>
      <Helmet>
        <title>About</title>
      </Helmet>
      <Wrapper css={PageTemplate}>
        <header className="site-archive-header no-image" css={[SiteHeader, SiteArchiveHeader]}>
          <div css={[outer, SiteNavMain]}>
            <div css={inner}>
              <SiteNav isHome={false} />
            </div>
          </div>
        </header>
        <main id="site-main" className="site-main" css={[SiteMain, outer]}>
          <div css={inner}>
            <article className="post page" css={[PostFull, NoImage]}>
              <PostFullHeader className="post-full-header">
                <PostFullTitle className="post-full-title">About</PostFullTitle>
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
                During the day I make a lot of architecture and design decisions over <a href="https://covve.com">@Covve</a> but I also get my hands *dirty* writing
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
                about our universe as they can possibly handle. I sometimes tweet some interesting stuff over on Twitter <a href="https://twitter.com/masimplo">@masimplo</a>, write a short blog article at masimplo.dev and
                enjoy taking pictures of things I cook on Instagram <a href="https://www.instagram.com/masimplo/">@masimplo</a>. I do not have a Facebook account and I am
                not interested in getting one, so don't look me up there.
              </p>
                </div>
              </PostFullContent>
            </article>
          </div>
        </main>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
}

export default About;
