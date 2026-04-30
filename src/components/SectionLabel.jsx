// Figma: h5:before → arrow01.svg (12×12 icon) + label text
// Used in all section headings: Solutions, Products, Project, News, Clients

export default function SectionLabel({ text, light = false }) {
  return (
    <p
      className={`flex items-center gap-[10px] font-space font-bold text-[14px] tracking-[1.2px] uppercase ${
        light ? "text-white" : "text-black"
      }`}
    >
      {/* Figma arrow01.svg — 12×12px, currentColor */}
      <img
        src="/assets/arrow01.svg"
        alt=""
        aria-hidden="true"
        width={12}
        height={12}
        style={{ filter: light ? "invert(1)" : "none" }}
      />
      {text}
    </p>
  );
}
