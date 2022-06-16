import * as config from "./config.json";

console.log("running extension cookie blocker");
const { attrs, values, excludedTags, initialSleep, repeatSleep } = config;

window.addEventListener("load", exec);

async function exec() {
  try {
    await sleep(initialSleep);

    while (true) {
      await cleanCookie();
      await sleep(repeatSleep);
    }
  } catch (error) {
    console.log(`ERROR - CookieBlocker Extension - ${error}`);
  }
}

function sleep(time) {
  return new Promise((res) => setTimeout(() => res(), time));
}

const cleanCookie = async () => {
  console.log("searching cookies");

  const cookieTags = values
    .map((value) => {
      return attrs
        .map((attr) => document.querySelectorAll(`[${attr}*="${value}"]`))
        .reduce((tags, tag) => [...tags, ...tag], [])
        .flat();
    })
    .reduce((tags, tag) => [...tags, tag], [])
    .flat()
    .filter(Boolean);

  if (!cookieTags.length) {
    return;
  }

  const validTags = filterValidTags(cookieTags);

  validTags.forEach((tag) => {
    tag.style.display = "none";
  });
};

function filterValidTags(cookieTags) {
  return cookieTags.filter((tag) => tag.style.display !== "none" && !excludedTags.includes(tag.tagName));
}
