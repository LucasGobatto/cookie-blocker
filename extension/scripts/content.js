console.log("running extension cookie blocker");

window.addEventListener("click", async () => {
  await cleanCookie();
});

const cleanCookie = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      try {
        const cookieClass = document.querySelectorAll(`[class*="cookie"]`);
        const cookieIds = document.querySelectorAll(`[id*="cookie"]`);
        const bannerClass = document.querySelectorAll(`[class*="banner"]`);
        const bannerIds = document.querySelectorAll(`[id*="banner"]`);
        const bannerRole = document.querySelectorAll(`[role*="banner"]`);
        const popupClass = document.querySelectorAll(`[class*="popup"`);
        const popupId = document.querySelectorAll(`[id*="popup"`);

        const cookieTags = [
          ...(cookieClass ?? []),
          ...(cookieIds ?? []),
          ...(bannerClass ?? []),
          ...(bannerIds ?? []),
          ...(bannerRole ?? []),
          ...(popupClass ?? []),
          ...(popupId ?? []),
        ];

        console.log(cookieTags);
        cookieTags.forEach((tag) => {
          tag.style.display = "none";
        });

        res();
      } catch (error) {
        console.log(error);
        rej(error);
      }
    }, 1000);
  });
};
