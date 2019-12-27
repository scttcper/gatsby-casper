import { lighten } from 'polished';
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { colors } from '../../styles/colors';
import SubscribeForm from './SubscribeForm';

const SubscribeFormSection = styled.section`
  margin: 1.5em 0;
  padding: 6.5vw 7vw 7vw;
  /* border: color(var(--whitegrey) l(+2%)) 1px solid; */
  border: ${lighten('0.02', colors.whitegrey)} 1px solid;
  text-align: center;
  /* background: color(var(--whitegrey) l(+4%)); */
  background: ${lighten('0.04', colors.whitegrey)};
  border-radius: 7px;

  p {
    margin-bottom: 1em;
    color: ${colors.midgrey};
    font-size: 2.2rem;
    line-height: 1.55em;
    letter-spacing: 0.2px;
  }

  form {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    max-width: 420px;
  }

  .form-group {
    flex-grow: 1;
  }
  @media (max-width: 650px) {
    p {
      font-size: 1.6rem;
    }
  }
`;

const SubscribeFormTitle = css`
  margin: 0 0 3px 0;
  padding: 0;
  color: ${colors.darkgrey};
  font-size: 3.5rem;
  line-height: 1;
  font-weight: 700;
  @media (max-width: 650px) {
    font-size: 2.4rem;
  }
`;

export interface SubscribeProps {
  title: string;
}

const Subscribe: React.FC<SubscribeProps> = props => {
  return (
    <SubscribeFormSection>
      <h3 css={SubscribeFormTitle}>Subscribe to {props.title}</h3>
      <p>Get the latest posts delivered right to your inbox</p>
      <SubscribeForm />
    </SubscribeFormSection>
  );
};

export default Subscribe;
