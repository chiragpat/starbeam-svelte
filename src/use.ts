import { setContext, getContext } from 'svelte';
import type { Readable } from 'svelte/store';
import { get_current_component } from 'svelte/internal';

export const CONTEXT_KEY = Symbol('USE_STARBEAM');
export const GET_SUBSCRIBERS = Symbol('GET_SUBSCRIBERS');
export const PARENT_SUBSCRIBER_OBJ = Symbol('PARENT_SUBSCRIBER_OBJ');

const subscriberMap: WeakMap<any, Set<() => void>> = new Map();

export interface ParentSubscriber {
  addSubscriber(fn: () => void): void
  removeSubscriber(fn: () => void): void
}

export default function use<T>(definition: () => T): Readable<T> {
  const api = definition();
  const currentComponentInstance = get_current_component();

  if (!subscriberMap.has(currentComponentInstance)) {
    subscriberMap.set(currentComponentInstance, new Set());
  }

  setContext(GET_SUBSCRIBERS, function () {
    return subscriberMap.get(currentComponentInstance);
  });

  const parentSubscriber: ParentSubscriber = getContext(PARENT_SUBSCRIBER_OBJ);

  return {
    subscribe(fn) {
      const subFn = () => fn(api);
      subFn();

      const subscribers = subscriberMap.get(currentComponentInstance)!;
      subscribers.add(subFn);
      if (parentSubscriber) {
        parentSubscriber.addSubscriber(subFn)
      }

      return () => {
        subscribers.delete(subFn);
        if (parentSubscriber) {
          parentSubscriber.removeSubscriber(subFn);
        }
      }
    }
  }
}
