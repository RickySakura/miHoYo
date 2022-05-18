import destr from 'destr';
import { n as normalizeBase, a as normalizeKey, b as asyncCall, s as stringify } from './chunks/_utils.mjs';

function defineDriver(factory) {
  return factory;
}

const memory = defineDriver(() => {
  const data = new Map();
  return {
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) || null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return Array.from(data.keys());
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(opts = {}) {
  const ctx = {
    mounts: { "": opts.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: []
  };
  const getMount = (key) => {
    for (const base of ctx.mountpoints) {
      if (key.startsWith(base)) {
        return {
          relativeKey: key.substr(base.length),
          driver: ctx.mounts[base]
        };
      }
    }
    return {
      relativeKey: key,
      driver: ctx.mounts[""]
    };
  };
  const getMounts = (base) => {
    return ctx.mountpoints.filter((mountpoint) => mountpoint.startsWith(base) || base.startsWith(mountpoint)).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.substr(mountpoint.length) : void 0,
      mountpoint,
      driver: ctx.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!ctx.watching) {
      return;
    }
    key = normalizeKey(key);
    for (const listener of ctx.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (ctx.watching) {
      return;
    }
    ctx.watching = true;
    for (const mountpoint in ctx.mounts) {
      await watch(ctx.mounts[mountpoint], onChange, mountpoint);
    }
  };
  const storage = {
    hasItem(key) {
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey);
    },
    getItem(key) {
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey).then((val) => destr(val));
    },
    async setItem(key, value) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value));
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, removeMeta = true) {
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey);
      if (removeMeta) {
        await asyncCall(driver.removeItem, relativeKey + "$");
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    async getMeta(key, nativeMetaOnly) {
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      const meta = Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey));
      }
      if (!nativeMetaOnly) {
        const val = await asyncCall(driver.getItem, relativeKey + "$").then((val2) => destr(val2));
        if (val && typeof val === "object") {
          if (typeof val.atime === "string") {
            val.atime = new Date(val.atime);
          }
          if (typeof val.mtime === "string") {
            val.mtime = new Date(val.mtime);
          }
          Object.assign(meta, val);
        }
      }
      return meta;
    },
    setMeta(key, value) {
      return this.setItem(key + "$", value);
    },
    removeMeta(key) {
      return this.removeItem(key + "$");
    },
    async getKeys(base) {
      base = normalizeBase(base);
      const keyGroups = await Promise.all(getMounts(base).map(async (mount) => {
        const rawKeys = await asyncCall(mount.driver.getKeys, mount.relativeBase);
        return rawKeys.map((key) => mount.mountpoint + normalizeKey(key));
      }));
      const keys = keyGroups.flat();
      return base ? keys.filter((key) => key.startsWith(base) && !key.endsWith("$")) : keys.filter((key) => !key.endsWith("$"));
    },
    async clear(base) {
      base = normalizeBase(base);
      await Promise.all(getMounts(base).map(async (m) => {
        if (m.driver.clear) {
          return asyncCall(m.driver.clear);
        }
        if (m.driver.removeItem) {
          const keys = await m.driver.getKeys();
          return Promise.all(keys.map((key) => m.driver.removeItem(key)));
        }
      }));
    },
    async dispose() {
      await Promise.all(Object.values(ctx.mounts).map((driver) => dispose(driver)));
    },
    async watch(callback) {
      await startWatch();
      ctx.watchListeners.push(callback);
    },
    mount(base, driver) {
      base = normalizeBase(base);
      if (base && ctx.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        ctx.mountpoints.push(base);
        ctx.mountpoints.sort((a, b) => b.length - a.length);
      }
      ctx.mounts[base] = driver;
      if (ctx.watching) {
        Promise.resolve(watch(driver, onChange, base)).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBase(base);
      if (!base || !ctx.mounts[base]) {
        return;
      }
      if (_dispose) {
        await dispose(ctx.mounts[base]);
      }
      ctx.mountpoints = ctx.mountpoints.filter((key) => key !== base);
      delete ctx.mounts[base];
    }
  };
  return storage;
}
async function snapshot(storage, base) {
  base = normalizeBase(base);
  const keys = await storage.getKeys(base);
  const snapshot2 = {};
  await Promise.all(keys.map(async (key) => {
    snapshot2[key.substr(base.length)] = await storage.getItem(key);
  }));
  return snapshot2;
}
async function restoreSnapshot(driver, snapshot2, base = "") {
  base = normalizeBase(base);
  await Promise.all(Object.entries(snapshot2).map((e) => driver.setItem(base + e[0], e[1])));
}
function watch(driver, onChange, base) {
  if (driver.watch) {
    return driver.watch((event, key) => onChange(event, base + key));
  }
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const storageKeyProps = [
  "hasItem",
  "getItem",
  "setItem",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBase(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const prop of storageKeyProps) {
    nsStorage[prop] = (key = "", ...args) => storage[prop](base + key, ...args);
  }
  nsStorage.getKeys = (key = "", ...args) => storage.getKeys(base + key, ...args).then((keys) => keys.map((key2) => key2.substr(base.length)));
  return nsStorage;
}

export { createStorage, defineDriver, prefixStorage, restoreSnapshot, snapshot };
