<script lang="ts">
  import People from './People.svelte';
  import { SYSTEM_LOCALE, LOCALES, formatLocale } from './intl';

  let locale = SYSTEM_LOCALE;
</script>

<div>
  <label>
    <span>My Locale</span>
    <select bind:value={locale}>
      {#each LOCALES as l (l)}
         <option value={l}>
          {formatLocale(l).full}
        </option>
      {/each}
    </select>
  </label>
</div>
<main>
  <People locale={locale}/>
</main>
