import {
  ManualFormula,
  type FinishedManualFormula,
  type Reactive,
  type StartedManualFormula
} from '@starbeam/reactive';
import { TIMELINE, } from '@starbeam/core';

export default class ManualFormulaMarker {
  static create(getSubscribers: () => Set<() => void>) {
    return new ManualFormulaMarker(getSubscribers);
  }

  #formula: FinishedManualFormula = null;
  #start: StartedManualFormula = null;
  #poll: ManualFormula = null;
  #renderable = null;

  #getSubscribers: () => Set<() => void>;

  private constructor(getSubscribers) {
    this.#getSubscribers = getSubscribers;
  }

  startFormula() {
    if (!this.#formula) {
      this.#start = ManualFormula();
    } else {
      this.#poll = this.#formula.poll.start();
    }
  }

  finishFormula() {
    if (!this.#formula) {
      this.#formula = this.#start.done();
      this.#start = null;
    } else {
      this.#poll.done();
      this.#poll = null;
    }

    this.#renderable = TIMELINE.on.change(this.#formula as unknown as Reactive<unknown>, (newRenderable) => {
      if (this.#renderable !== newRenderable) {
        TIMELINE.prune(this.#renderable);
        this.#renderable = newRenderable;
      }

      this.#getSubscribers().forEach(s => s());
    });
  }
}
