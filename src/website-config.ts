export interface WebsiteConfig {
  title: string;
  description: string;
  coverImage: string;
  logo: string;
  /**
   * Specifying a valid BCP 47 language helps screen readers announce text properly.
   * See: https://dequeuniversity.com/rules/axe/2.2/valid-lang
   */
  lang: string;
  /**
   * blog full path, no ending slash!
   */
  siteUrl: string;
  /**
   * full url, no username
   */
  facebook?: string;
  /**
   * full url, no username
   */
  twitter?: string;
  /**
   * hide or show all email subscribe boxes
   */
  showSubscribe: boolean;
  /**
   * create a list on mailchimp and then create an embeddable signup form. this is the form action
   */
  mailchimpAction?: string;
  /**
   * this is the hidden input field name
   */
  mailchimpName?: string;
  /**
   * name and id of the mailchimp email field
   */
  mailchimpEmailFieldName?: string;
  /**
  /**
   * Meta tag for Google Webmaster Tools
   */
  googleSiteVerification?: string;
  /**
  /**
   * Appears alongside the footer, after the credits
   */
  footer?: string;
}

const config: WebsiteConfig = {
  title: 'masimplo.com',
  description: 'Pressing keys, generating bytes',
  coverImage: 'img/blog-cover.jpg',
  logo: 'logo.png',
  lang: 'en',
  siteUrl: 'https://masimplo.com',
  // facebook: 'https://www.facebook.com/masimplo',
  twitter: 'https://twitter.com/masimplo',
  showSubscribe: true,
  mailchimpAction: 'https://gmail.us20.list-manage.com/subscribe/post?u=e751f209dff476297e609e4d2&amp;id=876a986ffe',
  mailchimpName: 'b_e751f209dff476297e609e4d2_876a986ffe',
  mailchimpEmailFieldName: 'MERGE0',
  googleSiteVerification: 'GoogleCode',
  footer: 'is based on Gatsby Casper',
};

export default config;
