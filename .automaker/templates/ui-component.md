# UI Component Template

## Component: {{name}}

### Design System Compliance
- [ ] Uses Glass Design System tokens
- [ ] Follows animation-tokens.ts presets
- [ ] Implements micro-interactions.ts feedback
- [ ] Supports light/dark themes
- [ ] Safari webkit prefixes included

### Accessibility
- [ ] ARIA labels configured
- [ ] Keyboard navigation works
- [ ] Focus management correct
- [ ] Screen reader tested
- [ ] Color contrast sufficient

### Technical Requirements
- [ ] TypeScript props interface
- [ ] forwardRef implemented
- [ ] CVA variants defined
- [ ] Tailwind merge for className
- [ ] Radix primitives (if interactive)

### Testing
- [ ] Renders without errors
- [ ] All variants work
- [ ] Responsive behavior correct
- [ ] Animation performance ok

---

## Props Interface

```typescript
interface {{name}}Props {
  // Define props here
}
```

## Usage Example

```tsx
<{{name}} />
```

## Related Components

{{related}}
