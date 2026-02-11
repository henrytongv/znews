# Implement Skill

Execute implementation plans step-by-step with validation.

## Purpose

This skill guides the actual coding process, ensuring each step of an implementation plan is executed correctly and validated before moving to the next step.

## Implementation Process

### 1. Review the Plan

Before starting implementation:
- Read the complete implementation plan
- Understand the overall architecture
- Identify dependencies between steps
- Note critical files and components

### 2. Set Up Environment

Ensure development environment is ready:
```bash
# Verify dependencies installed
npm install

# Verify environment variables configured
cat .env.local

# Start development server
npm run dev
```

### 3. Execute Plan Steps

For each step in the plan:

#### Create/Modify Files

- Follow the plan's file structure
- Use appropriate TypeScript types
- Follow existing code patterns
- Add proper imports
- Include error handling

#### Validate Each Step

After implementing each step:
```bash
# Check TypeScript errors
npm run type-check

# Run linter
npm run lint

# Test in browser
# Open http://localhost:3000
```

#### Commit Progress

Commit after each major step:
```bash
git add <changed-files>
git commit -m "feat: step description"
```

### 4. Implementation Guidelines

#### Component Development

- **Props**: Define TypeScript interfaces for props
- **State**: Use appropriate React hooks (useState, useEffect)
- **Styling**: Use MUI sx prop for styling
- **Accessibility**: Add ARIA labels, proper semantic HTML
- **Responsive**: Test at different breakpoints

#### Error Handling

```typescript
try {
  // API call or operation
} catch (error) {
  // Log technical error
  logServerError(error, 'context')
  // Show user-friendly message
  setError(getUserFriendlyMessage(error))
}
```

#### Loading States

```typescript
const [loading, setLoading] = useState(true)

// Show skeleton or spinner while loading
{loading ? <Skeleton /> : <Content />}
```

#### API Integration

```typescript
// Always use server-side API routes
const response = await fetch('/api/endpoint')
const data = await response.json()

// Never expose API keys to client
// Use process.env in API routes only
```

### 5. Testing During Implementation

Test continuously:
- **Visual**: Check UI in browser
- **Functionality**: Test all user interactions
- **Errors**: Trigger error scenarios
- **Responsive**: Test mobile and desktop
- **Accessibility**: Test keyboard navigation

### 6. Code Quality Checks

Before considering step complete:
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] No console.log statements left behind
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] Accessibility features included
- [ ] Responsive design working
- [ ] Code commented where needed

### 7. Integration Testing

After all steps:
- Test the complete feature end-to-end
- Verify all user flows work
- Check error scenarios
- Test with different data
- Verify performance

### 8. Final Validation

```bash
# Type check
npm run type-check

# Build
npm run build

# Visual inspection
# Open http://localhost:3000 and test
```

## Implementation Patterns

### Creating New Components

```typescript
'use client' // If client-side only

import { ComponentProps } from '@mui/material'

interface MyComponentProps {
  // Define props
}

export default function MyComponent({ }: MyComponentProps) {
  // Component implementation
}
```

### Creating API Routes

```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Implementation
    return NextResponse.json(data)
  } catch (error) {
    // Error handling
    return NextResponse.json({ error }, { status: 500 })
  }
}
```

### Creating Utility Functions

```typescript
/**
 * Function description
 * @param param - Parameter description
 * @returns Return value description
 */
export function myUtility(param: Type): ReturnType {
  // Implementation
}
```

## Troubleshooting

- **Module not found**: Check imports and file paths
- **Type errors**: Verify TypeScript interfaces
- **Runtime errors**: Check browser console
- **Styling issues**: Inspect element in DevTools
- **API errors**: Check Network tab and server logs

## Success Criteria

Implementation is complete when:
- All plan steps executed
- No TypeScript or linting errors
- All tests passing
- Feature works as expected
- Error handling in place
- Responsive design working
- Accessibility verified
- Code committed
