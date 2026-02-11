# Test Skill

Run tests and verify functionality of the ZNews application.

## Purpose

This skill runs linting, type checking, and manual verification to ensure code quality and functionality.

## Commands

Execute the following commands:

1. **Lint**: Check code style and quality
   ```bash
   npm run lint
   ```

2. **Type Check**: Verify TypeScript types
   ```bash
   npm run type-check
   ```

## Manual Testing Checklist

### Functional Testing

- [ ] Home page loads and displays news articles
- [ ] News articles fetch from API successfully
- [ ] Article cards display image, title, and truncated description
- [ ] Hover effect works on article cards
- [ ] Clicking article navigates to detail page
- [ ] Article detail page displays full article content
- [ ] "Read Full Article" button links to source
- [ ] Back button navigates to home page
- [ ] Error messages display when API fails
- [ ] Retry button works after errors

### Accessibility Testing

- [ ] Keyboard navigation works (Tab, Enter)
- [ ] All interactive elements have focus indicators
- [ ] Images have alt text
- [ ] Headings use proper hierarchy (h1, h2, h3)
- [ ] ARIA labels are present on buttons and links
- [ ] Color contrast meets WCAG AA standards

### Responsive Design Testing

- [ ] Layout works on mobile (< 600px)
- [ ] Layout works on tablet (600px - 900px)
- [ ] Layout works on desktop (> 900px)
- [ ] Images scale appropriately
- [ ] Text remains readable at all sizes

### Error Handling Testing

- [ ] Disconnect internet and verify friendly error message
- [ ] Invalid article ID shows appropriate error
- [ ] Missing API key shows configuration error
- [ ] No technical details exposed in error messages

## Coverage Requirements

- All critical user flows tested
- Edge cases considered
- Error states verified
- Accessibility validated

## Success Criteria

- All automated tests pass
- No TypeScript or linting errors
- Manual testing checklist completed
- No regressions in existing functionality
