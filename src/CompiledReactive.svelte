<script lang="ts">
  import { getContext } from 'svelte';
  import { GET_SUBSCRIBERS } from './use';
  import RunInTemplate from './RunInTemplate.svelte';
  import ManualFormulaMarker from './ManulFormulaMarker';

  const getSubscribers = getContext(GET_SUBSCRIBERS) as () => Set<() => void>;
  const manualFormulaMarker = ManualFormulaMarker.create(getSubscribers);
</script>

<RunInTemplate fn={() => manualFormulaMarker.startFormula()}/>
<slot/>
<RunInTemplate fn={() => manualFormulaMarker.finishFormula()}/>
