# @greenspark-task/app-widgets-pinia

Implementation of the interview task, with Pinia as the state store.

## Run
`npm start`

This will also use a custom Vite plugin to run the `@greenspark-task/lib-ui` local package's build in watch mode, to emulate hot module reload when imported UI elements are edited.

It's not as seamless as hot module reload for local components, but it's still snappy, and beats the alternative of rebuilding manually!

Alternatively, when seamless hot module reload is needed, simply develop the UI components inside their own `gs-lib-ui` workspace.