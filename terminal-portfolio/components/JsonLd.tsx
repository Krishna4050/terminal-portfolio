export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Krishna Adhikari",
    "url": "https://your-domain.vercel.app", // <--- REPLACE THIS
    "image": "https://your-domain.vercel.app/me.jpg", // <--- REPLACE THIS
    "sameAs": [
      "https://github.com/Krishna4050",
      "https://www.linkedin.com/in/your-linkedin-id", // <--- Add your LinkedIn
      "https://www.instagram.com/your-handle",
      "https://www.youtube.com/@your-channel"
    ],
    "jobTitle": "Solution Architect",
    "worksFor": {
      "@type": "Organization",
      "name": "Open to Work"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}