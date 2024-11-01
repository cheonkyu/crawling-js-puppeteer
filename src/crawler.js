const { DEFAULT_INTERCEPT_RESOLUTION_PRIORITY } = require('puppeteer')
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const BlockResourcesPlugin = require('puppeteer-extra-plugin-block-resources');
const AnonymizeUAPlugin = require('puppeteer-extra-plugin-anonymize-ua');

puppeteer.use(
    BlockResourcesPlugin({
      blockedTypes: new Set([
        // 'document',
        'stylesheet',
        'image',
        'media',
        'font',
        'script',
        'texttrack',
        'xhr',
        'fetch',
        'eventsource',
        'websocket',
        'manifest',
        'other'
      ]),
      interceptResolutionPriority: DEFAULT_INTERCEPT_RESOLUTION_PRIORITY
    }),
);
puppeteer.use(StealthPlugin());
puppeteer.use(AnonymizeUAPlugin());

module.exports = puppeteer