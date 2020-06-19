import { Link } from 'gatsby';
import * as React from 'react';
import { css } from '@emotion/core';

import { colors } from '../styles/colors';

export interface PaginationProps {
  currentPage: number;
  numPages: number;
}

const navCss = css`
  text-align: center;
  div {
    display: inline-block;
  }

  a {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell;
    background-color: #fff;
    color: ${colors.flotiqGreen};
    float: left;
    font-size: 18px;
    font-weight: bold;
    padding: 8px;
    text-decoration: none;
    transition: background-color .3s;
    border: 2px solid #ddd;
    margin: 0 4px;
    border-radius: 50%;
    margin-bottom: 20px;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;

    &.active {
      background-color: ${colors.flotiqGreen};
      color: white;
    }

    &:hover:not(.active) {
      background-color: #ddd;
    }

    &:hover {
      text-decoration: none;
    }
  }
`;

const Pagination: React.FunctionComponent<PaginationProps> = ({ currentPage, numPages }) => {
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString();
  const nextPage = (currentPage + 1).toString();

  return (
    <nav css={navCss}>
      <div>
        {!isFirst && (
          <Link to={prevPage} rel="prev">
            {/* << symbol */}
            {String.fromCharCode(171)}
          </Link>
        )}

        {Array.from({ length: numPages }, (_, i) => (
          <Link key={`pagination-number${i + 1}`} className={i + 1 === currentPage ? 'active' : ''} to={`/${i === 0 ? '' : i + 1}`}>
            {i + 1}
          </Link>
        ))}

        {!isLast && (
          <Link to={nextPage} rel="next">
            {/* >> symbol */}
            {String.fromCharCode(187)}
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Pagination;
