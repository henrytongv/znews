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

### 2. 🗄️ Database Integration with Daily API Sync

**Description**: Store articles in database and fetch from newsdata.io only once per day

**Implementation**:

#### Database Setup
- Use Vercel Postgres or Supabase
- Create `articles` table with full article schema
- Create `sync_log` table to track daily fetches
- Indexes on pub_date and fetched_at

#### Sync Strategy
- Cron job runs once daily (e.g., 6 AM UTC)
- Check if sync already happened today
- If not synced: fetch from newsdata.io and store in DB
- If synced: skip API call
- Always serve data from database

#### API Changes
- `src/app/api/news/route.ts` - Query database instead of external API
- `src/app/api/news/[id]/route.ts` - Query database for single article
- `src/app/api/sync/route.ts` - New cron endpoint for daily sync

#### Environment Variables
```env
DATABASE_URL=postgresql://...
CRON_SECRET=your_secret_for_cron_protection
```

**Technical Details**:
- Database client: @vercel/postgres or Supabase client
- Create `src/lib/database.ts` - DB connection and queries
- Create `src/lib/sync.ts` - Daily sync logic
- Configure Vercel Cron in `vercel.json`

**Benefits**:
- Reduce API calls from 1000s/day to 1/day
- Faster response times
- Better rate limit management
- Lower API costs
- Foundation for Phase 3 features

**Estimated Time**: 12-15 hours

---

### Phase 2 Summary

| Feature | Complexity | Time Estimate |
|---------|-----------|---------------|
| Light/Dark Theme | Low | 3-4 hours |
| Database + Daily Sync | High | 12-15 hours |
| **Total** | | **15-19 hours** |

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
Client → Next.js API Routes → PostgreSQL Database
                ↑
        Daily Cron Job → newsdata.io API
```

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
- [ ] WCAG AA accessibility maintained
- [ ] Database stores articles successfully
- [ ] Daily sync runs automatically
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
