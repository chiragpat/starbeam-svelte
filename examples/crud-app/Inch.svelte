<script>
  import InchCounter from './InchCounter';
  import { CompiledReactive, use } from '@starbeam/svelte';

  export let tag;

  let inches = use(InchCounter);
</script>
<CompiledReactive>
  <p>{tag}: {$inches.description.current}</p>
  <button on:click={$inches.increment}>Increment</button>
</CompiledReactive>
