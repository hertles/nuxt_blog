<template>
  <v-app id="inspire">
    <v-app-bar flat>
      <v-container class="fill-height d-flex align-center">

        <v-btn
            variant="text"
        >
          <h1>Зенковъ</h1>
        </v-btn>

        <v-spacer></v-spacer>
        <v-btn rounded><v-icon>mdi-moon</v-icon></v-btn>
        <v-responsive max-width="260">
          <v-text-field
              density="compact"
              hide-details
              variant="solo"
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list rounded="lg">
                <v-list-item
                    v-for="n in 5"
                    :key="n"
                    link
                >
                  <v-list-item-title>
                    List Item {{ n }}
                  </v-list-item-title>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item
                    link
                    color="grey-lighten-4"
                >
                  <v-list-item-title>
                    Refresh
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet
                min-height="70vh"
                rounded="lg"
            >
              <div class="container">
                <slot/>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>

</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
