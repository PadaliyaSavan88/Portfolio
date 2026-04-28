import Head from 'next/head';

export default function ToolSeo({ schema, howItWorks, faqs }) {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>
      <section className="tool-about-section">
        {howItWorks && (
          <>
            <h2>How it works</h2>
            <p>{howItWorks}</p>
          </>
        )}
        {faqs && faqs.length > 0 && (
          <>
            <h2>Frequently asked questions</h2>
            {faqs.map((faq, i) => (
              <details key={i} className="tool-faq-item">
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </>
        )}
      </section>
    </>
  );
}
