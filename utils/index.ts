export const getRandomInt = (max: number) => Math.floor(Math.random() * max);
export const delay = <T>(t: number, val: () => T): Promise<T> =>
  new Promise((resolve) => setTimeout(resolve, t, val()));
export const convertMS = (ms: number) => {
  let s = Math.floor(ms / 1000);
  let m = Math.floor(s / 60);
  s = s % 60;
  let h = Math.floor(m / 60);
  m = m % 60;
  h = h % 24;
  return h + " hours, " + m + " minutes, " + s + " seconds.";
};

export const convertToDigitalClock = (ms: number) => {
  let s = Math.floor(ms / 1000);
  let m = Math.floor(s / 60);
  s = s % 60;
  let h = Math.floor(m / 60);
  m = m % 60;
  h = h % 24;
  return (
    String(h).padStart(2, "0") +
    ":" +
    String(m).padStart(2, "0") +
    ":" +
    String(s).padStart(2, "0")
  );
};
