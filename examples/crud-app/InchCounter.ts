import { Formula, Cell, type Reactive } from '@starbeam/reactive';
import { reactive } from '@starbeam/core';

interface InchCounterInterface {
  increment: () => void;
  description: Reactive<string>;
}

export default function InchCounter(): InchCounterInterface {
  let state = reactive({
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
