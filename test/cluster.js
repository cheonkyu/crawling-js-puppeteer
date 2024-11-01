const { addExtra } = require("puppeteer-extra");
const vanillaPuppeteer = require("puppeteer");
const BlockResourcesPlugin = require('puppeteer-extra-plugin-block-resources');

const { Cluster } = require("puppeteer-cluster");

(async () => {
    const puppeteer = addExtra(vanillaPuppeteer);
    // 이미지, CSS, FONT 로드 방지 플러그인
    puppeteer.use(
        BlockResourcesPlugin({
          blockedTypes: new Set(['image', 'stylesheet', 'font']),
        }),
    );

    // cluster 처리
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 2,
        retryLimit: 1,
        puppeteer
    });

    cluster.on('taskerror', (err, data) => {
        console.log(`Error crawling ${data}: ${err.message}`);
    });

    
    cluster.queue('https://www.wikipedia.org');
    // cluster.queue('https://github.com/');

    await cluster.task(async ({ page, data: url }) => {
        page.on('error', error => {
            console.log(`Chrome Handler: GENERAL ERROR on: ${targetURL} : ${error}`);
            console.log(`GLOBAL CHROMEPOOL count after releasing instance on ERROR: ${global.chromepool.borrowed} for: ${targetURL}`);
        });
        await page.goto(url);
        const path = url.replace(/[^a-zA-Z]/g, '_') + '.png';
        await page.screenshot({ path });
        console.log(`Screenshot of ${url} saved: ${path}`);
        return '1'
    });

    await cluster.idle();
    await cluster.close();
})();