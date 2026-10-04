// src/utils/auth.js
//
// One place that handles the access token for the whole app:
//   1. saveTokenFromResponse(data)  -> call it right after login / verify succeeds
//   2. getAuthToken()               -> returns the saved access token; put it in
//                                      the Authorization header of your fetch calls
//   3. clearAccessToken()           -> call it on logout

export const TOKEN_STORAGE_KEY = "accessToken";

const TOKEN_FIELDS = [
  "accessToken",
  "access_token",
  "token",
  "jwt",
  "authToken",
];

const isJwt = (v) =>
  typeof v === "string" && /^eyJ[\w-]+\.[\w-]+\.[\w-]*$/.test(v);

// Searches a response/stored object (a few levels deep) for a token field
export const findTokenDeep = (obj, depth = 0) => {
  if (!obj || typeof obj !== "object" || depth > 3) return "";
  for (const field of TOKEN_FIELDS) {
    if (typeof obj[field] === "string" && obj[field].length > 10) {
      return obj[field];
    }
  }
  for (const value of Object.values(obj)) {
    if (isJwt(value)) return value;
    const found = findTokenDeep(value, depth + 1);
    if (found) return found;
  }
  return "";
};

// Call this with the JSON your login (or verify-code) endpoint returns.
// It finds the access token whatever the field is called
// (accessToken, access_token, token...) and stores it under one key.
export const saveTokenFromResponse = (data) => {
  const token = findTokenDeep(data);
  if (token) localStorage.setItem(TOKEN_STORAGE_KEY, token);
  return token;
};

export const clearAccessToken = () => {
  for (const key of [TOKEN_STORAGE_KEY, ...TOKEN_FIELDS]) {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  }
};

const tokenFromValue = (raw) => {
  if (!raw) return "";
  if (isJwt(raw)) return raw;
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed === "string") return isJwt(parsed) ? parsed : "";
    return findTokenDeep(parsed);
  } catch (_) {
    return "";
  }
};

// Finds the saved access token: the app's user context first (if it holds
// one), then the standard storage key, then any other known key, then every
// stored value.
export const getAuthToken = (contextToken) => {
  if (typeof contextToken === "string" && contextToken.length > 10) {
    return contextToken;
  }
  for (const storage of [localStorage, sessionStorage]) {
    for (const key of [TOKEN_STORAGE_KEY, ...TOKEN_FIELDS]) {
      const raw = storage.getItem(key);
      if (raw) {
        const cleaned = raw.replace(/^"|"$/g, "");
        if (cleaned.length > 10) return cleaned;
      }
    }
    for (let i = 0; i < storage.length; i++) {
      const found = tokenFromValue(storage.getItem(storage.key(i)));
      if (found) return found;
    }
  }
  return "";
};

export const authErrorMessage = (contextToken) => {
  if (getAuthToken(contextToken)) {
    return "The server rejected your login. Please log out and log in again.";
  }
  // TEMPORARY diagnostic (remove once login works)
  const debug = localStorage.getItem("loginDebug");
  return (
    "You are not logged in on this device. Please log in again. " +
    (debug
      ? `[login info: ${debug}]`
      : "[login info: none - the updated login page has not run on this device]")
  );
};
