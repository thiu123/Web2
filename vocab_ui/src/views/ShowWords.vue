<template>
  <div>
    <h1>SHOW WORD</h1>
    <div class="container">
      <div class="ui labeled input fluid input-spacing custom_input">
        <div class="ui label"><i class="germany flag"></i> German</div>
        <input type="text" readonly :value="word.german" />
      </div>
      <div class="ui labeled input fluid">
        <div class="ui label"><i class="united kingdom flag"></i> English</div>
        <input type="text" readonly :value="word.english" />
      </div>
      <div class="ui labeled input fluid">
        <div class="ui label"><i class="vn flag"></i>Vietnamese</div>
        <input type="text" readonly :value="word.vietnamese" />
      </div>
      <div class="actions">
        <router-link
          :to="{ name: 'edit', params: { id: this.$route.params.id } }"
        >
          Edit word
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "../helpers/helpers";

export default {
  data() {
    return {
      word: "",
    };
  },
  async mounted() {
    try {
      this.word = await api.getWord(this.$route.params.id);
    } catch (error) {
      console.error("Error fetching word:", error);
    }
  },
};
</script>
<style scoped>
.container {
  max-width: 1000px;
  margin: auto;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #f0f0f0;
}

.custom_input {
  margin-bottom: 20px;
}

.ui.labeled.input {
  margin-bottom: 15px;
}

.input-spacing {
  margin-bottom: 10px;
}

.input-field {
  border-radius: 5px;
  border: 1px solid #dcdcdc;
  padding: 10px;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.input-field:focus {
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
  outline: none;
}

.actions {
  margin-top: 20px;
}

.actions a {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.actions a:hover {
  text-decoration: underline;
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
h1 {
  color: #007bff;
}
</style>
