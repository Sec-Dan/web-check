import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import colors from 'client/styles/colors';
import Heading from 'client/components/Form/Heading';
import Footer from 'client/components/misc/Footer';
import Nav from 'client/components/Form/Nav';
import Button from 'client/components/Form/Button';
import { StyledCard } from 'client/components/Form/Card';
import docs, { about, featureIntro, license, fairUse } from 'client/utils/docs';

const AboutContainer = styled.div`
width: 95vw;
max-width: 1000px;
margin: 2rem auto;
padding-bottom: 1rem;
header {
  margin 1rem 0;
  width: auto;
}
section {
  width: auto;
  .inner-heading { display: none; }
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
  section {
    clear: both;
  }
  h3 {
    font-size: 1.5rem;
  }
  hr {
    border: none;
    border-top: 1px dashed ${colors.primary};
    margin: 1.5rem auto;
  }
  ul {
    padding: 0 0 0 1rem;
    list-style: circle;
  }
  a {
    color: ${colors.primary};
    &:visited {
      opacity: 0.8;
    }
  }
  pre {
    background: ${colors.background};
    border-radius: 4px;
    padding: 0.5rem;
    width: fit-content;
  }
  small {
    opacity: 0.7;
  }
  .contents {
    ul {
      list-style: none;
      li {
        a {
          // color: ${colors.textColor};
          &:visited {
            opacity: 0.8;
          }
        }
        b {
          opacity: 0.75;
          display: inline-block;
          width: 1.5rem;
        }
      }
    }
  }
  .example-screenshot {
    float: right;
    display: inline-flex;
    flex-direction: column;
    clear: both;
    max-width: 300px;
    img {
      float: right;
      break-inside: avoid;
      max-width: 300px;
      // max-height: 30rem;
      border-radius: 6px;
      clear: both;
    }
    figcaption {
      font-size: 0.8rem;
      text-align: center;
      opacity: 0.7;
    }
  }
`;

const makeAnchor = (title: string): string =>
  title
    .toLowerCase()
    .replace(/[^\w\s]|_/g, '')
    .replace(/\s+/g, '-');

const About = (): JSX.Element => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to hash fragment if present
    if (location.hash) {
      // Add a small delay to ensure the page has fully rendered
      setTimeout(() => {
        const element = document.getElementById(location.hash.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div>
      <AboutContainer>
        <Nav>
          <HeaderLinkContainer>
            <a target="_blank" rel="noreferrer" href="https://github.com/Sec-Dan/web-check">
              <Button>View on GitHub</Button>
            </a>
          </HeaderLinkContainer>
        </Nav>

        <Heading as="h2" size="medium" color={colors.primary}>
          Intro
        </Heading>
        <Section>
          {about.map((para, index: number) => (
            <p key={index}>{para}</p>
          ))}
          <hr />
          <p>
            <b>DanSec Web-Check</b> is a privacy-focused fork of{' '}
            <a target="_blank" rel="noreferrer" href="https://github.com/Lissy93/web-check">
              Web-Check
            </a>{' '}
            by{' '}
            <a target="_blank" rel="noreferrer" href="https://aliciasykes.com">
              Alicia Sykes
            </a>
            . It removes in-app analytics, tracking and sponsor/promo content, while keeping the
            useful checks. It's licensed under the{' '}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/Lissy93/web-check/blob/master/LICENSE"
            >
              MIT license
            </a>
            , and is free to use, modify and distribute in both personal and commercial settings.
            <br />
            Source code and self-hosting docs for this fork are available on{' '}
            <a target="_blank" rel="noreferrer" href="https://github.com/Sec-Dan/web-check">
              GitHub
            </a>
            .
          </p>
        </Section>

        <Heading as="h2" size="medium" color={colors.primary}>
          Features
        </Heading>
        <Section>
          {featureIntro.map((fi: string, i: number) => (
            <p key={i}>{fi}</p>
          ))}
          <div className="contents">
            <Heading as="h3" size="small" id="#feature-contents" color={colors.primary}>
              Contents
            </Heading>
            <ul>
              {docs.map((section, index: number) => (
                <li key={index}>
                  <b>{index + 1}</b>
                  <a href={`#${makeAnchor(section.title)}`}>{section.title}</a>
                </li>
              ))}
            </ul>
            <hr />
          </div>
          {docs.map((section, sectionIndex: number) => (
            <section key={section.title}>
              {sectionIndex > 0 && <hr />}
              <Heading as="h3" size="small" id={makeAnchor(section.title)} color={colors.primary}>
                {section.title}
              </Heading>
              {section.screenshot && (
                <figure className="example-screenshot">
                  <img
                    className="screenshot"
                    src={section.screenshot}
                    alt={`Example Screenshot ${section.title}`}
                  />
                  <figcaption>
                    Fig.{sectionIndex + 1} - Example of {section.title}
                  </figcaption>
                </figure>
              )}
              {section.description && (
                <>
                  <Heading as="h4" size="small">
                    Description
                  </Heading>
                  <p>{section.description}</p>
                </>
              )}
              {section.use && (
                <>
                  <Heading as="h4" size="small">
                    Use Cases
                  </Heading>
                  <p>{section.use}</p>
                </>
              )}
              {section.resources && section.resources.length > 0 && (
                <>
                  <Heading as="h4" size="small">
                    Useful Links
                  </Heading>
                  <ul>
                    {section.resources.map(
                      (link: string | { title: string; link: string }, linkIndx: number) =>
                        typeof link === 'string' ? (
                          <li key={`link-${linkIndx}`} id={`link-${linkIndx}`}>
                            <a target="_blank" rel="noreferrer" href={link}>
                              {link}
                            </a>
                          </li>
                        ) : (
                          <li key={`link-${linkIndx}`} id={`link-${linkIndx}`}>
                            <a target="_blank" rel="noreferrer" href={link.link}>
                              {link.title}
                            </a>
                          </li>
                        ),
                    )}
                  </ul>
                </>
              )}
            </section>
          ))}
        </Section>

        <Heading as="h2" size="medium" color={colors.primary}>
          Deploy your own Instance
        </Heading>
        <Section>
          <p>DanSec Web-Check is designed to be easily self-hosted.</p>
          <Heading as="h3" size="small" color={colors.primary}>
            Option #1 - Netlify
          </Heading>
          <p>Click the button below to deploy to Netlify</p>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://app.netlify.com/start/deploy?repository=https://github.com/Sec-Dan/web-check"
          >
            <img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify" />
          </a>

          <Heading as="h3" size="small" color={colors.primary}>
            Option #2 - Vercel
          </Heading>
          <p>Click the button below to deploy to Vercel</p>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FSec-Dan%2Fweb-check&project-name=web-check&repository-name=web-check"
          >
            <img src="https://vercel.com/button" alt="Deploy with Vercel" />
          </a>

          <Heading as="h3" size="small" color={colors.primary}>
            Option #3 - Docker
          </Heading>
          <p>
            Build and run the container from source
            <br />
            Run these commands, then open <code>localhost:3000</code>
            <pre>docker build -t dansec-web-check . && docker run -p 3000:3000 dansec-web-check</pre>
          </p>

          <Heading as="h3" size="small" color={colors.primary}>
            Option #4 - Manual
          </Heading>
          <pre>
            git clone https://github.com/Sec-Dan/web-check.git
            <br />
            cd web-check # Move into the project directory
            <br />
            yarn install # Install dependencies
            <br />
            yarn build # Build the app for production
            <br />
            yarn serve # Start the app (API and GUI)
            <br />
          </pre>

          <Heading as="h3" size="small" color={colors.primary}>
            Further Docs
          </Heading>
          <p>
            More detailed installation and setup instructions can be found in the GitHub repository
            -{' '}
            <a target="_blank" rel="noreferrer" href="https://github.com/Sec-Dan/web-check#readme">
              github.com/Sec-Dan/web-check
            </a>
          </p>

          <Heading as="h3" size="small" color={colors.primary}>
            Configuring
          </Heading>
          <p>
            There are some optional environmental variables you can specify to give you access to
            some additional checks. See the README for full list of options.
          </p>

          <ul>
            <li>
              <code>GOOGLE_CLOUD_API_KEY</code>:{' '}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://cloud.google.com/api-gateway/docs/authenticate-api-keys"
              >
                A Google API key
              </a>
              <i> Used to return quality metrics for a site</i>
            </li>
            <li>
              <code>REACT_APP_SHODAN_API_KEY</code>:{' '}
              <a target="_blank" rel="noreferrer" href="https://account.shodan.io/">
                A Shodan API key
              </a>
              <i> To show associated hosts for a domain</i>
            </li>
            <li>
              <code>REACT_APP_WHO_API_KEY</code>:{' '}
              <a target="_blank" rel="noreferrer" href="https://whoapi.com/">
                A WhoAPI key
              </a>
              <i> Allows for more comprehensive WhoIs records</i>
            </li>
          </ul>
        </Section>

        <Heading as="h2" size="medium" color={colors.primary}>
          API Documentation
        </Heading>
        <Section>
          <p>// Coming soon...</p>
        </Section>

        <Heading as="h2" size="medium" color={colors.primary}>
          Terms & Info
        </Heading>
        <Section>
          <Heading as="h3" size="small" color={colors.primary}>
            License
          </Heading>
          <b>
            <a target="_blank" rel="noreferrer" href="https://github.com/Sec-Dan/web-check">
              DanSec Web-Check
            </a>{' '}
            is a fork of{' '}
            <a target="_blank" rel="noreferrer" href="https://github.com/Lissy93/web-check">
              Web-Check
            </a>
            , distributed under the MIT license, ©{' '}
            <a target="_blank" rel="noreferrer" href="https://aliciasykes.com">
              Alicia Sykes
            </a>{' '}
            {new Date().getFullYear()}
          </b>
          <br />
          <small>
            For more info, see{' '}
            <a target="_blank" rel="noreferrer" href="https://tldrlegal.com/license/mit-license">
              TLDR Legal → MIT
            </a>
          </small>
          <pre>{license}</pre>
          <hr />
          <Heading as="h3" size="small" color={colors.primary}>
            Fair Use
          </Heading>
          <ul>
            {fairUse.map((para) => (
              <li>{para}</li>
            ))}
          </ul>
          <hr />
          <Heading as="h3" size="small" color={colors.primary}>
            Privacy
          </Heading>
          <p>
            <b>No analytics</b> scripts are loaded by this fork, and <b>no user activity tracking</b>{' '}
            is performed by the UI.
            <br />
            <br />
            Neither your IP address, browser/OS/hardware info, nor any other data is collected or
            logged by this instance. (You may verify this yourself, either by inspecting the source
            code or using developer tools.)
          </p>
        </Section>
      </AboutContainer>
      <Footer />
    </div>
  );
};

export default About;
