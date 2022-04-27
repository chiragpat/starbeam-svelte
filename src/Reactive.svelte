<script lang="ts">
  import { setContext } from 'svelte';
  import ManualFormulaMarker from './ManulFormulaMarker';
  import RunInTemplate from './RunInTemplate.svelte';
  import { PARENT_SUBSCRIBER_OBJ } from './use';

  let subscribers = new Set<() => void>();

  setContext(PARENT_SUBSCRIBER_OBJ, {
    addSubscriber(fn) {
      subscribers.add(fn);
    },

    removeSubscriber(fn) {
      subscribers.delete(fn);
    }
  });

  const manualFormulaMarker = ManualFormulaMarker.create(() => subscribers);
</script>

<RunInTemplate fn={() => manualFormulaMarker.startFormula()}/>
<slot/>
<RunInTemplate fn={() => manualFormulaMarker.finishFormula()}/>
