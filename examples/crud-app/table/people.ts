import type { Row, Table, Query } from './';

export interface Person {
  name: string;
  location: string;
}

export class People {
  #table: Table<Person>;
  #query: Query<Person>;

  constructor(table: Table<Person>, query = table.query()) {
    this.#table = table;
    this.#query = query;
  }

  get table(): Table<Person> {
    return this.#table;
  }

  get rows(): Row<Person>[] {
    return this.#query.rows;
  }

  sort(column: keyof Person, locale: string): People {
    const collator = new Intl.Collator(locale);
    const query: Query<Person> = this.#query.sort((a, b) =>
      collator.compare(a[column], b[column])
    );

    return new People(this.#table, query);
  }

  filter(text: string): People {
    const query: Query<Person> = this.#query.filter(
      (row) => row.name.includes(text) || row.location.includes(text)
    );

    return new People(this.#table, query);
  }
}
