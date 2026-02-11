# Chore Skill

Handle maintenance tasks and project housekeeping.

## Purpose

This skill covers routine maintenance tasks like updating dependencies, cleaning build artifacts, and managing project configuration.

## Common Chore Tasks

### Update Dependencies

1. **Check for outdated packages**
   ```bash
   npm outdated
   ```

2. **Update packages (minor versions)**
   ```bash
   npm update
   ```

3. **Update to latest versions** (carefully)
   ```bash
   npm install <package>@latest
   ```

4. **Verify after updates**
   ```bash
   npm run build
   npm run type-check
   ```

### Security Audit

1. **Check for vulnerabilities**
   ```bash
   npm audit
   ```

2. **Fix vulnerabilities** (if safe)
   ```bash
   npm audit fix
   ```

### Clean Build Artifacts

```bash
rm -rf .next
rm -rf node_modules/.cache
```

### Clean and Reinstall Dependencies

```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### Update Environment Configuration

1. Review `.env.example` for new variables
2. Update `.env.local` if needed
3. Document changes in README

### Code Formatting

If Prettier is added:
```bash
npm run format
```

### Git Maintenance

1. **Remove merged branches**
   ```bash
   git branch --merged main | grep -v "main" | xargs git branch -d
   ```

2. **Fetch and prune**
   ```bash
   git fetch --prune
   ```

## Documentation Updates

- Update README.md with new features or changes
- Update API documentation
- Update environment variable examples
- Update deployment instructions

## Verification

After maintenance tasks:
- Run build to ensure nothing broke
- Run type check
- Test critical functionality
- Commit changes with clear chore message

## Commit Message Format

```
chore: description of maintenance task

Examples:
- chore: update dependencies to latest versions
- chore: clean up unused imports
- chore: update environment variable documentation
- chore: fix security vulnerabilities
```
