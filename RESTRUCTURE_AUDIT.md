# RESTRUCTURE_AUDIT.md
## Aurelion Luxury — Next.js Baseline Audit
Generated: 2026-05-04 | Branch: laravel-restructure | Baseline commit: pre-laravel-restructure snapshot

---

## SECTION 1 — ALL PAGES (44 files)

### Public Pages

| Route | File | Type |
|-------|------|------|
| `/` | src/app/page.tsx | DYNAMIC — fetches featured properties, vehicles, testimonials, SiteSettings |
| `/about` | src/app/about/page.tsx | DYNAMIC — fetches Page model + TeamMember model |
| `/brokerage` | src/app/brokerage/page.tsx | STATIC — hardcoded content only |
| `/blog` | src/app/blog/page.tsx | DYNAMIC — fetches Post model |
| `/blog/[slug]` | src/app/blog/[slug]/page.tsx | DYNAMIC — fetches Post by slug |
| `/cars` | src/app/cars/page.tsx | DYNAMIC — fetches Vehicle model |
| `/cars/[slug]` | src/app/cars/[slug]/page.tsx | DYNAMIC — fetches Vehicle by slug |
| `/cars/concierge` | src/app/cars/concierge/page.tsx | STATIC — hardcoded content only |
| `/contact` | src/app/contact/page.tsx | DYNAMIC — fetches SiteSetting (phone, whatsapp, email, address, timing, branches) |
| `/emi-calculator` | src/app/emi-calculator/page.tsx | STATIC — client-side calculator only |
| `/faq` | src/app/faq/page.tsx | DYNAMIC — fetches FAQ model |
| `/financial-services` | src/app/financial-services/page.tsx | STATIC — hardcoded content only |
| `/mumbai-guide` | src/app/mumbai-guide/page.tsx | DYNAMIC — fetches MicroMarket model |
| `/mumbai-guide/[slug]` | src/app/mumbai-guide/[slug]/page.tsx | DYNAMIC — fetches MicroMarket by slug |
| `/nri-guide` | src/app/nri-guide/page.tsx | STATIC — hardcoded content only |
| `/privacy` | src/app/privacy/page.tsx | DYNAMIC — fetches Page model slug=privacy-policy; falls back to hardcoded |
| `/real-estate` | src/app/real-estate/page.tsx | DYNAMIC — fetches Property model |
| `/real-estate/[slug]` | src/app/real-estate/[slug]/page.tsx | DYNAMIC — fetches Property by slug |
| `/sell-car` | src/app/sell-car/page.tsx | STATIC — hardcoded content only |
| `/sell-property` | src/app/sell-property/page.tsx | STATIC — hardcoded content only |
| `/team` | src/app/team/page.tsx | DYNAMIC — fetches TeamMember model |
| `/terms` | src/app/terms/page.tsx | DYNAMIC — fetches Page model slug=terms; falls back to hardcoded |

### Admin Pages (all DYNAMIC — require JWT cookie auth)

| Route | File |
|-------|------|
| `/admin` | src/app/admin/page.tsx |
| `/admin/login` | src/app/admin/login/page.tsx |
| `/admin/faqs` | src/app/admin/faqs/page.tsx |
| `/admin/financial-services` | src/app/admin/financial-services/page.tsx |
| `/admin/gallery` | src/app/admin/gallery/page.tsx |
| `/admin/homepage` | src/app/admin/homepage/page.tsx |
| `/admin/leads` | src/app/admin/leads/page.tsx |
| `/admin/micro-markets` | src/app/admin/micro-markets/page.tsx |
| `/admin/pages` | src/app/admin/pages/page.tsx |
| `/admin/posts` | src/app/admin/posts/page.tsx |
| `/admin/posts/new` | src/app/admin/posts/new/page.tsx |
| `/admin/posts/[id]` | src/app/admin/posts/[id]/page.tsx |
| `/admin/properties` | src/app/admin/properties/page.tsx |
| `/admin/properties/new` | src/app/admin/properties/new/page.tsx |
| `/admin/properties/[id]` | src/app/admin/properties/[id]/page.tsx |
| `/admin/settings` | src/app/admin/settings/page.tsx |
| `/admin/team` | src/app/admin/team/page.tsx |
| `/admin/testimonials` | src/app/admin/testimonials/page.tsx |
| `/admin/ticker` | src/app/admin/ticker/page.tsx |
| `/admin/vehicles` | src/app/admin/vehicles/page.tsx |
| `/admin/vehicles/new` | src/app/admin/vehicles/new/page.tsx |
| `/admin/vehicles/[id]` | src/app/admin/vehicles/[id]/page.tsx |

**Total: 44 page files (22 public + 22 admin)**

---

## SECTION 2 — ALL API ROUTES WITH HTTP METHODS

### Public / Auth Endpoints

| Method | Route | Purpose |
|--------|-------|---------|
| GET | /api/properties | List properties (supports filters) |
| GET | /api/properties/[slug] | Single property by slug |
| GET | /api/vehicles | List vehicles (supports filters) |
| GET | /api/vehicles/[slug] | Single vehicle by slug |
| GET | /api/posts | List published blog posts |
| GET | /api/posts/[slug] | Single blog post by slug |
| GET | /api/faqs | List active FAQs |
| GET | /api/financial-services | List active financial services |
| GET | /api/micro-markets | List all micro markets |
| GET | /api/micro-markets/[slug] | Single micro market by slug |
| GET | /api/team | List published team members |
| POST | /api/leads | Create new lead enquiry |
| POST | /api/auth/login | Admin login — sets JWT cookie |
| POST | /api/auth/logout | Admin logout — clears JWT cookie |
| POST | /api/upload | File upload to /public/uploads/ (auth-protected) |

### Admin Endpoints (all require valid JWT cookie)

| Methods | Route | Purpose |
|---------|-------|---------|
| GET, POST | /api/admin/properties | List all / create property |
| GET, PUT, DELETE | /api/admin/properties/[id] | Get / update / delete property |
| GET, POST | /api/admin/vehicles | List all / create vehicle |
| GET, PUT, DELETE | /api/admin/vehicles/[id] | Get / update / delete vehicle |
| GET, POST | /api/admin/posts | List all / create blog post |
| GET, PUT, DELETE | /api/admin/posts/[id] | Get / update / delete post |
| GET | /api/admin/leads | List all leads |
| PUT, DELETE | /api/admin/leads/[id] | Update status / delete lead |
| GET, POST | /api/admin/testimonials | List / create testimonial |
| PUT, DELETE | /api/admin/testimonials/[id] | Update / delete testimonial |
| GET, POST | /api/admin/faqs | List / create FAQ |
| PUT, DELETE | /api/admin/faqs/[id] | Update / delete FAQ |
| GET, POST | /api/admin/ticker | List / create market ticker item |
| PUT, DELETE | /api/admin/ticker/[id] | Update / delete ticker item |
| GET, POST | /api/admin/gallery | List / upload gallery image |
| PUT, DELETE | /api/admin/gallery/[id] | Update / delete gallery item |
| GET, POST | /api/admin/financial-services | List / create financial service |
| PUT, DELETE | /api/admin/financial-services/[id] | Update / delete financial service |
| GET, POST | /api/admin/micro-markets | List / create micro market |
| PUT, DELETE | /api/admin/micro-markets/[id] | Update / delete micro market |
| GET, POST | /api/admin/pages | List / create page |
| PUT, DELETE | /api/admin/pages/[id] | Update / delete page |
| GET, POST | /api/admin/team | List / create team member |
| PATCH, DELETE | /api/admin/team/[id] | Update / delete team member |
| GET, POST | /api/admin/settings | Get / upsert site settings (key-value) |
| GET, POST | /api/admin/homepage | Get / upsert homepage-specific settings |
| POST | /api/admin/change-password | Change admin password |

**Total: 15 public/auth routes + 27 admin routes = 42 route handlers**

---

## SECTION 3 — PRISMA MODELS (14 models)

Database: SQLite via `@libsql/client` adapter | File: `./dev.db`

| Model | Fields | Notes |
|-------|--------|-------|
| Admin | 7 | id(int PK), email(unique), password, name, role(default:"admin"), createdAt, updatedAt |
| SiteSetting | 5 | id(int PK), key(unique), value, createdAt, updatedAt |
| Page | 9 | id(int PK), slug(unique), title, metaTitle?, metaDesc?, content?, isPublished(default:true), createdAt, updatedAt |
| Property | 28 | id(int PK), title, slug(unique), description?, location, area, type, status(default:"available"), price(Float), priceLabel?, bedrooms?, bathrooms?, carpetArea?, builtUpArea?, floor?, totalFloors?, facing?, amenities?, images?, featured(default:false), developerName?, reraNumber?, possession?, typology?, config?, published(default:true), createdAt, updatedAt |
| MicroMarket | 14 | id(int PK), name, slug(unique), zone, description?, content?, avgPrice?, priceRange?, appreciation?, connectivity?, landmarks?, images?, createdAt, updatedAt |
| Vehicle | 25 | id(int PK), title, slug(unique), description?, make, model, year(Int), variant?, type, condition, status(default:"available"), price(Float), priceLabel?, mileage?, fuel?, transmission?, color?, interiorColor?, engine?, power?, features?, images?, featured(default:false), createdAt, updatedAt |
| FinancialService | 12 | id(int PK), title, slug(unique), category, description?, content?, icon?, features?, partners?, isActive(default:true), createdAt, updatedAt |
| Post | 16 | id(int PK), title, slug(unique), excerpt?, content?, category, coverImage?, tags?, isPublished(default:false), publishedAt?, metaTitle?, metaDesc?, author(default:"Aurelion Luxury"), views(default:0), createdAt, updatedAt |
| Testimonial | 11 | id(int PK), name, designation?, company?, content, rating(default:5), image?, category?, isActive(default:true), createdAt, updatedAt |
| FAQ | 8 | id(int PK), question, answer, category, order(default:0), isActive(default:true), createdAt, updatedAt |
| Gallery | 7 | id(int PK), title?, url, alt?, category?, order(default:0), createdAt |
| Lead | 14 | id(int PK), name, email?, phone, service, message?, source?, propertyId?, vehicleId?, budget?, status(default:"new"), notes?, createdAt, updatedAt |
| TeamMember | 12 | id(String cuid PK), name, title, bio?, image?, email?, linkedin?, phone?, order(default:0), published(default:true), createdAt, updatedAt |
| MarketTicker | 10 | id(int PK), label, value, change?, trend?, category?, order(default:0), isActive(default:true), createdAt, updatedAt |

**Note:** TeamMember uses `cuid()` String PK — all other models use `autoincrement()` Int PK.

---

## SECTION 4 — COMPONENTS (grouped by folder)

### src/components/about/ (1 file)
- AboutContent.tsx

### src/components/admin/ (12 files)
- AdminFormField.tsx
- AdminLogoutButton.tsx
- AdminShell.tsx
- AdminTable.tsx
- ImageUploader.tsx
- PostForm.tsx
- PostsTable.tsx
- PropertiesTable.tsx
- PropertyForm.tsx
- RichTextEditor.tsx — Tiptap v3 (MIT), NOT TinyMCE
- VehicleForm.tsx
- VehiclesTable.tsx

### src/components/blog/ (2 files)
- BlogListingClient.tsx
- BlogPostClient.tsx

### src/components/brokerage/ (1 file)
- BrokerageContent.tsx — HARDCODED copy

### src/components/cars/ (4 files)
- CarDetailClient.tsx
- CarsClient.tsx
- ConciergeContent.tsx — HARDCODED copy
- SellCarContent.tsx — HARDCODED copy

### src/components/contact/ (1 file)
- ContactContent.tsx

### src/components/faq/ (1 file)
- FAQClient.tsx

### src/components/financial-services/ (2 files)
- EMICalculatorContent.tsx — HARDCODED copy (UI text, CTA)
- FinancialServicesContent.tsx — HARDCODED copy

### src/components/home/ (7 files)
- BrandStory.tsx
- CTASection.tsx
- FeaturedListings.tsx
- HeroSection.tsx
- MarketPulse.tsx — exists but REMOVED from homepage render
- ServicesBento.tsx
- Testimonials.tsx

### src/components/layout/ (5 files)
- Footer.tsx
- MarketTicker.tsx — sticky top:0, ~33px height
- Navbar.tsx — fixed top=33px (below ticker)
- PublicLayout.tsx — wraps: ScrollProgress → MarketTicker → Navbar → main → Footer → WhatsAppButton
- ScrollProgress.tsx

### src/components/mumbai-guide/ (2 files)
- MicroMarketDetailClient.tsx
- MumbaiGuideClient.tsx

### src/components/nri-guide/ (1 file)
- NRIGuideContent.tsx — HARDCODED copy (legal content, FAQs, stats)

### src/components/real-estate/ (2 files)
- PropertyDetailClient.tsx
- RealEstateClient.tsx

### src/components/sell-property/ (1 file)
- SellPropertyContent.tsx — HARDCODED copy

### src/components/team/ (1 file)
- TeamContent.tsx

### src/components/ui/ (2 files)
- PlaceholderPage.tsx
- WhatsAppButton.tsx

**Total: 45 component files across 15 folders**

---

## SECTION 5 — ALL DEPENDENCIES

### Production Dependencies (19)

| Package | Version | Purpose |
|---------|---------|---------|
| next | 16.1.6 | Framework |
| react | 19.2.3 | UI |
| react-dom | 19.2.3 | DOM rendering |
| prisma | ^7.5.0 | ORM + migrations CLI |
| @prisma/client | ^7.5.0 | Generated Prisma client |
| @prisma/adapter-libsql | ^7.5.0 | Prisma adapter for libsql |
| @libsql/client | ^0.17.0 | SQLite/libsql driver |
| framer-motion | ^12.37.0 | Animations |
| jose | ^6.2.1 | JWT sign/verify (HS256) |
| bcryptjs | ^3.0.3 | Password hashing |
| @types/bcryptjs | ^2.4.6 | TypeScript types for bcryptjs |
| @tiptap/react | ^3.22.2 | Rich text editor (React wrapper) |
| @tiptap/starter-kit | ^3.22.2 | Tiptap base extensions |
| @tiptap/extension-heading | ^3.22.2 | Heading extension |
| @tiptap/extension-image | ^3.22.2 | Image extension |
| @tiptap/extension-link | ^3.22.2 | Link extension |
| @tiptap/extension-placeholder | ^3.22.2 | Placeholder extension |
| @tiptap/extension-text-align | ^3.22.2 | Text alignment extension |
| @tiptap/extension-underline | ^3.22.2 | Underline extension |

### Dev Dependencies (10)

| Package | Version | Purpose |
|---------|---------|---------|
| typescript | ^5 | TypeScript compiler |
| @types/node | ^20 | Node.js types |
| @types/react | ^19 | React types |
| @types/react-dom | ^19 | React DOM types |
| tailwindcss | ^4 | CSS utility (installed, not used in practice — all inline styles) |
| @tailwindcss/postcss | ^4 | Tailwind PostCSS plugin |
| eslint | ^9 | Linter |
| eslint-config-next | 16.1.6 | Next.js ESLint rules |
| tsx | ^4.21.0 | TypeScript executor for seed script |
| dotenv | ^17.3.1 | .env loading for seed script |

---

## SECTION 6 — ENVIRONMENT VARIABLE KEYS

### .env file (1 key)
```
DATABASE_URL="file:./dev.db"
```

### Code-only references (not in .env)
- `JWT_SECRET` — read via `process.env.JWT_SECRET` in `src/lib/session.ts`
  - Fallback hardcoded value: `"aurelion-luxury-jwt-secret-change-in-production"`
  - **SECURITY NOTE:** This must be set as a real secret in any production deployment.

---

## SECTION 7 — HARDCODED COPY AUDIT

All 7 target files confirmed to contain hardcoded user-facing strings longer than 40 characters. These strings live in TypeScript/JSX arrays and are NOT fetched from the database.

### 1. src/components/brokerage/BrokerageContent.tsx
- Fee tier cards (title + description strings)
- FAQ question/answer pairs (full text hardcoded)
- "Our Commitments" list items

### 2. src/components/cars/ConciergeContent.tsx
- Services array — each entry has title + description strings > 40 chars
- Process steps with descriptions
- Value proposition text blocks

### 3. src/components/financial-services/FinancialServicesContent.tsx
- Services array with category descriptions and bullet-point features
- Banking partners list (names + taglines)
- IRDAI certification explanatory text

### 4. src/components/nri-guide/NRIGuideContent.tsx
- Stats/figures with labels
- legalSteps array — multi-sentence descriptions of legal process
- taxPoints array — tax obligation explanations
- helpCards array — service descriptions
- Full FAQ section with questions and answers (legal content)
- **Most extensive hardcoded content in the codebase**

### 5. src/components/cars/SellCarContent.tsx
- valueProps array — descriptions of why to sell through Aurelion
- Process steps array — step titles and descriptions

### 6. src/components/sell-property/SellPropertyContent.tsx
- Advantages/USP list with descriptions
- Step-by-step process with descriptions
- FAQ section with full questions and answers

### 7. src/components/financial-services/EMICalculatorContent.tsx
- UI instruction text: "Drag the sliders to update the EMI calculation instantly."
- CTA text referencing 0.25–0.5% savings claim
- Section headings and labels hardcoded as JSX strings

---

## SECTION 8 — UPLOADS DIRECTORY

**Path:** `/public/uploads/`
**Status:** Directory exists
**File count:** 14 files
**Serving:** Static via Next.js (`images.unoptimized: true` in next.config.ts)
**Upload mechanism:** POST `/api/upload` saves multipart form data to this directory

---

## SECTION 9 — DATABASE FILE SIZES

| File | Size | Notes |
|------|------|-------|
| `./dev.db` (project root) | 143,360 bytes (140 KB) | Active database — contains all seeded/live data |
| `./prisma/dev.db` | 0 bytes | Empty artifact — not used |

**Active database location:** Project root `dev.db`
**ORM connection:** `src/lib/prisma.ts` uses `DATABASE_URL` env var → `file:./dev.db`

---

*End of RESTRUCTURE_AUDIT.md*
