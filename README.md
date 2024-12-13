# Greenspark Frontend Task

Task:
- requirements: https://drive.google.com/file/d/1ISb15W3a_MYC5fTgia0wDFgKmso75RGi
- Figma design: https://www.figma.com/design/RFG3HifUzXdhgs1fgxUdtW/Frontend-task-(Copy)

Hosted result: https://greenspark-task-pinia.vercel.app/

Inspecting the solution:
- clone the repo
- open the `greenspark-frontend-task.code-workspace` file with VSCode (and install the recommended extensions!)
- in root folder: `npm install`
- in `./packages/gs-app-widgets-pinia`
    - either:
        - start the dev server: `npm start`
        - build and preview locally: `npm run build`, then `npm run preview`

## What I did

Implemented the task with my preferred tooling:
- VSCode
- Vite
- TypeScript
- Vue 3 (flavor: Single-File Components, `<script setup>`, Composition API)
- Pinia
- SCSS, Tailwind

Additional boilerplate tooling used: [my own ESLint config](https://github.com/danwithabox/eslint-entree), [`changesets`](https://github.com/changesets/changesets), [Husky](https://github.com/typicode/husky) + [`@commitlint/config-conventional`](https://github.com/conventional-changelog/commitlint/#what-is-commitlint).

My main considerations were:
- pixel-perfectly matching the Figma design
- clean, robust, type safe code
- minimal dependencies

The required part of the task took roughly 5.5 hours. For tracking I use [Toggl Track](https://toggl.com/):

![Toggl Track screenshot](./.github/img/img-toggl-track.png)

Where I felt I had notes, I put a comment saying `NOTE(FOR REVIEWERS):`.

Since the task said:
> FYI, we use Vue.js, Vuex and Typescript

and the soft deadline was said to be "within one week", I delayed posting my solution until I could put in some extra effort:

### Vuex implementation

I wanted to show that I can both work with Vuex, and could help migrating to its successor, Pinia, if that is of interest.

Hosted result: https://greenspark-task-vuex.vercel.app/ (though it's not very spectacular, since there's no visible difference compared to the other solution.)

- in `./packages/gs-app-widgets-vuex`
    - either:
        - start the dev server: `npm start`
        - build and preview locally: `npm run build`, then `npm run preview`

Having experience with monorepos, I extracted the UI elements into an internal package, to be shared between the Pinia and Vuex solutions. I deliberately kept the monorepo "vanilla" - no bloated monorepo tooling, just `npm`.

I created the Vuex solution as another internal package, and left a `NOTE(FOR REVIEWERS):` comment in `MainView.vue` describing the difference compared to the Pinia solution.

### Testing

As per the task document:
> _Optional: Write appropriate tests for your frontend service (unit, Storybook)_

I have experience with Vitest, Cypress, and Playwright, but not with Storybook.

Given that testing is a time sink, and practices vary heavily from place to place anyway, I created only a few minimal Vitest tests. I can adapt to more concrete requirements in the future.

In the project root, run `npm test`.

For a not-quite UI-centric proof of my Vitest skills, I have done some advanced work over at https://github.com/danwithabox/typeful-tuples/tree/main/test, including leveraging a virtual TypeScript environment to assert expected editor errors.