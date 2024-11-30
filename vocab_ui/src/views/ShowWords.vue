<template>
  <div>
    <h1>SHOW WORD</h1>
    <div class="ui divider"></div>
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
        <button class="primary ui button">
          <router-link
            :to="{ name: 'edit', params: { id: this.$route.params.id } }"
          >
            Edit word
          </router-link>
        </button>
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
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.ui.labeled.input {
  margin-bottom: 20px;
}

.input-spacing {
  margin-bottom: 10px;
}

button a {
  color: white;
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
