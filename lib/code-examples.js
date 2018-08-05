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
const { interval, of } = Rx;
const { take, scan } = RxOperators;

const interval$ = interval(1000);
const firstFourNumber$ = interval$.pipe(take(4));
const totals$ = firstFourNumber$.pipe(scan((total, num) => total + num, 0));

of(interval$, firstFourNumber$, totals$)
`.trim(),
    timeWindow: 10000
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
