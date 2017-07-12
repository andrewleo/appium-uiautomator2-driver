/**
 * This script needs to be run before other e2e mocha scripts
 *
 * This script starts the server or if it's TestObject, runs the tests on TO serrver
 */

import { enableTestObject, disableTestObject } from 'appium-test-support';
import wd from 'wd';
import { startServer, DEFAULT_PORT } from '../../..';
import logger from '../../../lib/logger';

(async function () {
  if (process.env.TESTOBJECT_E2E_TESTS) {
    logger.debug('Running tests on TestObject');

    let wdObject;
    before(async function () {
      wdObject = await enableTestObject(wd);
    });
    after(async function () {
      await disableTestObject(wdObject);
    });

  }  else {
    await startServer(DEFAULT_PORT, 'localhost');
  }
})();