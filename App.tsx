import * as React from 'react'
import StorybookUI from './storybook';

import NativeTachyons from 'react-native-style-tachyons';
import { StyleSheet } from 'react-native';

NativeTachyons.build({}, StyleSheet);
import Root from './app/containers/Root'

export default process.env.StoryBook ? StorybookUI : Root
