import HeroBannerImage from "../assets/blog12.jpg";

export const Hero = ({ HeroText }: { HeroText: string }) => {
  return (
    <div
      className="container h-48 flex justify-center items-center rounded-xl mx-auto bg-neutral "
      style={{
        backgroundImage: `url("${HeroBannerImage}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-base-100 text-4xl font-bold line-clamp-2 px-8">
        {HeroText}
      </h1>
    </div>
  );
};
   

export default Hero;
