<template>
  <div>
    <h1>WORDS</h1>
    <table id="words" class="ui celled compact table">
      <thead>
        <tr>
          <th>English</th>
          <th>German</th>
          <th>Vietnamese</th>
          <th colspan="3"></th>
        </tr>
      </thead>
      <tr v-for="(word, i) in words" :key="i">
        <td>{{ word.english }}</td>
        <td>{{ word.german }}</td>
        <td>{{ word.vietnamese }}</td>
        <td width="75" class="center aligned">
          <router-link :to="{ name: 'show', params: { id: word._id } }"
            >Show</router-link
          >
        </td>
        <td width="75" class="center aligned">
          <router-link :to="{ name: 'edit', params: { id: word._id } }"
            >Edit</router-link
          >
        </td>
        <td
          width="75"
          class="center aligned"
          @click.prevent="onDelete(word._id)"
        >
          <a :href="`/words/${word._id}`">Delete</a>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { api } from "../helpers/helpers";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  data() {
    return {
      words: [],
    };
  },
  async mounted() {
    try {
      this.words = await api.getWords();
    } catch (error) {
      console.error("Error fetching words:", error);
    }
  },
  methods: {
    async onDelete(id) {
      const sure = window.confirm("Are you sure you want to delete?");
      if (!sure) return;
      await api.deleteWord(id);
      toast.success("Word deleted successfully!", {
        autoClose: 1000,
      });
      this.words = this.words.filter((word) => word._id !== id);
    },
  },
};
</script>

<style scoped>
h1 {
  color: #007bff;
}

table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
  background-color: #fff;
}

th {
  background-color: #007bff;
  color: white;
  font-weight: bold;
}

tr:hover {
  background-color: #f1f1f1;
}

a {
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s;
}

a:hover {
  color: blue;
}

.center.aligned {
  text-align: center;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

div {
  animation: fadeIn 0.5s;
}
</style>
