# Feature Skill

Guide the implementation of new features from planning to deployment.

## Purpose

This skill provides a comprehensive workflow for implementing new features in the ZNews application.

## Feature Implementation Workflow

### Phase 1: Planning

1. **Understand Requirements**
   - What problem does this feature solve?
   - Who are the users?
   - What are the acceptance criteria?
   - Are there any constraints or dependencies?

2. **Use the Plan Skill**
   ```
   /plan
   ```
   Create a detailed implementation plan including:
   - Architecture and design decisions
   - Files to modify or create
   - Component hierarchy
   - Data flow and API changes
   - Testing strategy

3. **Review and Refine**
   - Get feedback on the plan
   - Consider edge cases
   - Identify potential risks

### Phase 2: Implementation

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/feature-name
   ```

2. **Use the Implement Skill**
   ```
   /implement
   ```
   Follow the plan step-by-step:
   - Create or modify files
   - Implement components
   - Add error handling
   - Implement loading states
   - Add accessibility features
   - Make responsive design work

3. **Commit Incrementally**
   ```bash
   git add <files>
   git commit -m "feat: specific feature change"
   ```

### Phase 3: Testing

1. **Use the Test Skill**
   ```
   /test
   ```
   - Run automated tests
   - Perform manual testing
   - Test accessibility
   - Test responsive design
   - Test error scenarios

2. **Fix Issues**
   - Address bugs found during testing
   - Refine user experience
   - Optimize performance

### Phase 4: Review

1. **Self Review**
   - Review all changes
   - Check for code quality
   - Verify no console.log left behind
   - Ensure proper error handling

2. **Build Verification**
   ```
   /build
   ```
   Ensure production build succeeds

### Phase 5: Deployment

1. **Push Changes**
   ```
   /push
   ```

2. **Create Pull Request** (if using PRs)
   - Write clear description
   - Reference related issues
   - Add screenshots if UI changes

3. **Monitor Deployment**
   - Check Vercel deployment status
   - Test on preview deployment
   - Verify no errors in logs

### Phase 6: Validation

1. **Post-deployment Testing**
   - Test on production/staging
   - Verify API integrations work
   - Check error logging

2. **Monitor**
   - Watch for errors
   - Check user feedback
   - Monitor performance

## Feature Checklist

- [ ] Requirements understood
- [ ] Plan created and reviewed
- [ ] Feature branch created
- [ ] Implementation completed
- [ ] Error handling added
- [ ] Loading states implemented
- [ ] Accessibility verified
- [ ] Responsive design tested
- [ ] Tests passing
- [ ] Build successful
- [ ] Code committed
- [ ] Changes pushed
- [ ] Deployment successful
- [ ] Production verification complete

## Best Practices

- **Keep changes focused**: One feature per branch
- **Commit often**: Small, logical commits
- **Test thoroughly**: Don't skip testing
- **Document changes**: Update relevant docs
- **Consider accessibility**: WCAG compliance
- **Think mobile-first**: Responsive by default
- **Handle errors**: User-friendly messages
- **Optimize images**: Use Next.js Image component
