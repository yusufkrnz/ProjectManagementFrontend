export const Clients = () => {
  const logos = [
    { name: 'Starbucks', src: 'https://upload.wikimedia.org/wikipedia/sco/thumb/1/1e/Starbucks_Corporation_Logo_2011.svg/512px-Starbucks_Corporation_Logo_2011.svg.png' },
    { name: 'GAP', src: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Gap_logo.svg' },
    { name: 'Unilever', src: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Unilever.svg' },
    { name: 'Koç', src: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Koc_Holding_logo.svg' },
    { name: 'M&S', src: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Marks_%26_Spencer_Logotype.svg' },
    { name: 'Costa', src: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Costa_Coffee_logo.svg' },
    { name: 'A101', src: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/A101_logo.svg' },
  ];

  const track = [...logos, ...logos];

  return (
    <section aria-label="Clients" className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="marquee">
          <div className="marquee-track gap-12 items-center">
            {track.map((logo, idx) => (
              <img
                key={`${logo.name}-${idx}`}
                src={logo.src}
                alt={logo.name}
                className="h-8 sm:h-10 opacity-70 hover:opacity-100 transition-opacity"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


