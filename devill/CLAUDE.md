# rpgcombat

## After every task

1. Run `pnpm run ci` (tests + build + habit-hooks). Fix all failures and habit-hooks violations before continuing.
2. Commit the change with a clear conventional message.

Don't declare a task done until ci is green and the work is committed.

Note: `pnpm ci` (without `run`) is pnpm's clean-install command — always use `pnpm run ci` to invoke the verify script.
