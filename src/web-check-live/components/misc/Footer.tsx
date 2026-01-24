import styled from '@emotion/styled';
import colors from 'web-check-live/styles/colors';

const StyledFooter = styled.footer`
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: 0.6rem 0;
  background: ${colors.backgroundDarker};
  display: flex;
  justify-content: space-around;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  opacity: 0.85;
  transition: all 0.2s ease-in-out;
  @media (min-width: 1024px) {
    justify-content: space-between;
  }
  &:hover {
    opacity: 1;
  }
  span {
    margin: 0 0.75rem;
    text-align: center;
    line-height: 1.4rem;
  }
`;

const ALink = styled.a`
  color: ${colors.primary};
  font-weight: bold;
  border-radius: 4px;
  padding: 0.1rem 0.2rem;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: ${colors.primary};
    color: ${colors.backgroundDarker};
    text-decoration: none;
  }
`;

const Footer = (props: { isFixed?: boolean }): JSX.Element => {
  const forkUrl = 'https://github.com/Sec-Dan/web-check';
  const upstreamUrl = 'https://github.com/Lissy93/web-check';
  const upstreamLicenseUrl = 'https://github.com/Lissy93/web-check/blob/master/LICENSE';

  return (
    <StyledFooter style={ ...(props.isFixed ? { position: 'fixed' } : {}) }>
      <span>
        <b>DanSec Web-Check</b> · <ALink href={forkUrl}>Source</ALink>
      </span>
      <span>
        Credit: <ALink href={upstreamUrl}>Web-Check</ALink> (MIT) · 
        <ALink href={upstreamLicenseUrl}>License</ALink>
      </span>
    </StyledFooter>
  );
};

export default Footer;
