import * as _App from './models/app';
import * as React from 'react';
import useCachedResources from './hooks/useCachedResources';
import { sleep } from './helpers/common';

export function startUp() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  React.useEffect(() => {
    const date = Date.now();
    const videoTime = 2000;
    (async () => {
      try {
        await _startUp();
        const dateNow = Date.now() - date;
        if(dateNow <= videoTime){
          await sleep(2000);
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    })();
  }, []);
  return isLoadingComplete;
}
async function _startUp(firstTime = true) {
  try {
    await __startUp();
  } catch (er) {
    await sleep(firstTime ? 1000 : 4000)
    await _startUp(false);
  }
}
async function __startUp() {
  try {
    useCachedResources();
  } catch (error) {
    
  }
}