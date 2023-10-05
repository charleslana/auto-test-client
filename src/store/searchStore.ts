import { defineStore } from 'pinia';

interface State {
  searchTerm: string;
}

export const useSearchStore = defineStore('search', {
  state: (): State => ({
    searchTerm: ''
  }),
  actions: {
    setSearchTerm(term: string) {
      this.searchTerm = term;
    }
  }
});
