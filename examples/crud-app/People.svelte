<script lang="ts">
  import { Cell } from '@starbeam/reactive';
  import { use, CompiledReactive } from '@starbeam/svelte';
  import { Table } from './table';
  import { People, type Person } from './table/people';

  function append(e: SubmitEvent) {
    const form = e.currentTarget as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form)) as {
      name: string;
      location: string;
    };

    $people.table.append(data);
    form.reset();
  }

  const people = use(() => {
    let table = new Table<Person>(['name', 'location']);
    table.append({ name: 'Tom Dale', location: 'NYC' });
    table.append({ name: 'Chirag Patel', location: 'NYC' });
    table.append({ name: 'Yehuda Katz', location: 'Portland' });
    table.append({ name: 'Ärne Ärni', location: 'Germany' });
    return new People(table);
  });

  const filter = use(() => {
    return Cell('');
  });

  function query(locale) {
    return $people.filter($filter.current).sort('name', locale);
  }

  let total;
  $: {
    let filteredCount = query(locale).rows.length;
    let totalCount = $people.table.rows.length;

    if (filteredCount === totalCount) {
      total = `items: ${totalCount}`;
    } else {
      total = `items: ${filteredCount} filtered / ${totalCount} total`;
    }
  }

  export let locale;
</script>

<CompiledReactive>
<details>
  <summary>Create a new user</summary>
  <form on:submit|preventDefault={append}>
    <label>
      <span>Name</span>
      <input type="text" name="name" required>
    </label>
    <label>
      <span>Location</span>
      <input type="text" name="location" required>
    </label>
    <button type="submit">append</button>
  </form>
</details>
<label>
  <span>Filter</span>
  <input type="text" value={$filter.current} on:input={(e) => $filter.set(e.target.value)}/>
</label>
<table>
  <thead>
    <tr>
      {#each $people.table.columns as column}
        <th>{column}</th>
      {/each}
      <th>
        <button on:click={() => $people.table.clear()}>✂️</button>
      </th>
    </tr>
  </thead>
  <tbody>
    {#each query(locale).rows as person (person.id)}
      <tr>
        <td>{person.name}</td>
        <td>{person.location}</td>
        <td>
          <button on:click={() => $people.table.delete(person.id)}>✂️</button>
        </td>
      </tr>
    {/each}
    <tr>
      <td colspan="3">{total}</td>
    </tr>
  </tbody>
</table>
</CompiledReactive>
