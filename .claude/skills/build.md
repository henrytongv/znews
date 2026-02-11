# Build Skill

Build and type-check the ZNews project to ensure production readiness.

## Purpose

This skill builds the Next.js application and performs TypeScript type checking to verify that the code is ready for deployment.

## Pre-checks

1. Ensure all dependencies are installed (`node_modules` exists)
2. Verify environment variables are configured (`.env.local` exists)
3. Check that no uncommitted critical changes exist

## Commands

Execute the following commands in sequence:

1. **Type Check**: Verify TypeScript types
   ```bash
   npm run type-check
   ```

2. **Build**: Create production build
   ```bash
   npm run build
   ```

## Post-checks

1. Verify build completed successfully (`.next` directory exists)
2. Check for any build warnings or errors
3. Confirm build output size is reasonable

## Success Criteria

- TypeScript compilation completes with no errors
- Production build completes successfully
- No critical warnings in build output
- Build artifacts are created in `.next` directory

## Troubleshooting

- **Type errors**: Fix TypeScript errors in the reported files
- **Module not found**: Run `npm install` to ensure dependencies are installed
- **Out of memory**: Increase Node.js memory limit with `NODE_OPTIONS=--max-old-space-size=4096`
