# draftbit starRating component refactoring

I have refactored the starRating component of draftbit to accept a new prop named isRoundValue.

## Quickstart:

```sh
git clone https://github.com/draftbit/react-native-jigsaw && cd react-native-jigsaw
yarn && yarn bootstrap && yarn build
yarn example start -c --web
```

Main changes were made in the `packages/core/src/components/StarRating.js` and `packages/core/src/components/StarRating.tsx` files.

## Location of changes

`packages/core/src/components/StarRating.tsx` line no 19,34 and 47
`packages/core/src/components/StarRating.js` line no 11,23
`example/src/StarRatingExample.js` line no 18

## Description:

- This component now allows for a new prop to be passed in, a boolean, `Round Value?`
  - If false, the star rating component should operate as it does now, displaying partial values.
  - if true, the star rating should round the value to the nearest integer value.

```

```

```
