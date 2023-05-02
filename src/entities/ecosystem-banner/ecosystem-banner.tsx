import bannerBgUrl from "./images/banner-bg.png";

export function EcosystemBanner() {
  return (
    <div
      className="
        relative mb-[3.75rem] min-h-[10.9rem] w-full
        rounded-[0.41rem] bg-gradient-to-r from-burntSienna
        to-sandyBrown px-[3.125rem] py-[2.5rem] text-white
      "
    >
      <div
        className="absolute left-0 top-0 z-0 h-full w-full bg-contain bg-right-top bg-no-repeat"
        style={{
          backgroundImage: `url(${bannerBgUrl})`,
        }}
      ></div>
      <div className="relative z-10 max-w-[43rem]">
        <h2 className="mb-[1rem] text-[1.875rem]">Explore Galactica Network</h2>
        <p className="text-[1.25rem] font-light leading-[120%] text-white/80">
          Discover a wide variety of apps, blockchains, wallets and explorers,
          built in the Galactica ecosystem by developers and contributors from
          across the globe.
        </p>
      </div>
    </div>
  );
}
