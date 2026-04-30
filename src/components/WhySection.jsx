// Figma node: 159:2361 (Why Innopam section)
const imgBg = "https://www.figma.com/api/mcp/asset/1936708d-d3be-405f-a027-6f71c367681d";

export default function WhySection() {
  return (
    <section className="bg-black flex items-start px-[80px] py-[140px]">
      <div className="relative h-[600px] w-full max-w-[1280px] mx-auto">
        {/* Left image */}
        <div className="absolute left-10 top-0 right-[640px] bottom-0 overflow-hidden">
          <img
            src={imgBg}
            alt=""
            className="w-full h-[127.27%] object-cover pointer-events-none -mt-[13.64%]"
          />
        </div>

        {/* Right content */}
        <div className="absolute left-[760px] right-10 top-1/2 -translate-y-1/2 h-[300px]">
          <p className="section-label label-arrow text-white mb-6">
            WHY OPTINET
          </p>

          <div className="mb-8">
            <p className="font-space font-light text-[39px] text-white leading-[48px]">
              Put your network
            </p>
            <p className="font-space font-bold text-[39px] text-white leading-[48px]">
              in safe hands
            </p>
          </div>

          <p className="font-space font-normal text-[#828282] text-[15px] leading-[27.2px] mb-10 max-w-[421px]">
            Our loyal customers trust us to manage some of their most
            business-critical systems.
          </p>

          <a
            href="#"
            className="inline-block bg-white text-black font-space font-bold text-[12px] tracking-[1.3px] uppercase px-[58px] py-4 rounded-full hover:bg-gray-100 transition-colors"
          >
            Learn more
          </a>
        </div>
      </div>
    </section>
  );
}
