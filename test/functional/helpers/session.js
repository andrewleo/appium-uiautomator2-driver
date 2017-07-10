import ADB from 'appium-adb';
import { startServer, DEFAULT_PORT } from '../../..';
import wd from 'wd';

async function initDriver (caps) {
  if (process.env.TRAVIS) {
    let adb = new ADB();
    try {
      // on Travis, sometimes we get the keyboard dying and the screen stuck
      await adb.forceStop('com.android.inputmethod.latin');
      await adb.shell(['pm', 'clear', 'com.android.inputmethod.latin']);
    } catch (ign) {}
  }

  // If it's not TestObject, run the server locally
  if (!process.env.TESTOBJECT_E2E_TESTS) {
    await startServer(4884, 'localhost');
  }

  // Create a WD driver
  let driver = await wd.promiseChainRemote('localhost', DEFAULT_PORT);
  await driver.init(caps);
  return driver;
}

export { initDriver };