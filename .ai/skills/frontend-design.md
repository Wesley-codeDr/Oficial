---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, or applications. Generates creative, polished code that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

# Frontend Design Skill

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## 🚨 WellWave Project Override

**FOR THIS PROJECT (WellWave)**: ALL UI implementations MUST follow the Liquid Glass 2026 Design System.

This skill provides creative guidance for areas where customization is allowed:
- ✅ Layout composition and spatial hierarchy
- ✅ Content structure and information architecture
- ✅ Micro-interactions and animation choreography (within Liquid Glass motion tokens)
- ✅ Component combinations and page-level design
- ✅ Icon selection and visual metaphors
- ✅ Content tone and copy

**MANDATORY constraints from Liquid Glass 2026:**
- ❌ NO custom color schemes (use semantic tokens only)
- ❌ NO custom typography (system fonts defined in design system)
- ❌ NO custom border radius (use 7-level hierarchy)
- ❌ NO opaque backgrounds on cards (glass effects required)
- ❌ NO custom shadows (use defined shadow tokens)
- ❌ NO linear transitions (use defined ease curves)

**Reference files:**
- `.ai/skills/LIQUID_GLASS_DESIGN_SYSTEM.md` - Full specification
- `.ai/skills/LIQUID_GLASS_QUICK_REFERENCE.md` - Quick snippets
- `lib/design-system/glass-tokens.ts` - Token definitions

---

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:

- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Frontend Aesthetics Guidelines

### For WellWave (With Liquid Glass 2026)

Focus creative energy on:

**Spatial Composition & Layout**
- Unexpected asymmetric layouts within healthcare context
- Strategic use of negative space for breathing room
- Grid-breaking elements for visual interest
- Diagonal flow for urgency communication
- Controlled density for information hierarchy

**Motion & Interaction Choreography**
- Orchestrated page load sequences using `animation-delay`
- Staggered reveals for complex medical forms
- Scroll-triggered micro-interactions (within Framer Motion springs)
- Hover states that provide medical context
- Focus states that guide critical workflows

**Content & Information Architecture**
- Bold typographic hierarchy for medical priorities
- Creative use of icons and visual metaphors
- Unexpected but intuitive information grouping
- Visual storytelling for complex medical flows
- Contextual illustrations and diagrams

**Component Composition**
- Novel combinations of Liquid Glass primitives
- Creative card arrangements and overlays
- Unique modal and dialog presentations
- Innovative form field groupings
- Custom data visualization layouts

### For General Projects (No Design System Constraints)

Focus on:

**Typography**
- Choose fonts that are beautiful, unique, and interesting
- Avoid generic fonts like Arial and Inter
- Opt for distinctive choices that elevate aesthetics
- Pair a distinctive display font with a refined body font
- Unexpected, characterful font choices

**Color & Theme**
- Commit to a cohesive aesthetic
- Use CSS variables for consistency
- Dominant colors with sharp accents
- Avoid timid, evenly-distributed palettes

**Motion**
- Use animations for effects and micro-interactions
- Prioritize CSS-only solutions for HTML
- Use Motion library for React when available
- Focus on high-impact moments
- One well-orchestrated page load with staggered reveals
- Scroll-triggering and hover states that surprise

**Spatial Composition**
- Unexpected layouts
- Asymmetry
- Overlap
- Diagonal flow
- Grid-breaking elements
- Generous negative space OR controlled density

**Backgrounds & Visual Details**
- Create atmosphere and depth
- Add contextual effects and textures
- Gradient meshes
- Noise textures
- Geometric patterns
- Layered transparencies
- Dramatic shadows
- Decorative borders
- Custom cursors
- Grain overlays

## What to Avoid

NEVER use generic AI-generated aesthetics:
- ❌ Overused font families (Inter, Roboto, Arial, system fonts)
- ❌ Cliched color schemes (purple gradients on white backgrounds)
- ❌ Predictable layouts and component patterns
- ❌ Cookie-cutter design that lacks context-specific character
- ❌ Space Grotesk and other trendy fonts across all projects
- ❌ Generic "startup" or "SaaS" aesthetics

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices across generations.

## Implementation Principles

**Match complexity to vision:**
- Maximalist designs need elaborate code with extensive animations and effects
- Minimalist designs need restraint, precision, and careful attention to spacing, typography, and subtle details
- Elegance comes from executing the vision well

**For WellWave specifically:**
- Medical context demands clarity and accessibility
- Emergency scenarios require fast load times and instant feedback
- LGPD/CFM compliance affects data display and interactions
- Healthcare professionals need efficient, distraction-free workflows
- Patients need reassuring, trustworthy interfaces

**Production-grade standards:**
- Functional, tested code
- Accessibility (WCAG 2.1 AA minimum)
- Performance optimized
- Responsive across devices
- Dark mode support
- Error states and edge cases

## Creative Expression Within Constraints

Even with strict design system requirements, creativity flourishes in:

1. **Layout Innovation**: How components are arranged and flow
2. **Animation Choreography**: Timing, sequencing, and coordination of motion
3. **Information Hierarchy**: What to emphasize and how
4. **Micro-interactions**: Small delightful moments that enhance UX
5. **Content Strategy**: Tone, copy, and messaging
6. **Visual Metaphors**: Icons, illustrations, and symbolic representations
7. **Composition**: Relationships between elements and negative space

Remember: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.

---

## Usage Examples

### For WellWave Components
```bash
"Create a distinctive patient intake form using Liquid Glass 2026"
"Design an innovative kanban board for emergency triage"
"Build a memorable anamnesis generator interface"
```

### For General Projects
```bash
"Create a bold portfolio landing page"
"Design a maximalist e-commerce product page"
"Build a brutalist blog layout"
```

---

**Remember**: Constraints breed creativity. The Liquid Glass 2026 system provides a foundation of excellence - your job is to orchestrate those primitives into something unforgettable.
