// Snapshot scraped from gdg.community.dev/gdg-rajkot and /gdg-cloud-rajkot.
// No live scraping happens client-side — refresh this file manually when the chapters change.
export const KNOWLEDGE_BASE_UPDATED = '2026-07-20';

const CHUNKS = [
  {
    keywords: ['gdg rajkot', 'about rajkot', 'what is gdg rajkot', 'mission', 'saurashtra', 'community'],
    text: "GDG Rajkot (Google Developer Group Rajkot) is a community for developers building applications, services, and solutions using Google technologies, serving the Saurashtra region of India. It connects developers, engineers, designers, entrepreneurs, and enthusiasts to share knowledge and collaborate on projects. It has 1,026 group members and focuses on Google Cloud Platform, Android, Chrome, Google Maps, and AI development.",
  },
  {
    keywords: ['gdg cloud rajkot', 'about cloud', 'what is gdg cloud', 'cloud rajkot'],
    text: "GDG Cloud Rajkot is an energetic community of technology enthusiasts and professionals focused on artificial intelligence and cloud computing, based in Rajkot, India. Its mission is to empower startups and enthusiasts to reach unprecedented heights by providing tools, resources, and community support in AI and emerging technologies. It has 1,734 group members and focuses on AI, cloud computing, innovation, and startups.",
  },
  {
    keywords: ['organizer', 'organiser', 'who runs', 'who leads', 'leadership', 'founder', 'lead', 'team'],
    text: "GDG Rajkot is organized by Savan Padaliya (Organizer, VE3 Global), Bhumita Panara (Co-organizer, Simform), and Khush Vachhani (Marketing Lead). GDG Cloud Rajkot is organized by Dhaval Kakkad (Anglara Digital Solutions), Varun Poladiya (Firewithfounders.com, Content Lead), Harsh Mer (Exillar Infotech, Social Media Team), Nisha Kotecha (GloCal CoWorking Space, Events Team), and Pratik Butani (7Span, Flutter Developer).",
  },
  {
    keywords: ['event', 'events', 'meetup', 'workshop', 'hackathon', 'devfest', 'past event', 'upcoming'],
    text: "Recent GDG Rajkot events: Build with AI: Agentic Premier League (May 24, 2026), Build with AI: Build & Ship with Gemini CLI & Firebase Studio (March 29, 2026), JS Gujarat x GDG Rajkot Meetup (February 1, 2026), and DevFest'25: Saurashtra's Premier Tech Networking Event (November 9, 2025). Recent GDG Cloud Rajkot events: Hands-on Workshop on AI Studio (July 5, 2026), Code for Communities Hackathon Announcement (June 28, 2026), Build with AI: Agentic Premier League (May 24, 2026), and Google I/O 2026 Watch Party (May 19, 2026). Neither chapter currently lists any upcoming events.",
  },
  {
    keywords: ['member', 'members', 'how many', 'size', 'how big'],
    text: "GDG Rajkot has 1,026 group members. GDG Cloud Rajkot has 1,734 group members.",
  },
  {
    keywords: ['social', 'twitter', 'linkedin', 'instagram', 'facebook', 'whatsapp', 'follow', 'contact', 'speaker', 'volunteer', 'cfp'],
    text: "GDG Rajkot is on Twitter, LinkedIn, Facebook, Instagram, and has a WhatsApp community. GDG Cloud Rajkot is on Twitter/X (@GDGCloudRajkot), LinkedIn (gdg-cloud-rajkot), Instagram (@gdgcloudrajkot), and has a WhatsApp community. Both groups welcome speaker and volunteer collaboration through form submissions.",
  },
  {
    keywords: ['difference', 'versus', ' vs ', 'compare', 'both groups', 'two groups', 'relation between'],
    text: "GDG Rajkot and GDG Cloud Rajkot are two separate but related Google Developer Group chapters serving Rajkot, India. GDG Rajkot covers the broader range of Google technologies (Android, Chrome, Maps, GCP, AI) for the Saurashtra region, while GDG Cloud Rajkot specializes in AI and cloud computing, with a mission to empower startups. Savan Padaliya is an organizer of GDG Rajkot.",
  },
];

const ALL_TEXT = CHUNKS.map((c) => c.text).join(' ');

export function getContextForQuery(query) {
  const lowerQuery = query.toLowerCase();
  const matched = CHUNKS.filter((chunk) => chunk.keywords.some((kw) => lowerQuery.includes(kw)));
  if (matched.length === 0) return ALL_TEXT;
  return matched.map((c) => c.text).join(' ');
}
