import { eventHandler, createError } from 'h3';
import { withLeadingSlash, withoutTrailingSlash, parseURL } from 'ufo';
import { promises } from 'fs';
import { resolve, dirname } from 'pathe';
import { fileURLToPath } from 'url';

const assets = {
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"47e-6nX93Ac0G6WU9YsvzGUQaxZQNLU\"",
    "mtime": "2022-05-15T14:06:34.588Z",
    "path": "../public/favicon.ico"
  },
  "/style.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"237-N6fYSZSw106VBj4K3eWWDDybNOg\"",
    "mtime": "2022-05-05T14:32:29.983Z",
    "path": "../public/style.css"
  },
  "/_nuxt/entry-2368c00b.mjs": {
    "type": "application/javascript",
    "etag": "\"40387-Br2caJIXtJegj8VagWJ5qEjtPCo\"",
    "mtime": "2022-05-18T07:53:26.028Z",
    "path": "../public/_nuxt/entry-2368c00b.mjs"
  },
  "/_nuxt/entry.75bb641d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"32b3-KHn5+1twOflfMiJUFLQa7Ue+dEU\"",
    "mtime": "2022-05-18T07:53:26.028Z",
    "path": "../public/_nuxt/entry.75bb641d.css"
  },
  "/_nuxt/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"47e-6nX93Ac0G6WU9YsvzGUQaxZQNLU\"",
    "mtime": "2022-05-15T14:06:34.588Z",
    "path": "../public/_nuxt/favicon.ico"
  },
  "/_nuxt/index-c451451d.mjs": {
    "type": "application/javascript",
    "etag": "\"2fb6-M2fWsWM2YsFzQkH8T8lyGd1Y6I8\"",
    "mtime": "2022-05-18T07:53:26.028Z",
    "path": "../public/_nuxt/index-c451451d.mjs"
  },
  "/_nuxt/info-ca4fef41.mjs": {
    "type": "application/javascript",
    "etag": "\"28c-kgD9GlYaXja7QcsK7OJarnehxac\"",
    "mtime": "2022-05-18T07:53:26.028Z",
    "path": "../public/_nuxt/info-ca4fef41.mjs"
  },
  "/_nuxt/manifest.json": {
    "type": "application/json",
    "etag": "\"6f4-rOc6D19F3RsJNAdqIp1fGjJBTp8\"",
    "mtime": "2022-05-18T07:53:26.030Z",
    "path": "../public/_nuxt/manifest.json"
  },
  "/_nuxt/miHeader-50b30244.mjs": {
    "type": "application/javascript",
    "etag": "\"31c-74doKltC/xxkQkzJI27Jpe5nLXM\"",
    "mtime": "2022-05-18T07:53:26.028Z",
    "path": "../public/_nuxt/miHeader-50b30244.mjs"
  },
  "/_nuxt/miHeader.9933d680.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"612-oL70EqGiGrhT8x7WU4XeD/OIjb4\"",
    "mtime": "2022-05-18T07:53:26.028Z",
    "path": "../public/_nuxt/miHeader.9933d680.css"
  },
  "/_nuxt/miLayout-d748b5e1.mjs": {
    "type": "application/javascript",
    "etag": "\"20d5-G53fYtCt9YupokXRFCxfk0xlotM\"",
    "mtime": "2022-05-18T07:53:26.028Z",
    "path": "../public/_nuxt/miLayout-d748b5e1.mjs"
  },
  "/_nuxt/miLayout.b2b4c399.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1257-EcPuHO7+CiSVg/p77gGAp/m471M\"",
    "mtime": "2022-05-18T07:53:26.028Z",
    "path": "../public/_nuxt/miLayout.b2b4c399.css"
  },
  "/_nuxt/NavBar-6e3cdb77.mjs": {
    "type": "application/javascript",
    "etag": "\"8b2-HZwMV65MMTaB2bcjuMXTk3mdggE\"",
    "mtime": "2022-05-18T07:53:26.028Z",
    "path": "../public/_nuxt/NavBar-6e3cdb77.mjs"
  },
  "/_nuxt/Product-35917c7d.mjs": {
    "type": "application/javascript",
    "etag": "\"5d2b-7Z9hZFaE0l9/rHzXLB2I102h1GY\"",
    "mtime": "2022-05-18T07:53:26.028Z",
    "path": "../public/_nuxt/Product-35917c7d.mjs"
  },
  "/_nuxt/Product.d2dc38fc.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"289e-+fHg5B6oNDNU1TiybUUa4yF9D0s\"",
    "mtime": "2022-05-18T07:53:26.030Z",
    "path": "../public/_nuxt/Product.d2dc38fc.css"
  },
  "/_nuxt/style.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"237-N6fYSZSw106VBj4K3eWWDDybNOg\"",
    "mtime": "2022-05-05T14:32:29.983Z",
    "path": "../public/_nuxt/style.css"
  }
};

const mainDir = dirname(fileURLToPath(globalThis.entryURL));
function readAsset (id) {
  return promises.readFile(resolve(mainDir, assets[id].path)).catch(() => {})
}

const publicAssetBases = ["/_nuxt"];

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return
  }
  for (const base of publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const _static = eventHandler(async (event) => {
  if (event.req.method && !METHODS.includes(event.req.method)) {
    return;
  }
  let id = decodeURIComponent(withLeadingSlash(withoutTrailingSlash(parseURL(event.req.url).pathname)));
  let asset;
  for (const _id of [id, id + "/index.html"]) {
    const _asset = getAsset(_id);
    if (_asset) {
      asset = _asset;
      id = _id;
      break;
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.res.statusCode = 304;
    event.res.end("Not Modified (etag)");
    return;
  }
  const ifModifiedSinceH = event.req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      event.res.statusCode = 304;
      event.res.end("Not Modified (mtime)");
      return;
    }
  }
  if (asset.type) {
    event.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag) {
    event.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime) {
    event.res.setHeader("Last-Modified", asset.mtime);
  }
  const contents = await readAsset(id);
  event.res.end(contents);
});

export { _static as default };
//# sourceMappingURL=static.mjs.map
