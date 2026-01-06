# Brett Berry — Portfolio

Live at: https://brettberry.dev

Figma: [here](https://www.figma.com/design/iAIP71pgOX4RqJmSZBJwsy/Portfolio?node-id=0-1&t=KzAnvcmg2bN7nbIt-1)

**Overview**
- A fast, polished personal portfolio highlighting projects, motion design, and contact links. Built for smooth interactions, consistent typography, and responsive layouts across devices.

**Features**
- **Sectioned experience:** Hero, About, Who Am I, Proof, Projects, Contact.
- **Smooth animations:** Shared Framer Motion variants for headings and visuals.
- **Mobile carousel:** Horizontal snap-scrolling cards with clipped descriptions.
- **Project modal:** Detailed view with contained scroll and `object-contain` imagery.
- **Consistent typography:** Harmonized heading scales; monospace labels/captions.
- **Configurable cards:** Supports `viewMoreOnly` and `showExternalLink` options.

**Tech Stack**
- **Next.js 16 (App Router)** and **React 19** for modern rendering.
- **Tailwind CSS v4** for utility-first responsive styling.
- **Framer Motion** for declarative animations and transitions.
- **Lenis** for smooth, controlled scrolling behavior.
- **TypeScript** for type safety across components.

**Structure & Key Files**
- App shell and entry: [src/app/layout.tsx](src/app/layout.tsx), [src/app/page.tsx](src/app/page.tsx)
- Sections: [src/components/sections](src/components/sections)
- Smooth scroll provider: [src/components/providers/SmoothScrollProvider.tsx](src/components/providers/SmoothScrollProvider.tsx)
- Motion variants: [src/lib/motion.ts](src/lib/motion.ts)
- Projects UI and data: [src/components/sections/Projects.tsx](src/components/sections/Projects.tsx)

**Design Principles**
- Keep animations inside motion wrappers to avoid snapping.
- Hide decorative elements on small screens to prioritize content.
- Clip long descriptions on cards to prevent overlap with tags/actions.
