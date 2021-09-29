import React from 'react';
import { Helmet } from 'react-helmet';

import { css } from '@emotion/react';

import { Footer } from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import { PostFullContent } from '../components/PostContent';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import {
  inner,
  outer,
  SiteArchiveHeader,
  SiteHeader,
  SiteMain,
  SiteNavMain,
} from '../styles/shared';
import { NoImage, PostFull, PostFullHeader, PostFullTitle } from '../templates/post';
import { colors } from '../styles/colors';

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

const About: React.FC = () => (
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
                <h5>
                  Green Garnet <br /> GitHub:{' '}
                  <a > Meanings, Properties and Powers</a>
                </h5>
                <p>
                  Green-Garnet is restorative and liberating. It’s a growth stone that is also a powerful conduit of birth, creation, development, and renewal.
                  It’s a powerful aid in nurturing a fledgling relationship or a new business endeavor. It will also promote a strengthened commitment to your 
                  higher purpose and spiritual growth.
                  It will bring new strength when you are experiencing a difficult time or a challenging period in your life.
                  It’s a stone that will cleanse the heart chakra, which will increase your physical vitality and zest for life. It will also induce feelings 
                  of kindness, compassion, and charity.
                  Beautiful Green Garnet beads
                  Green-Garnet is a known gemstone that has the power of regeneration and growth.
                  Its beautiful green color is a symbol of Mother Earth.
                  It’s believed that Green-Garnet has the power to accept, care for, and nurture everything!
                  It’s a stone that’s brimming with hope, and its powerful energies will definitely brighten your future!
                  Green-Garnet symbolizes growth and renewal in the different aspects of your life.
                </p>
                <p>
                  Green-Garnet also has physical healing properties that can benefit the body in more ways than one.
                  This gemstone is known to be very effective in speeding up the recovery period after an illness or physical trauma.
                  It can stimulate blood flow and help in new cell growth, especially when you pair it with the April Birthstone.
                  It can also boost the respiratory and the immune systems and protect you against highly infectious diseases.
                  The healing energies of Green-Garnet can detoxify the body and reduce inflammations
                </p>
                <p>
                  Green-Garnet is the gemstone that will confirm the happiness that you have in your love life.
                  It will show you how you can appreciate the people you love and the people who love you back.
                  It also has the ability to strengthen not only the heart but the soul as well. It will help you take in new energies and become whole again 
                  or a new and better version of yourself.
                  If you want to make a new beginning, Green-Garnet is the perfect gemstone for you!
                  Green-Garnet also symbolizes hope. It will give you clarity and help you see things or people in a different light.
                  It will solidify new relationships and add new meaning to your life and your relationship.
                  When you work with the energies of this stone, you will feel courageous and confident to make big changes and major decisions.
                  It’s a gemstone that will encourage gratitude. It will make you appreciate all the good things that you have going for you.
                  It will even make you thankful for the bad, because without them, you will never realize just how blessed you are!
                  Green-Garnet will inspire you to be of service to the people you love. You will do things for them without expecting anything in return.
                  You will do it simply because you love them and you just want to see them happy and okay.
                  This gemstone will promote a relaxed and laidback attitude in your relationship. It will encourage you to go with the flow and not to be too rigid 
                  in your ways.
                  Green-Garnet will inspire you to inject good old-fashioned romance and silly fun into a serious relationship.
                  It will remind you to never lose passion or energy for one another, especially during times when you’re filled with stress, fear, or worry.
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

export default About;
