export default {
  interval: {
    name: 'Interval',
    code: `
const { interval } = Rx;

interval(1000)
`.trim(),
    timeWindow: 7000
  },
  mapAndTake: {
    name: 'Map and Take',
    code: `
const { interval } = Rx;
const { map, take } = RxOperators;

interval(1000).pipe(map(x => x * 2), take(4))
`.trim(),
    timeWindow: 7000
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
  mergingInnerObservables: {
    name: 'Merging inner observables',
    code: `
const { interval, of } = Rx;
const { take, map, mergeAll, switchAll, exhaust, concatAll, startWith } = RxOperators;

const timer$ = interval(1000).pipe(
  take(4),
  map(() => interval(400).pipe(take(4)))
);

of(
  timer$,
  timer$.pipe(mergeAll(), startWith('M')), // also called as mergeMap
  timer$.pipe(switchAll(), startWith('S')), // also called as switchMap
  timer$.pipe(exhaust(), startWith('E')), // also called as exhaustMap
  timer$.pipe(concatAll(), startWith('C')), // also called as concatMap
)
`.trim(),
    timeWindow: 6000
  },
  mergingObservables: {
    name: 'Merging observables',
    code: `
const { interval, merge, of, zip, concat, combineLatest } = Rx;
const { take, map, delay, startWith } = RxOperators;

const evens$ = interval(500).pipe(map(x => x * 2), take(4));
const odds$ = interval(500).pipe(map(x => x * 2 + 1), delay(250), take(4));

of(
  evens$,
  odds$,
  merge(evens$, odds$).pipe(startWith('M')),
  zip(evens$, odds$).pipe(startWith('Z')),
  concat(evens$, odds$).pipe(startWith('C')),
  combineLatest(evens$, odds$).pipe(startWith('L'))
)
`.trim(),
    timeWindow: 3000
  },
  autoSuggestion: {
    name: 'Auto suggestion',
    code: `
const { merge, of } = Rx;
const { take, map, switchMap, debounceTime, startWith, delay } = RxOperators;

const keyUp$ = merge(
  of('S').pipe(delay(500)),
  of('Y').pipe(delay(800)),
  of('D').pipe(delay(1300)),
  of('N').pipe(delay(1900)),
  of('E').pipe(delay(2100)),
  of('Y').pipe(delay(2400)),
);
const debounced$ = keyUp$.pipe(debounceTime(400));
const callApi$ = of('[x]').pipe(delay(600));
const switchMap$ = debounced$.pipe(switchMap(() => callApi$));

of(
  keyUp$,
  debounced$.pipe(startWith('D')),
  switchMap$.pipe(startWith('S')),
  // debounced$.pipe(map(() => callApi$), startWith('DS')),
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
