# Push Skill

Push changes to remote repository with proper verification.

## Purpose

This skill guides the process of pushing code changes to GitHub after proper verification and testing.

## Pre-checks

Before pushing, verify:

1. **Code Quality**
   ```bash
   npm run lint
   npm run type-check
   ```

2. **Build Success**
   ```bash
   npm run build
   ```

3. **Git Status**
   ```bash
   git status
   ```
   - Ensure all changes are committed
   - Verify branch name is appropriate
   - Check for untracked files that should be committed

## Push Process

### 1. Verify Current Branch

```bash
git branch --show-current
```

Ensure you're on the correct branch (e.g., `feature/feature-name`, `fix/bug-name`, or `main`)

### 2. Review Commits

```bash
git log origin/$(git branch --show-current)..HEAD
```

Review commits that will be pushed to ensure:
- Commit messages are clear and descriptive
- No sensitive data in commits
- Commits are logical and well-organized

### 3. Push to Remote

```bash
git push origin $(git branch --show-current)
```

For first push of a new branch:
```bash
git push -u origin $(git branch --show-current)
```

## Post-checks

1. Verify push succeeded
2. Check GitHub for new commits
3. If using Vercel, monitor deployment status
4. Verify preview deployment works (if on feature branch)

## Safety Guidelines

- **Never force push** to `main` branch
- **Never push** with `--no-verify` flag unless explicitly needed
- **Always review** changes before pushing
- **Verify tests pass** before pushing to main
- **Check deployment** status after pushing

## Troubleshooting

- **Push rejected**: Pull latest changes with `git pull --rebase`
- **Merge conflicts**: Resolve conflicts, then commit and push
- **Large files**: Ensure no large binaries are accidentally committed
- **Secrets exposed**: Immediately remove and rotate any exposed secrets
