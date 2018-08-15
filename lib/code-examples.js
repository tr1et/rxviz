export default {
  interval: {
    name: 'Interval',
    code: `
const { interval } = Rx;

interval(1000)
`.trim(),
    timeWindow: 7000
  },
  map: {
    name: 'Map',
    code: `
const { interval } = Rx;
const { map } = RxOperators;

interval(1000).pipe(map(x => x * 2))
`.trim(),
    timeWindow: 7000
  },
  take: {
    name: 'Take',
    code: `
const { interval } = Rx;
const { take } = RxOperators;

interval(1000).pipe(
  take(4)
)
`.trim(),
    timeWindow: 10000
  },
  reduce: {
    name: 'Reduce',
    code: `
const { interval } = Rx;
const { take, reduce } = RxOperators;

interval(1000).pipe(
  // Must be complete to return value
  take(4),
  reduce((total, num) => total + num, 0)
)
`.trim(),
    timeWindow: 10000
  },
  scan: {
    name: 'Scan',
    code: `
const { interval } = Rx;
const { take, scan } = RxOperators;

interval(1000).pipe(
  // Must be complete to return value
  take(4),
  scan((total, num) => total + num, 0)
)
`.trim(),
    timeWindow: 10000
  },
  higherOrderObservable: {
    name: 'Higher Order Observable',
    code: `
const { interval } = Rx;
const { take, map } = RxOperators;

interval(1000).pipe(
  take(5),
  map(() => interval(666).pipe(take(5)))
)
`.trim(),
    timeWindow: 10000
  },
  leaking: {
    name: 'Leaking',
    code: `
const { interval } = Rx;
const { map } = RxOperators;

interval(500).pipe(
  map(() => interval(500))
)
`.trim(),
    timeWindow: 10000
  },
  merging: {
    name: 'Merging',
    code: `
const { interval, timer, of } = Rx;
const { take, map, mergeAll, switchAll, exhaust, startWith } = RxOperators;

const timer$ = timer(200, 1000).pipe(
  take(4),
  map(() => interval(400).pipe(take(4)))
)

of(
  timer$,
  timer$.pipe(mergeAll(), startWith('M')), // also called as mergeMap
  timer$.pipe(switchAll(), startWith('S')), // also called as switchMap
  timer$.pipe(exhaust(), startWith('E')), // also called as exhaustMap
)
`.trim(),
    timeWindow: 4000
  },

  custom: {
    name: 'Custom',
    code: `// Write any JavaScript you want, just make sure that
// the last expression is an Rx.Observable

const {  } = Rx;
const {  } = RxOperators;
 `,
    timeWindow: 10000
  }
};
