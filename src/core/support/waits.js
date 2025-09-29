async function domReady(timeout = 10000) {
  await browser.waitUntil(
    async () => (await browser.execute(() => document.readyState)) === 'complete',
    { timeout, timeoutMsg: 'DOM did not become ready' }
  );
}

async function urlIncludes(part, timeout = 10000) {
  await browser.waitUntil(async () => (await browser.getUrl()).includes(part), {
    timeout,
    timeoutMsg: `URL does not include "${part}"`,
  });
}

module.exports = { domReady, urlIncludes };
