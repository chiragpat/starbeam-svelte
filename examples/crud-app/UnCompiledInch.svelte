<script>
  import { use } from '@starbeam/svelte';
  import InchCounter from './InchCounter';

  export let tag;

  let inches = use(InchCounter);
</script>

<p>{tag}: {$inches.description.current}</p>
<button on:click={$inches.increment}>Increment</button>
