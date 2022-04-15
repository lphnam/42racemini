<template>
  <v-container fluid>
    <v-layout row wrap>
      <Heading :title="$t('login.TITLE')" />
      <Description :description="$t('login.DESCRIPTION')" />
      <v-flex xs12 sm6 offset-sm3>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(submit)">
            <v-layout column>
              <v-flex text-xs-center mt-5 mb-3>
                <SubmitButton :buttonText="$t('login.LOGIN')" />
              </v-flex>
            </v-layout>
          </form>
        </ValidationObserver>
      </v-flex>
      <ErrorMessage />
    </v-layout>
  </v-container>
</template>

<script>
import router from '@/router'
import { mapActions } from 'vuex'

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('login.TITLE')} - %s`
    }
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['userLogin']),
    async submit() {
      await this.userLogin()
    }
  },
  created() {
    if (this.$store.state.auth.isTokenSet) {
      router.push({ name: 'home' })
    }
  }
}
</script>
