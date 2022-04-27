<script lang="ts">
  import { beforeUpdate } from "svelte";

  beforeUpdate(() => {
    fn();
  });

  export let fn: () => void;
</script>
