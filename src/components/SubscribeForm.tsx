import { darken, desaturate, lighten, mix } from 'polished';
import * as React from 'react';
import { css, default as styled } from 'react-emotion';

import { colors } from '../styles/colors';

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
    color: var(--midgrey);
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

const SubscribeFormStyles = css`
  @media (max-width: 500px) {
    -ms-flex-direction: column;
    flex-direction: column;
  }
`;

const SubscribeEmail = styled.input`
  display: block;
  padding: 10px;
  width: 100%;
  /* border: color(var(--lightgrey) l(+7%)) 1px solid; */
  border: ${lighten('0.07', colors.lightgrey)};
  color: var(--midgrey);
  font-size: 1.8rem;
  line-height: 1em;
  font-weight: normal;
  user-select: text;
  border-radius: 5px;
  transition: border-color 0.15s linear;

  -webkit-appearance: none;
  :focus {
    outline: 0;
    /* border-color: color(var(--lightgrey) l(-2%)); */
    border-color: ${darken('0.02', colors.lightgrey)};
  }
`;

const SubscribeFormButton = styled.button`
  display: inline-block;
  margin: 0 0 0 10px;
  padding: 0 20px;
  height: 41px;
  outline: none;
  color: #fff;
  font-size: 1.5rem;
  line-height: 37px;
  font-weight: 400;
  text-align: center;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.1);
  /* background: linear-gradient(
    color(var(--blue) whiteness(+7%)),
    color(var(--blue) lightness(-7%) saturation(-10%)) 60%,
    color(var(--blue) lightness(-7%) saturation(-10%)) 90%,
    color(var(--blue) lightness(-4%) saturation(-10%))
  ); */
  background: linear-gradient(
    ${mix('0.1', '#fff', colors.blue)},
    ${desaturate('0.1', darken('0.07', colors.blue))} 60%,
    ${desaturate('0.1', darken('0.07', colors.blue))} 90%,
    ${desaturate('0.1', darken('0.04', colors.blue))}
  );
  border-radius: 5px;
  box-shadow: 0 0 0 1px inset rgba(0, 0, 0, 0.14);

  -webkit-font-smoothing: subpixel-antialiased;

  :active,
  :focus {
    /* background: color(var(--blue) lightness(-9%) saturation(-10%)); */
    background: ${desaturate('0.1', darken('0.09', colors.blue))};
  }
  @media (max-width: 500px) {
    margin: 10px 0 0;
    width: 100%;
  }
`;

const FormGroup = styled.div`
  flex-grow: 1;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

export interface SubscribeFormProps {
  title: string;
}

const SubscribeForm: React.SFC<SubscribeFormProps> = props => {
  return (
    <SubscribeFormSection>
      <h3 className={`${SubscribeFormTitle}`}>Subscribe to {props.title}</h3>
      <p>Get the latest posts delivered right to your inbox</p>

      {/* TODO: setup form to submit somewhere */}
      <form className={`${SubscribeFormStyles}`} method="post" action="/subscribe/">
        {/* This is required for the form to work correctly  */}
        <FormGroup>
          <SubscribeEmail type="email" name="email" placeholder="youremail@example.com" />
        </FormGroup>
        <SubscribeFormButton type="submit">
          <span>Subscribe</span>
        </SubscribeFormButton>
      </form>
    </SubscribeFormSection>
  );
};

export default SubscribeForm;
