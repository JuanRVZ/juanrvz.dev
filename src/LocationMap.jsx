export default function LocationMap({ location, t }) {
  return (
    <figure
      className="location-card"
      aria-label={`${t("BASED IN")}: ${location}`}
    >
      <div className="location-card-heading">
        <span className="eyebrow">{t("BASED IN")}</span>
        <span className="eyebrow">37.39° N / 5.98° W</span>
      </div>
      <svg
        className="location-map"
        viewBox="310 30 150 96"
        role="img"
        aria-label={t("Map of Europe with Seville marked")}
      >
        <image href="/world-map.svg" width="720" height="310" />
        <circle
          cx="348.04"
          cy="105.22"
          r="3.8"
          fill="var(--accent)"
          fillOpacity=".08"
        />
        <circle
          cx="348.04"
          cy="105.22"
          r="2.3"
          fill="none"
          stroke="var(--accent)"
          strokeOpacity=".45"
          strokeWidth="0.15"
        />
        <circle cx="348.04" cy="105.22" r="1" fill="var(--accent)" />
        <path
          d="M349 104 352 101h8"
          fill="none"
          stroke="var(--accent)"
          strokeOpacity=".65"
          strokeWidth="0.15"
        />
        <text
          x="353"
          y="99.8"
          fill="var(--text)"
          fontSize="3"
          fontFamily="ui-monospace, monospace"
        >
          {t("SEVILLE")}
        </text>
      </svg>
      <figcaption className="location-card-caption">
        <span>
          <span className="status-dot" aria-hidden="true" />
          {location}
        </span>
      </figcaption>
    </figure>
  );
}
