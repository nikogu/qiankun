/**
 * @author 有知 <youzhi.lk@antfin.com>
 * @since 2019-05-16
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { runDefaultMountEffects } from '../../esm/effects';
import { registerMicroApps, start } from '../../esm/index';
import Framework from './Framework';

function render({ appContent, loading }) {
  const container = document.getElementById('container');
  ReactDOM.render(<Framework loading={loading} content={appContent}/>, container);
}

function genActiveRule(routerPrefix) {
  return location => location.pathname.startsWith(routerPrefix);
}

render({ loading: true });

registerMicroApps(
  [
    { name: 'react app', entry: '//localhost:7100', render, activeRule: genActiveRule('/react') },
    { name: 'react15 app', entry: '//localhost:7102', render, activeRule: genActiveRule('/15react15') },
    { name: 'vue app', entry: '//localhost:7101', render, activeRule: genActiveRule('/vue') },
  ],
  {
    beforeLoadHooks: [app => {
      console.log('before load', app);
    }],
    beforeMountHooks: [app => {
      console.log('before mount', app);
    }],
    afterUnloadHooks: [app => {
      console.log('after unload', app);
    }],
  },
);

runDefaultMountEffects('/react');

start();
