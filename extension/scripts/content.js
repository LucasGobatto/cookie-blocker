console.log("running extension cookie blocker");

const TEN_SECONDS = 10 * 1000;
const HALF_SECOND = 500;

window.addEventListener("load", exec);

async function exec() {
  await sleep(HALF_SECOND);

  while (true) {
    await cleanCookie();
    await sleep(TEN_SECONDS);
  }
}

function sleep(time) {
  return new Promise((res) => setTimeout(() => res(), time));
}

const cleanCookie = async () => {
  try {
    console.log("searching cookies");

    const cookieClass = document.querySelectorAll(`[class*="cookie"]`);
    const cookieIds = document.querySelectorAll(`[id*="cookie"]`);
    const bannerClass = document.querySelectorAll(`[class*="banner"]`);
    const bannerIds = document.querySelectorAll(`[id*="banner"]`);
    const bannerRole = document.querySelectorAll(`[role*="banner"]`);
    const popupClass = document.querySelectorAll(`[class*="popup"]`);
    const popupId = document.querySelectorAll(`[id*="popup"]`);
    const pubClass = document.querySelectorAll(`[class*="pub"]`);
    const pubId = document.querySelectorAll(`[id*="pub"]`);

    const cookieTags = [
      ...(cookieClass ?? []),
      ...(cookieIds ?? []),
      ...(bannerClass ?? []),
      ...(bannerIds ?? []),
      ...(bannerRole ?? []),
      ...(popupClass ?? []),
      ...(popupId ?? []),
      ...(pubClass ?? []),
      ...(pubId ?? []),
    ];

    const excludedTags = ["BODY", "HEAD"];
    console.log(cookieTags.map((tag) => tag.tagName));
    const index = cookieTags.findIndex((tag) => excludedTags.includes(tag.tagName));

    cookieTags.forEach((tag, i) => {
      i !== index ? (tag.style.display = "none") : null;
    });
  } catch (error) {
    console.log(error);
  }
};
