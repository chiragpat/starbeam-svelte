import { Formula, Reactive } from '@starbeam/core'
import { reactive } from '@starbeam/js';

interface InchCounterInterface {
  increment: () => void;
  description: Reactive<string>;
}

export default function InchCounter(): InchCounterInterface {
  let state = reactive.object({
    inches: 0
  })

  const increment = () => {
    state.inches++;
  }

  const description = Formula(() => {
    console.log('calling description');
    return new Intl.NumberFormat(undefined, {
      style: 'unit',
      unit: 'inch'
    }).format(state.inches);
  });

  return {
    increment,
    description,
  };
}
