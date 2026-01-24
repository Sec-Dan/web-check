import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import colors from 'web-check-live/styles/colors';
import Heading from 'web-check-live/components/Form/Heading';
import Footer from 'web-check-live/components/misc/Footer';
import Nav from 'web-check-live/components/Form/Nav';
import Button from 'web-check-live/components/Form/Button';
import { StyledCard } from 'web-check-live/components/Form/Card';

const AboutContainer = styled.div`
  width: 95vw;
  max-width: 1000px;
  margin: 2rem auto;
  padding-bottom: 1rem;
  header {
    margin: 1rem 0;
    width: auto;
  }
  section {
    width: auto;
  }
`;

const HeaderLinkContainer = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  a {
    text-decoration: none;
  }
`;

const Section = styled(StyledCard)`
  margin-bottom: 2rem;
  overflow: clip;
  max-height: 100%;
  line-height: 1.6rem;
  a {
    color: ${colors.primary};
    &:visited { opacity: 0.85; }
  }
  hr {
    border: none;
    border-top: 1px dashed ${colors.primary};
    margin: 1.5rem auto;
  }
  ul {
    padding: 0 0 0 1.2rem;
    list-style: circle;
  }
  code {
    background: ${colors.background};
    padding: 0.1rem 0.3rem;
    border-radius: 4px;
  }
  pre {
    background: ${colors.background};
    border-radius: 6px;
    padding: 0.75rem;
    overflow-x: auto;
  }
  small { opacity: 0.75; }
`;

const About = (): JSX.Element => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.slice(1));
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [location]);

  const forkUrl = 'https://github.com/Sec-Dan/web-check';
  const herokuDeployUrl = 'https://heroku.com/deploy?template=https://github.com/Sec-Dan/web-check';

  return (
    <div>
      <AboutContainer>
        <Nav>
          <HeaderLinkContainer>
            <a target="_blank" rel="noreferrer" href={forkUrl}>
              <Button>View Source</Button>
            </a>
            <a target="_blank" rel="noreferrer" href={herokuDeployUrl}>
              <Button>Deploy on Heroku</Button>
            </a>
          </HeaderLinkContainer>
        </Nav>

        <Heading as="h2" size="medium" color={colors.primary}>About</Heading>
        <Section>
          <p>
            <b>DanSec Web-Check</b> is a privacy-first fork of the Web-Check project: a single place to run quick OSINT-style
            checks against a domain, host, or URL and view the results in a clean report.
          </p>
          <p>
            This fork removes in-app analytics, tracking and sponsor/promo content, while keeping the useful checks and
            third-party integrations that make the tool practical.
          </p>
          <hr />
          <Heading as="h3" size="small" color={colors.primary}>Privacy model</Heading>
          <ul>
            <li><b>No analytics</b> scripts are loaded by this fork.</li>
            <li><b>No user activity tracking</b> is performed by the UI.</li>
            <li><b>No additional logging</b> is added beyond what your hosting platform already provides.</li>
          </ul>
          <p>
            <small>
              Note: many checks work by querying external services. When you run a check, the domain / URL you enter may be sent
              to those third parties in order to fetch results. That behaviour is expected for verification-style checks.
            </small>
          </p>
        </Section>

        <Heading as="h2" size="medium" color={colors.primary}>Self-hosting</Heading>
        <Section>
          <p>
            The easiest option is Heroku:
          </p>
          <p>
            <a target="_blank" rel="noreferrer" href={herokuDeployUrl}>Deploy this fork to Heroku</a>
          </p>
          <hr />
          <Heading as="h3" size="small" color={colors.primary}>Manual run</Heading>
          <pre>
git clone https://github.com/Sec-Dan/web-check.git
cd web-check
yarn install
yarn build
yarn serve
          </pre>
          <p>
            The app serves both the UI and API from a single process.
          </p>
        </Section>

        <Heading as="h2" size="medium" color={colors.primary}>Licence</Heading>
        <Section>
          <p>
            DanSec Web-Check is distributed under the <b>MIT licence</b>. See <code>LICENSE</code> in the repository.
          </p>
        </Section>
      </AboutContainer>
      <Footer />
    </div>
  );
}

export default About;
