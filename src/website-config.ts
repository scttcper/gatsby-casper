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
  youtube?: string;
  /**
   * full url, no username
   */
  twitter?: string;
  /**
   * full url, no username
   */
  github?: string;
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

  /**
   * Company logo - used for json+ld rich snippets
   */
  companyLogo?: string;

  /**
   * Company name - used for json+ld rich snippets
   */
  companyName?: string;
}

const config: WebsiteConfig = {
  title: 'Flotiq blog',
  description: 'Effortless, headless CMS',
  coverImage: 'img/blog-cover.jpg',
  logo: 'img/flotiq-logo-wt.png',
  lang: 'en',
  siteUrl: 'https://flotiq.com',
  github: 'https://github.com/flotiq',
  youtube: 'https://www.youtube.com/channel/UC4wpV-D9mIt1JjN_g_iyXXw',
  twitter: 'https://twitter.com/flotiq',
  showSubscribe: false,
  mailchimpAction: 'https://twitter.us19.list-manage.com/subscribe/post?u=a89b6987ac248c81b0b7f3a0f&amp;id=7d777b7d75',
  mailchimpName: 'b_a89b6987ac248c81b0b7f3a0f_7d777b7d75',
  mailchimpEmailFieldName: 'MERGE0',
  googleSiteVerification: 'GoogleCode',
  footer: 'is based on Flotiq CMS',
  companyLogo: 'https://editor.flotiq.com/fonts/fq-logo.svg',
  companyName: 'Flotiq'
};

export default config;
