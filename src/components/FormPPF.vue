<template>
  <div>
  
      <v-form ref="form" v-model="form.valid" @submit.prevent="onSubmit">
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.fields.firstName"
                label="First name"
                :rules="form.rules.firstName"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.fields.lastName"
                label="Last name"
                :rules="form.rules.lastName"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                type="email" 
                v-model="form.fields.email"
                label="Email"
                :rules="form.rules.email"
              />
            </v-col>
          </v-row>
        </v-card-text> 

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="hide()">
            Cancel
          </v-btn>
          <v-btn type="submit" color="primary" :disabled="!form.valid">
            Save
          </v-btn>
        </v-card-actions>
      </v-form>
 
  </div>
</template>

<script>

export default {
  name: "FormPPF",
};
</script>

<style></style>
