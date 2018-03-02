import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import Slideshow from '../components/Slideshow';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

storiesOf('Slideshow', module)
    .add('with 3 boxes', () => (
        <Slideshow>
            <div style={{width: 100, height: 100, backgroundColor: 'blue'}}/>
            <div style={{width: 100, height: 100, backgroundColor: 'red'}}/>
            <div style={{width: 100, height: 100, backgroundColor: 'green'}}/>
        </Slideshow>)
    );
