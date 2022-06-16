console.log("running extension cookie blocker");

const TEN_SECONDS = 10 * 1000;
const ONE_AND_A_HALF_SECONDS = 1.5 * 1000;

window.addEventListener("load", exec);

async function exec() {
  try {
    await sleep(ONE_AND_A_HALF_SECONDS);

    while (true) {
      await cleanCookie();
      await sleep(TEN_SECONDS);
    }
  } catch (error) {
    console.log(`ERROR - CookieBlocker Extension - ${error}`);
  }
}

function sleep(time) {
  return new Promise((res) => setTimeout(() => res(), time));
}

const attrs = ["id", "class"];
const values = ["cookie", "banner", "popup", "pub", "adopt", "ads"];

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
  const excludedTags = ["BODY", "HEAD", "HTML"];
  return cookieTags.filter((tag) => tag.style.display !== "none" && !excludedTags.includes(tag.tagName));
}
