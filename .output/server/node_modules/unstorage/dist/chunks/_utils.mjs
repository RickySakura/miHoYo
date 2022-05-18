function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.replace(/[/\\]/g, ":").replace(/^:|:$/g, "");
}
function normalizeBase(base) {
  base = normalizeKey(base);
  return base ? base + ":" : "";
}
function wrapToPromise(val) {
  if (!val || typeof val.then !== "function") {
    return Promise.resolve(val);
  }
  return val;
}
function asyncCall(fn, ...args) {
  try {
    return wrapToPromise(fn(...args));
  } catch (err) {
    return Promise.reject(err);
  }
}
function isPrimitive(arg) {
  const type = typeof arg;
  return arg === null || type !== "object" && type !== "function";
}
function stringify(arg) {
  return isPrimitive(arg) ? arg + "" : JSON.stringify(arg);
}

export { normalizeKey as a, asyncCall as b, normalizeBase as n, stringify as s };
