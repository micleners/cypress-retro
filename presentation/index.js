// Import React
import React from 'react';

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  Image,
  List,
  ListItem,
  Notes,
  Quote,
  Slide,
  Text,
  Link
} from 'spectacle';

// Import theme
import createTheme from 'spectacle/lib/themes/default';

const images = {
  cypress: require('../assets/cypress-bw.png').default,
  sai: require('../assets/sai.png').default,
  dsmjs: require('../assets/dsmjs.png').default,
  twitter: require('../assets/twitter.png').default
};

// Require CSS
require('normalize.css');

const themeColors = {
  dark: '#1C1B21',
  text: '#BBBBBB',
  lightText: '#EAEAEA',
  darkText: '#3D4554',
  green: '#26D9D2',
  red: '#EF5350',
  aqua: '#24c4b7',
  yellow: '#fded07',
  purple: '#663399'
};

const theme = createTheme(themeColors, {
  primary: {
    name: 'Oxygen Mono',
    googleFont: true,
    styles: ['400', '700i']
  },
  secondary: {
    name: 'Roboto Mono',
    googleFont: true,
    styles: ['400', '700i']
  }
});

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transition={['zoom', 'slide']}
        transitionDuration={500}
        contentWidth={1400}
        theme={theme}
        bgColor="dark"
      >
        <Slide transition={['zoom']} bgColor="dark">
          <Heading size={2} lineHeight={1.1} textColor="text">
            <span style={{ color: themeColors.yellow }}>Cypress</span> for E2E
            Testing:
          </Heading>
          <Heading size={3} lineHeight={1.1} textColor="darkText">
            A Retrospective
          </Heading>
          <br />
          <Heading size={4} caps lineHeight={1} textColor="text">
            Michael Leners
          </Heading>
          <Heading size={6} lineHeight={1} textColor="darkText">
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center'
              }}
            >
              <img
                src={images.twitter}
                style={{ marginRight: 15 }}
                width="50px"
              />{' '}
              @micLeners
            </div>
          </Heading>
          <br />
          <Heading size={4} lineHeight={1} textColor="text">
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <span> From</span>
              <img
                src={images.dsmjs}
                style={{ marginLeft: 15 }}
                width="100px"
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <span>Hosted by</span>
              <img src={images.sai} style={{ margin: 15 }} width="500px" />
            </div>
          </Heading>
          <Heading size={5} caps lineHeight={1} textColor="darkText">
            January 14, 2020
          </Heading>
        </Slide>

        <Slide transition={['zoom']} bgColor="dark">
          <Heading size={2} lineHeight={1.1} textColor="text">
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              What is{' '}
              <img
                src={images.cypress}
                style={{ marginLeft: 40 }}
                width="400"
              />{' '}
              ?
            </div>
          </Heading>
          <br />
          <Heading size={4} lineHeight={1.1} textColor="text">
            Fast, easy and reliable testing for anything that runs in a browser
            🌐
          </Heading>
          <br />
          <List textColor="text">
            <ListItem>Fast, easy and reliable E2E testing</ListItem>
            <ListItem>Batteries included</ListItem>
            <ListItem>Great docs and strong community</ListItem>
          </List>
        </Slide>

        <Slide transition={['zoom']} bgColor="dark">
          <Heading size={2} lineHeight={1.1} textColor="text">
            Who uses Cypress?
          </Heading>
          <br />
          <Heading size={4} lineHeight={1.1} textColor="text">
            Developers and QA engineers 🙋‍♀️ building web applications and testing
          </Heading>
          <br />
          <List textColor="text">
            <ListItem>End-to-end tests</ListItem>
            <ListItem>Integration tests</ListItem>
            <ListItem>Unit tests</ListItem>
            <ListItem>Acceptance tests</ListItem>
            <ListItem>Regression tests</ListItem>
          </List>
        </Slide>

        <Slide transition={['zoom']} bgColor="dark">
          <Heading size={2} lineHeight={1.1} textColor="text">
            What is Cypress an alternative to?
          </Heading>
          <br />
          <Heading size={4} lineHeight={1.1} textColor="text">
            Selenium based testing platfroms and having to use TestBed 😩
          </Heading>
          <br />
          <List textColor="text">
            <ListItem>Protractor</ListItem>
            <ListItem>Shallow mounting with TestBed</ListItem>
          </List>
        </Slide>

        <Slide transition={['zoom']} bgColor="dark">
          <Heading size={2} lineHeight={1.1} textColor="text">
            What does it cost?
          </Heading>
          <br />
          <Heading size={4} lineHeight={1.1} textColor="text">
            Free for a smorgasbord of features 🥗
          </Heading>
          <br />
          <List textColor="text">
            <ListItem>Debuggability</ListItem>
            <ListItem>Real time reloads</ListItem>
            <ListItem>Automatic waiting</ListItem>
            <ListItem>Screenshots, videos and reporting</ListItem>
          </List>
        </Slide>

        <Slide transition={['zoom']} bgColor="dark">
          <Heading size={2} lineHeight={1.1} textColor="text">
            Cypress Dashboard
          </Heading>
          <br />
          <Image src="https://www.cypress.io/static/6e5d85560c5c41cf7bcf8a1a29e46ae9/c9e75/cypress-test-runner-gui-in-browser.webp" />
          <Link href="https://www.cypress.io/features">Features</Link>
        </Slide>

        <Slide transition={['zoom']} bgColor="dark">
          <Heading size={2} lineHeight={1.1} textColor="text">
            Writing + Running Tests
          </Heading>
          <br />
          <video controls autoPlay="autoplay">
            <source
              src="https://www.cypress.io/static/writing-tests-24ff41477f89dd27e36b03a00da9c5a3.webm"
              type="video/webm"
            />
          </video>
          <br />
          <Link href="https://www.cypress.io/features">Features</Link>
        </Slide>

        <Slide transition={['zoom']} bgColor="dark">
          <Heading
            size={2}
            lineHeight={1.1}
            style={{ width: '150%',
              textAlign: 'left' }}
            textColor="text"
          >
            What does paying provide?
          </Heading>
          <br />
          <Heading size={4} lineHeight={1.1} textColor="text">
            A magical dashboard 🧙‍♂️
          </Heading>
          <br />
          <List textColor="text">
            <ListItem>Parallelization, grouping and load balancing</ListItem>
            <ListItem>Insights</ListItem>
            <ListItem>Recording and Screenshots (in dashboard)</ListItem>
            <ListItem>Run in CI (more easily)</ListItem>
            <ListItem>Screenshots, videos and reporting</ListItem>
          </List>
        </Slide>

        <Slide transition={['zoom']} bgColor="dark">
          <Heading size={2} lineHeight={1.1} textColor="text">
            Cypress Test Runner
          </Heading>
          <br />
          <video controls autoPlay="autoplay">
            <source
              src="https://www.cypress.io/static/dashboard-565afdee6fc0c84a8d84e858dc1c7061.webm"
              type="video/webm"
            />
          </video>
          <br />
          <Link href="https://www.cypress.io/features">Features</Link>
        </Slide>

        <Slide bgColor="text">
          <Image src={images.formidagon} width={800} />
        </Slide>
        <Slide transition={['fade']} bgColor="tertiary">
          <Heading size={6} textColor="dark" caps>
            Typography
          </Heading>
          <Heading size={1} textColor="text">
            Heading 1
          </Heading>
          <Heading size={2} textColor="text">
            Heading 2
          </Heading>
          <Heading size={3} textColor="text">
            Heading 3
          </Heading>
          <Heading size={4} textColor="text">
            Heading 4
          </Heading>
          <Heading size={5} textColor="text">
            Heading 5
          </Heading>
          <Text size={6} textColor="text">
            Standard text
          </Text>
        </Slide>
        <Slide transition={['fade']} bgColor="dark" textColor="tertiary">
          <Heading size={6} textColor="text" caps>
            Standard List
          </Heading>
          <List>
            <ListItem bulletStyle="star">Item 1</ListItem>
            <ListItem bulletStyle="cross">Item 2</ListItem>
            <ListItem>Item 3</ListItem>
            <ListItem>Item 4</ListItem>
          </List>
        </Slide>
        <Slide transition={['fade']} bgColor="text" textColor="dark">
          <BlockQuote>
            <Quote>Example Quote</Quote>
            <Cite margin="10px 0 0 30px">Author</Cite>
          </BlockQuote>
        </Slide>
        <Slide>
          <Image src={images.goodWork} width={500} />
          <Notes>gifs work too</Notes>
        </Slide>
      </Deck>
    );
  }
}
