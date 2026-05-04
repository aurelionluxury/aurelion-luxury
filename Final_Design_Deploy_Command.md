PASTE THIS ENTIRE BLOCK INTO CLAUDE CODE IN VS CODE:
=======================================================

IMPORTANT RULES BEFORE YOU START:
1. Always kill old node processes first: cmd /c "taskkill /IM node.exe /F"
2. Always start on port 3000: npm run dev --port 3000
3. Run all terminal commands yourself. Never ask me to run them.
4. After all changes, restart dev server yourself on port 3000.

=== COMPLETE HOMEPAGE REDESIGN — LUXURY PRESENCE QUALITY ===

The current homepage is cluttered with too many sections and flat design. I need you to COMPLETELY rewrite the homepage with these exact specifications. The design philosophy is: LESS IS MORE. Cut sections ruthlessly. Only 7 sections on the homepage.

=== CORE DESIGN RULES ===

COLORS (use these exact values everywhere):
- Deepest background: #0a0a0c
- Primary background: #111114
- Card surfaces: #1a1a1f
- Elevated surfaces: #222228
- Primary gold: #D4AF37
- Light gold / champagne: #E8D5A3
- Muted gold: #B8956A
- Primary text: rgba(255,255,255,0.85) — NEVER pure white
- Secondary text: rgba(255,255,255,0.55)
- Tertiary text: rgba(255,255,255,0.35)

TYPOGRAPHY:
- H1 hero: Cormorant Garamond, weight 300, clamp(2.5rem, 5vw, 5rem), line-height 1.1, letter-spacing 0.02em
- H2 section: Cormorant Garamond, weight 300, clamp(2rem, 4vw, 3.5rem), line-height 1.15
- Body: DM Sans, weight 300, 16-18px, line-height 1.7, letter-spacing 0.02em
- Eyebrow labels: DM Sans, weight 500, 12px, ALL CAPS, letter-spacing 0.15em, color #D4AF37
- NEVER use font-weight above 400 for headings. Light text = luxury. Bold text = commercial.

SPACING:
- Section padding: clamp(80px, 12vh, 200px) vertical
- Content max-width: 1400px centered
- Side margins: clamp(24px, 5vw, 80px)
- Card gaps: 24px

CARD SURFACES (glassmorphism):
Every card must use this CSS pattern:
background: linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
border: 1px solid rgba(255,255,255,0.06);
border-radius: 12px;
box-shadow: 0 4px 24px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.05) inset;
backdrop-filter: blur(20px);

On hover:
transform: translateY(-4px);
border-color: rgba(212,175,55,0.15);
box-shadow: 0 12px 40px rgba(0,0,0,0.4);
transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);

ANIMATIONS (Framer Motion):
- Scroll reveals: translateY(30px) to 0, opacity 0 to 1, duration 0.7s, ease [0.25, 0.1, 0.25, 1]
- Stagger between children: 0.12s
- Trigger when 20% visible, fire ONCE only
- Max 2 animation types visible at any time
- Hero headline: blur-in word by word, 1200ms total
- NO bouncy, springy, or playful animations. Everything calm and graceful.

BACKGROUND TEXTURE:
Add a subtle noise/grain overlay on the body:
- Create a CSS pseudo-element with a noise SVG or tiny repeating pattern
- Opacity 3%, mix-blend-mode: overlay
- This prevents dark sections from feeling flat/digital

SECTION BACKGROUNDS — alternate between these:
- Section 1 (hero): #0a0a0c with radial gold glow
- Section 2 (properties): #111114
- Section 3 (brand story): #0a0a0c with subtle dot pattern
- Section 4 (testimonials): #111114
- Section 5 (services): #0a0a0c
- Section 6 (CTA): animated gradient background
- Section 7 (footer): #0a0a0c

Add subtle radial gold glows to 2-3 sections:
background: radial-gradient(ellipse at 20% 50%, rgba(212,175,55,0.03) 0%, transparent 50%), #111114;

=== THE 7 HOMEPAGE SECTIONS (ONLY 7, NO MORE) ===

SECTION 1: HERO (100vh, full viewport)
- Background: #0a0a0c with radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.06) 0%, transparent 60%)
- Add floating gold particles: 12-15 tiny dots (2-3px), drifting upward slowly, CSS keyframe animation, scattered randomly, opacity 0.3-0.6, duration 8-15s each
- Centered layout
- Eyebrow: "COMPLIMENTARY ADVISORY FOR DISCERNING FAMILIES" in gold, 12px, tracking 0.15em
- Headline: "Your single point advisor for luxury homes, performance vehicles & wealth protection"
  - "luxury homes", "performance vehicles", "wealth protection" should have animated gold gradient text using: background: linear-gradient(135deg, #D4AF37, #E8D5A3, #D4AF37); background-clip: text; -webkit-text-fill-color: transparent;
  - Animate the headline word by word — each word fades in with slight blur, 80ms stagger
- Subtitle: "Developer & dealer funded advisory in Mumbai — at zero cost to you." (rgba(255,255,255,0.55), max-width 600px)
- Two buttons:
  - "EXPLORE PROPERTIES" — bg #D4AF37, text #0a0a0c, padding 16px 40px, tracking 0.1em, 13px, rounded-sm. Add a subtle shimmer animation (a light sweep across the button every 3s)
  - "SCHEDULE CONSULTATION" — transparent bg, border 1px solid rgba(212,175,55,0.4), text #D4AF37, same sizing. Gold border glow on hover.
- Scroll indicator at bottom: small animated chevron pointing down, opacity 0.3, bouncing subtly

SECTION 2: FEATURED PROPERTIES + VEHICLES (combined into ONE section)
- Background: #111114
- Eyebrow: "CURATED COLLECTION"
- Heading: "Featured Listings" with "Listings" in gold italic
- TWO tabs: "Properties" | "Vehicles" — gold underline on active tab
- Show 3 cards for whichever tab is active
- Property cards:
  - Full glassmorphism card surface (see CSS above)
  - Image area: 300px height, if no image show gradient from #0a1628 to #111114 with a subtle gold building icon centered and "Coming Soon" text
  - Below image: property name (Cormorant Garamond, 20px), location (12px, gold), price range (gold, 16px)
  - On hover: card lifts 4px, gold border appears, image zooms slightly (scale 1.05, overflow hidden)
- Vehicle cards: same pattern but with car icon placeholder
- "View All →" link aligned right, gold text, underline on hover

SECTION 3: BRAND STORY + TRUST STATS (combined into ONE section)
- Background: #0a0a0c with subtle dot pattern (tiny gold dots at 5% opacity in a grid)
- Split layout: LEFT side (55%) has the story, RIGHT side (45%) has the founder monogram
- Left content:
  - Eyebrow: "WHO WE ARE"
  - Heading: "Built on Relationships & Results" with "Results" in gold italic
  - 2-3 lines of text about the advisory philosophy (max 120 words)
  - Three credential badges in a row: "ENGINEERING" | "MBA" | "IRDAI CERTIFIED" — small pills with gold border
- Right side:
  - Large circular monogram "S" in gold gradient on dark background, 200px diameter, thin gold border
  - "15+ Years in Luxury Markets" below
- Below both: 4 trust counters in a horizontal row
  - "15+" Years Experience | "7,000+" HNI Network | "₹0" Cost to Client | "IRDAI" Certified
  - Gold numbers (Cormorant Garamond, 36px), gray labels (DM Sans, 11px, uppercase)
  - Numbers animate counting up when scrolled into view (use Framer Motion useInView)
  - Thin gold horizontal lines above and below this counter row

SECTION 4: TESTIMONIALS (single auto-scrolling marquee)
- Background: #111114
- Eyebrow: "CLIENT STORIES"
- Heading: "Trusted by Mumbai's Finest" with "Finest" in gold italic
- Small note: "Representative testimonials · Names withheld for privacy"
- ONE ROW of auto-scrolling testimonial cards (marquee/infinite scroll):
  - Each card: glassmorphism surface, gold quote mark icon, 2 sentences max, gold 5-star rating, anonymous attribution "— Senior Executive, South Mumbai"
  - Cards scroll horizontally, infinitely, smooth, ~30s per loop
  - Pause on hover
- That's it. No carousel controls, no dots, no arrows. Just the elegant marquee.

SECTION 5: THREE SERVICES (Bento Grid layout)
- Background: #0a0a0c
- Eyebrow: "OUR EXPERTISE"
- Heading: "Three Pillars of Excellence" with "Excellence" in gold italic
- Bento grid layout (NOT 3 equal columns):
  - Left: LARGE card (spans 2 rows) for Luxury Real Estate — larger image area, "Churchgate to Borivali" subtitle
  - Top right: MEDIUM card for Exotic Automobiles — "Buy · Sell · Maintain"
  - Bottom right: MEDIUM card for Financial Services — "IRDAI Certified Advisory"
- Each card: glassmorphism surface, gold icon (lucide-react), title in Cormorant Garamond, 2-line description, "Learn More →" link in gold
- Cards have subtle gold border that appears on hover

SECTION 6: CTA
- Background: slowly morphing animated gradient — very subtle, from #0a0a0c through #111114 with hints of rgba(212,175,55,0.03), cycle over 10 seconds
- Centered content
- Heading: "Let's Find Your Perfect Match" with "Perfect Match" in gold italic, text-4xl
- Subtitle: "A private consultation. No pressure. No fees." (rgba(255,255,255,0.55))
- Two buttons: "BOOK A PRIVATE CONSULTATION" (gold filled) | "OUR ZERO-FEE MODEL" (gold outlined)
- "AVAILABLE MON-SAT · 10AM-7PM IST · WHATSAPP & PHONE" in tiny text below

SECTION 7: FOOTER
- Background: #0a0a0c, thin gold border-top (1px solid rgba(212,175,55,0.08))
- 4 columns: Real Estate | Automobiles | Company | Connect
- Small logo "AURELION LUXURY" at top left
- IRDAI badge, social icons (gold on hover)
- "MUMBAI · COMING SOON: PUNE · DUBAI"
- Copyright 2026
- Keep it minimal and clean. Small text (13px). Generous spacing.

=== NAVBAR REFINEMENT ===
- Make navbar more transparent on hero — fully transparent background, becomes solid #0a0a0c/95 with backdrop-blur-xl on scroll
- Make the "BOOK CONSULTATION" button smaller and more refined — not the current large yellow block
- Nav links: 13px, weight 400, tracking 0.05em. Gold on hover with 0.3s transition
- Logo should be slightly smaller and more refined

=== REMOVE THESE SECTIONS ENTIRELY ===
- "Three Pillars of Excellence" as a separate section (merged into bento grid in Section 5)
- "How We Work" steps (cut it — too many sections)
- Separate "Featured Properties" and "Featured Vehicles" sections (merged into tabbed Section 2)
- "From Our Desk" blog preview (move to blog page only)
- Market ticker stays but make it more subtle — reduce text size to 11px, reduce opacity of labels

=== GLOBAL ADDITIONS ===
- Thin gold horizontal rules (1px, rgba(212,175,55,0.06)) between sections 2-3, 3-4, 4-5
- Add a scroll progress indicator: thin gold line at very top of page that grows from 0% to 100% width as user scrolls
- All Framer Motion animations: useInView with once: true, amount: 0.2

After completing ALL changes:
1. cmd /c "taskkill /IM node.exe /F"
2. Wait 3 seconds
3. Delete .next folder: cmd /c "rmdir /s /q "c:\Swapnil\Business Planning\website_data\aurelion-luxury\.next""
4. npm run dev (on port 3000)
5. Tell me "DESIGN DEPLOYED — check localhost:3000"
