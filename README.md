# Playwright Tests Example

This is a sample React application using Tailwind CSS to (less than more) style the app.
The app reaches out to a sample endpoint for a list of users and then assigns images from third party APIs to the users.

The main purpose of the repository, though, is to showcase how such an app could potentially be tested using Playwright. To that extent we're using a third party library that has been mocked on the tests.

Eventually I'll be adding some extensions (e.g. metamask or similar) to test more functionalities with Playwright, it's quite cool :).

## How to run

For this project we're using [bun](bun.sh). It's way faster than npm and yarn, and it reminds me of bunnies so I absolutely love it.

```bash
bun install
bun --hot start
```

The above will start you a server on the port 3000. You can also compile a docker image and run it (uses nginx as a host). That would be:

```bash
docker build -t playwright-tests .
docker run --rm -p 80:80 playwright-tests
```

Running the tests:

```bash
bunx playwright test
```

You can optionally set the env variable UPDATE_HAR to true in order to update the HAR files.
