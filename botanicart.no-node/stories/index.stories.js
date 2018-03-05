import React from 'react';

import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';

import { Button, Welcome } from '@storybook/react/demo';

import Slideshow from '../components/Slideshow';
import Gallery from '../components/Gallery';

addDecorator(withKnobs);

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

storiesOf('Slideshow', module)
    .add('with 3 boxes', () => (
        <Slideshow slides={[
            <div style={{width: 100, height: 100, backgroundColor: 'blue'}}/>,
            <div style={{width: 100, height: 100, backgroundColor: 'red'}}/>,
            <div style={{width: 100, height: 100, backgroundColor: 'green'}}/>
            ]}
                   displayMs={number('Display time in milliseconds', 1000)}
                   fadeInMs={number('Fade-in time in milliseconds', 500)}
                   fadeOutMs={number('Fade-out time in milliseconds', 500)}
        >
        </Slideshow>)
    );

let galleryStories = storiesOf('Gallery', module)
    .add('with 3 images', () => (
        <Gallery className={'galleri'} framesClassName={'galleri-bilde'}  frames={[
            <div style={{height: 100, backgroundColor: 'blue'}}/>,
            <div style={{height: 100, backgroundColor: 'red'}}/>,
            <div style={{height: 100, backgroundColor: 'green'}}/>,
            <div style={{height: 100, backgroundColor: 'orange'}}/>,
            <div style={{height: 100, backgroundColor: 'cyan'}}/>,
            <div style={{height: 100, backgroundColor: 'yellow'}}/>
        ]}>
            <style jsx>{`
                  .galleri {
                    display: flex;
                    flex-direction: row;
                    align-items: flex-end;
                    flex-wrap: wrap;
                    justify-content: space-around;
                  }
                  .galleri-bilde {
                    flex-shrink: 3;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                    align-item: center;
                    width: 25%;
                    margin: 1em;
                  }
            `}</style>
        </Gallery>
    ));

