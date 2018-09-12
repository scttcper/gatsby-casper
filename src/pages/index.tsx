import * as React from 'react';
import { Link } from 'gatsby';

import Page from '../components/Page';
import Container from '../components/Container';
import IndexLayout from '../layouts';
import Header from '../components/header/Header';

const IndexPage = () => (
  <IndexLayout />
);

export default IndexPage;

const arr = [2, 4, 6, 8];
for (let i = 0; i < 4; i++) {
  setTimeout(() => console.log(`the value of ${i} is ${arr[i]}`))
}