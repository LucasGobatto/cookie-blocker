console.log("running extension cookie blocker");

setTimeout(() => {
  try {
    const cookieClass = document.querySelectorAll(`[class*="cookie"]`);
    const cookieIds = document.querySelectorAll(`[id*="cookie"]`);
    const bannerClass = document.querySelectorAll(`[class*="banner"]`);
    const bannerIds = document.querySelectorAll(`[id*="banner"]`);

    const cookieTags = [
      ...(cookieClass ?? []),
      ...(cookieIds ?? []),
      ...(bannerClass ?? []),
      ...(bannerIds ?? []),
    ];

    console.log(cookieTags);
    cookieTags.forEach((tag) => {
      tag.style.display = "none";
    });
  } catch (error) {
    console.log(error);
  }
}, 1000);
