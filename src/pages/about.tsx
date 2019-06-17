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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc commodo finibus leo,
                non tempus magna vehicula ac. Maecenas mollis ante finibus pharetra imperdiet.
                Maecenas in aliquam purus. Nam et massa a nulla fermentum dapibus sit amet in neque.
                Ut ipsum ipsum, rhoncus a sodales pellentesque, interdum a elit. Nullam aliquam
                tellus nibh, eget laoreet dui aliquet non. Vestibulum malesuada ante at diam tempus,
                ac interdum risus scelerisque. Sed ipsum neque, vulputate porta diam eget, consequat
                blandit nulla. Integer volutpat velit vitae purus lacinia aliquam. Integer bibendum
                ipsum vitae magna pulvinar, nec vehicula dolor vulputate. Nulla eu massa id orci
                placerat finibus vel sit amet eros. Vestibulum quis consequat massa. Sed sagittis
                sollicitudin massa at commodo. Praesent diam nisi, imperdiet posuere eleifend nec,
                blandit ac massa.
              </p>
              <p>
                Vestibulum semper pretium ipsum nec congue. Ut ac eros nisi. Donec leo sem, aliquam
                mollis sapien ultrices, dapibus congue diam. Proin viverra dapibus blandit. Ut
                mauris tellus, tristique id felis vel, venenatis vestibulum nunc. Nam molestie
                pulvinar nibh, eget egestas augue. Maecenas tellus arcu, mattis ut ipsum non,
                sollicitudin convallis nunc. Donec nec neque tristique, aliquet lacus id, laoreet
                nunc. Cras dapibus nisi nulla, ullamcorper faucibus neque suscipit ac. Donec eget
                orci venenatis justo lobortis volutpat. Proin vel placerat nisl. Integer arcu nunc,
                sodales eu fringilla non, aliquam non diam. Cras placerat, massa et faucibus
                pretium, ante elit tincidunt tellus, tristique ultricies velit quam et massa.
              </p>
              <p>
                In nunc lacus, dapibus vitae lacus sit amet, efficitur iaculis neque. Suspendisse ut
                tellus quis leo vestibulum tincidunt. Aenean nec enim ac dolor lacinia semper. Ut
                sed laoreet libero. Nunc elementum sollicitudin accumsan. Nunc eu augue neque. Proin
                a tortor nibh. Cras eu nisl ornare sapien feugiat pellentesque. Mauris dignissim vel
                quam eu pellentesque. Integer sit amet posuere quam, eu ullamcorper odio. Nullam a
                lacus tempus sapien dignissim ullamcorper. In hac habitasse platea dictumst. Proin
                quis massa aliquam, feugiat tortor sit amet, tincidunt urna. Donec posuere pulvinar
                lectus, ac semper ipsum vulputate quis.
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
