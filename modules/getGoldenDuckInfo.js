const getAction = require("../actions/get");
const sleep = require("./sleep");
const config = require("../config.json");
const logger = require("../logger");

async function getGoldenDuckInfo(token, ua) {
  let retry = 0;
  let data = null;
  while (retry < config.retryCount) {
    if (!!data) {
      break;
    }
    data = await getGoldenDuckInfoInternal(token, ua);
    retry++;
  }

  return data;
}

async function getGoldenDuckInfoInternal(token, ua) {
  try {
    const response = await getAction(token, "golden-duck/info", ua);
    // console.log(data);
    return response.data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;

      if (status >= 500) {
        console.log("Lost connect, auto connect after 5s, retry to die");
        logger.error(`getGoldenDuckInfoInternal error ${status}`, "error");
        await sleep(5);
        return null;
      } else if (status === 401) {
        console.log(`\nToken loi hoac het han roi\n`);
        logger.error(
          `getGoldenDuckInfoInternal error Token loi hoac het han roi`,
          "error"
        );
        process.exit(1);
      } else if (status === 400) {
        logger.error(
          `getGoldenDuckInfoInternal error ${error.response.data.error_code}`,
          "error"
        );
        return error.response.data;
      } else {
        console.log("Lost connect, auto connect after 3s, retry to die");
        logger.error(
          `getGoldenDuckInfoInternal error ${status} undefined`,
          "error"
        );
        await sleep(3);
        return null;
      }
    } else if (error.request) {
      console.log("request", error.request);
      console.log("Lost connect, auto connect after 3s, retry to die");
      logger.error(
        `getGoldenDuckInfoInternal error request ${error.request}`,
        "error"
      );
      await sleep(3);
      return null;
    } else {
      console.log("error", error.message);
      console.log("Lost connect, auto connect after 3s, retry to die");
      logger.error(`getGoldenDuckInfoInternal error ${error.message}`, "error");
      await sleep(3);
      return null;
    }
  }
}

module.exports = getGoldenDuckInfo;
