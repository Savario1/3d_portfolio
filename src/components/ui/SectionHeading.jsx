export default function SectionHeading({ eyebrow, heading, intro, level = 2, id }) {
  const HeadingTag = `h${level}`;
  return (
    <header>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <HeadingTag className="section-heading" id={id}>
        {heading}
      </HeadingTag>
      {intro && <p className="section-intro">{intro}</p>}
    </header>
  );
}
