<template>
  <div>
    <h1>WORDS</h1>
    <div class="ui divider"></div>
    <table id="words" class="ui celled compact table">
      <thead>
        <tr>
          <th><i class="uk flag"></i> English</th>
          <th><i class="germany flag"></i> German</th>
          <th><i class="vn flag"></i> Vietnamese</th>
          <th colspan="3"></th>
        </tr>
      </thead>
      <tbody>
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
        <tr>
          <td colspan="3" class="center aligned"><b>Total words:</b></td>
          <td colspan="3" class="center aligned">
            <b>{{ words.length }}</b>
          </td>
        </tr>
      </tbody>
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

#words {
  width: 100%;
  margin-top: 25px;
  border-radius: 10px;
  overflow: hidden;
}

tr:hover {
  background-color: #f1f1f1;
}

a:hover {
  color: blue;
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
