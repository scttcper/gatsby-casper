// tslint:disable:no-http-string
import { Link } from "gatsby";
import * as React from "react";

import config from "../../../website-config";
import Facebook from "../../icons/facebook";
import Twitter from "../../icons/twitter";
import SubscribeModal from "../../subscribe/SubscribeOverlay";
import SiteNavLogo from "../SiteNavLogo";
import { SocialLink } from "../../../styles/shared";
import {
  HomeNavRaise,
  SiteNavStyles,
  SiteNavLeft,
  SiteNavRight,
  NavStyles,
  SocialLinks,
  SubscribeButton
} from "./style";

interface SiteNavProps {
  isHome?: boolean;
}

class SiteNav extends React.Component<SiteNavProps> {
  subscribe = React.createRef<SubscribeModal>();

  openModal = () => {
    if (this.subscribe.current) {
      this.subscribe.current.open();
    }
  };
  /**
   * 일단 정렬하는 CSS 부분을 만지거나 해야할 듯.
   * 메뉴 아이템으로는 Tag Category About 그리고 아이콘으로 된 Search
   * Subscribe, twitter, facebook 은 과감히 메뉴에서 지우고 about쪽에 넣어놓자..
   */
  render() {
    const { isHome = false } = this.props;
    return (
      <nav css={[isHome && HomeNavRaise, SiteNavStyles]}>
        <SiteNavLeft>
          {!isHome && <SiteNavLogo />}
          <ul css={NavStyles} role="menu">
            {/* TODO: mark current nav item - add class nav-current */}
            <li role="menuitem">
              <Link to="/">Home</Link>
            </li>
            <li role="menuitem">
              <Link to="/about">About</Link>
            </li>
            <li role="menuitem">
              <Link to="/tags/getting-started/">Getting Started</Link>
            </li>
          </ul>
        </SiteNavLeft>
        <SiteNavRight>
          <SocialLinks>
            {config.facebook && (
              <a
                css={SocialLink}
                href={config.facebook}
                target="_blank"
                title="Facebook"
                rel="noopener noreferrer"
              >
                <Facebook />
              </a>
            )}
            {config.twitter && (
              <a
                css={SocialLink}
                href={config.twitter}
                title="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter />
              </a>
            )}
          </SocialLinks>
          {config.showSubscribe && (
            <SubscribeButton onClick={this.openModal}>
              Subscribe
            </SubscribeButton>
          )}
          {config.showSubscribe && <SubscribeModal ref={this.subscribe} />}
        </SiteNavRight>
      </nav>
    );
  }
}

export default SiteNav;
