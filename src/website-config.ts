export interface WebsiteConfig {
  title: string;
  description: string;
  coverImage: string;
  logo: string;
  facebook?: string;
  twitter?: string;
}

const config = {
  title: 'Ghost',
  description: 'The professional publishing platform',
  coverImage: 'img/blog-cover.jpg',
  logo: 'img/ghost-logo.png',
  facebook: 'https://www.facebook.com/ghost',
  twitter: 'https://twitter.com/tryghost',
};

export default config;
