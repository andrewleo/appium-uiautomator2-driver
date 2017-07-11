import { usingTestObject } from 'appium-test-support';
import wd from 'wd';
import logger from '../../../lib/logger';

if (process.env.TESTOBJECT_E2E_TESTS) {
  logger.debug('Running tests on TestObject');
  before(function () {
    usingTestObject.call(this, wd);
  });
}