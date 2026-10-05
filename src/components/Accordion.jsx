/**
 * <details>/<summary> accordion — accessible and functional without
 * JavaScript, and it keeps the FAQ answers in the DOM for search engines
 * (they mirror the FAQPage schema markup exactly).
 */
export default function Accordion({ items = [], idPrefix = 'faq' }) {
  return (
    <div className="accordion">
      {items.map((item, index) => (
        <details key={item.question} id={`${idPrefix}-${index + 1}`}>
          <summary>
            <h3 style={{ fontFamily: 'inherit', fontSize: 'inherit', margin: 0, display: 'inline' }}>
              {item.question}
            </h3>
          </summary>
          <div className="accordion-body">
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
