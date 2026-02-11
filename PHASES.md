# ZNews - Development Phases

## Phase 1 ✅ (Completed)

### Features Implemented
- ✅ Next.js 14 with TypeScript and App Router
- ✅ Material-UI v6 with cold color palette (blues, teals, grays)
- ✅ Server-side API integration with newsdata.io
- ✅ Two-column news layout with images
- ✅ Description truncation to 200 words
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ WCAG accessibility compliance
- ✅ Click-through to article detail pages
- ✅ Full article view with link to source
- ✅ User-friendly error handling
- ✅ Loading states with skeleton screens
- ✅ AI Developer Workflows (AIDW) custom skills

---

## Phase 2 🎯 (Current Priority)

### Scope
Two primary features focused on user experience and performance optimization.

### 1. 🌓 Light/Dark Theme Toggle

**Description**: Theme switcher button to toggle between light and dark modes

**Implementation**:
- Theme toggle button in AppBar (top right)
- Support both light and dark modes with cold color palette
- Light mode: Current blues, teals, cool grays
- Dark mode: Deep blues, dark teals, darker grays
- Persist preference in localStorage
- Smooth transitions between themes
- WCAG AA accessibility in both modes (4.5:1 contrast)
- Icon: Sun/Moon toggle

**Technical Details**:
- Extend `src/theme/theme.ts` for dual mode support
- Create ThemeProvider wrapper with state management
- Detect system preference initially
- Store preference in localStorage

**Files**:
- `src/theme/theme.ts` - Add dark mode configuration
- `src/app/layout.tsx` - Add theme toggle state
- `src/components/ThemeToggle.tsx` - Toggle button component

**Estimated Time**: 3-4 hours

---

### 2. 🗄️ Database Integration with Lazy Daily Sync

**Description**: Store articles in database and fetch from newsdata.io only once per day

**Implementation**:

#### Database Setup
- Use Vercel Postgres or Supabase
- Create `articles` table with full article schema
- Create `sync_log` table to track daily fetches (simple flag table):
  ```sql
  CREATE TABLE sync_log (
    sync_date DATE PRIMARY KEY,
    articles_count INTEGER,
    status VARCHAR(50),
    synced_at TIMESTAMP DEFAULT NOW()
  );
  ```
- Indexes on pub_date for articles table

#### Lazy Sync Strategy (No Cron Job Required)
On each request to `/api/news`:
1. Check `sync_log` for today's date
2. **If flag NOT present for today**:
   - Fetch articles from newsdata.io API
   - Store articles in `articles` table
   - Insert flag in `sync_log` with today's date
   - Return articles from database
3. **If flag exists for today**:
   - Skip API call
   - Return articles directly from database

This is a "lazy sync" - first request of the day triggers the fetch.

#### API Changes
- `src/app/api/news/route.ts`:
  - Check sync_log for today's date flag
  - If no flag: fetch from newsdata.io, store in DB, set flag
  - If flag exists: query database only
  - Return articles from database

- `src/app/api/news/[id]/route.ts`:
  - Query database for single article
  - No external API calls needed

#### Environment Variables
```env
DATABASE_URL=postgresql://...
```

**Technical Details**:
- Database client: @vercel/postgres or Supabase client
- Create `src/lib/database.ts` - DB connection and queries
- Create `src/lib/sync.ts` - Sync logic with date flag checking
- No cron configuration needed (simpler deployment)

**Benefits**:
- ✅ Reduce API calls from 1000s/day to 1/day
- ✅ Faster response times (database queries)
- ✅ Better rate limit management
- ✅ Lower API costs
- ✅ No cron job setup required
- ✅ Simpler implementation and debugging
- ✅ Foundation for Phase 3 features

**Estimated Time**: 8-10 hours (reduced from 12-15)

---

### Phase 2 Summary

| Feature | Complexity | Time Estimate |
|---------|-----------|---------------|
| Light/Dark Theme | Low | 3-4 hours |
| Database + Lazy Daily Sync | Medium | 8-10 hours |
| **Total** | | **11-14 hours** |

---

## Phase 3 📋 (Future Enhancements)

### Search & Filtering Features
1. **🔍 Search Functionality** - Search articles by keywords (from DB)
2. **🏷️ Category Filtering** - Filter by news categories (business, tech, sports, etc.)
3. **🌍 Country/Language Filters** - Filter by country or language
4. **📄 Pagination/Infinite Scroll** - Navigate through multiple pages

### User Experience Features
5. **⚙️ User Preferences** - Save settings and customize experience
6. **🔖 Bookmarks/Favorites** - Save articles to read later
7. **📚 Reading History** - Track articles user has read

### Advanced Features
8. **📱 Progressive Web App (PWA)** - Installable app with offline support
9. **🔔 Push Notifications** - Notify users of breaking news
10. **📊 Analytics Dashboard** - Display trends and reading statistics
11. **👥 User Accounts** - Authentication and personalization
12. **💬 Comments/Discussions** - Community engagement features
13. **📤 Social Sharing** - Share articles on social media
14. **📰 Newsletter** - Email digest of top articles

### Phase 3 Priority (TBD)
Priority and timeline for Phase 3 features will be determined after Phase 2 completion based on:
- User feedback
- Analytics data
- Business priorities
- Technical dependencies

---

## Implementation Approach

### Using AIDW Skills

For each phase implementation:
1. `/plan` - Create detailed implementation plan
2. `/implement` - Execute the plan step-by-step
3. `/test` - Verify functionality and accessibility
4. `/build` - Ensure production build succeeds
5. `/push` - Push changes to GitHub

### Development Workflow

1. Create feature branch
2. Plan implementation
3. Implement incrementally
4. Test thoroughly
5. Build and verify
6. Push to GitHub
7. Deploy to Vercel

---

## Architecture Evolution

### Phase 1
```
Client → Next.js API Routes → newsdata.io API
```

### Phase 2
```
Client → Next.js API Routes → Check sync_log for today's date
                ↓                      ↓
         Flag exists?           Flag NOT exists?
                ↓                      ↓
    Return from PostgreSQL    Fetch from newsdata.io
                               ↓
                        Store in PostgreSQL + Set flag
                               ↓
                        Return from PostgreSQL
```

Simplified: First request of the day triggers the newsdata.io fetch

### Phase 3
```
Client → Next.js API Routes → PostgreSQL Database
                ↑                      ↑
        Daily Cron Job → newsdata.io API

        + User Auth
        + Real-time features
        + Analytics
```

---

## Success Metrics

### Phase 2
- [ ] Theme toggle works smoothly in both modes
- [ ] Theme preference persists across sessions
- [ ] WCAG AA accessibility maintained in both themes
- [ ] Database stores articles successfully
- [ ] Sync flag mechanism works correctly
- [ ] First request of the day fetches from newsdata.io
- [ ] Subsequent requests serve from database only
- [ ] API calls reduced to 1 per day
- [ ] Page load time < 1 second (from DB)
- [ ] Production build succeeds
- [ ] Zero regression in existing features

### Phase 3
Will be defined after Phase 2 completion

---

## Timeline

- **Phase 1**: ✅ Completed
- **Phase 2**: In planning (15-19 hours estimated)
- **Phase 3**: Future (timeline TBD)

---

*Last Updated: 2026-02-11*
