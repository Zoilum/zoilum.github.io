<script setup lang="ts">
const FIRST_GEN_POKEMONS_COUNT = 151;
const SECOND_GEN_POKEMONS_COUNT = FIRST_GEN_POKEMONS_COUNT + 100;
const THIRD_GEN_POKEMONS_COUNT = SECOND_GEN_POKEMONS_COUNT + 135;

const showedCards = useState<string[]>('showedCards', () => [])
const pairedCards = useState<[string, string][]>('pairedCards', () => [])
const sortedPokemons = useState<Pokemon[]>('sortedPokemons', () => [])

// Fetch random pokemons
const { data, status, error, refresh, pending } = await useAsyncData("pokemons", async () => {
  const pokemons = await Promise.all([
    $fetch(
      `https://pokeapi.co/api/v2/pokemon/${getRandomInt(
        SECOND_GEN_POKEMONS_COUNT
      )}`
    ),
    $fetch(
      `https://pokeapi.co/api/v2/pokemon/${getRandomInt(
        SECOND_GEN_POKEMONS_COUNT
      )}`
    ),
    $fetch(
      `https://pokeapi.co/api/v2/pokemon/${getRandomInt(
        SECOND_GEN_POKEMONS_COUNT
      )}`
    ),
    $fetch(
      `https://pokeapi.co/api/v2/pokemon/${getRandomInt(
        SECOND_GEN_POKEMONS_COUNT
      )}`
    ),
  ]);
  return pokemons;
});

const { data: compliment, refresh: getNewCompliment } = useAsyncData("compliment", async () => {
  return $fetch('https://8768zwfurd.execute-api.us-east-1.amazonaws.com/v1/compliments')
})

//Validate fetch pokemons response
const pokemons = computed(() => { return isPokemonArray(data.value) ? [...data.value, ...data.value] : [] }
);
const gameWon = computed(() => pairedCards.value.flat().length === pokemons.value.length)

const elapsedTime = ref(0)
const timer = ref()

const restartGame = async () => {
  elapsedTime.value = 0
  pairedCards.value = []
  refresh()
  getNewCompliment()
}

const handleShowCard = (cardId: string) => {
  if (showedCards.value.length === 2 ||
    cardId === showedCards.value[0] ||
    pairedCards.value.some(pair => pair.includes(cardId))) return
  if (showedCards.value.length === 1) {
    showedCards.value = [showedCards.value[0], cardId]
    return
  }
  showedCards.value = [cardId]
  if (elapsedTime.value) return
  timer.value = setInterval(() => elapsedTime.value = elapsedTime.value + 1000, 1000)
}

watch([status, pokemons], ([status, pokemons]) => {
  if (status !== 'success' || !pokemons.length) sortedPokemons.value = []
  sortedPokemons.value = pokemons.sort(() => 0.5 - Math.random())
})


watch(showedCards, async cards => {
  if (!cards[0] || !cards[1]) return
  if (cards[0].slice(0, -2) === cards[1].slice(0, -2)) {
    pairedCards.value = [...pairedCards.value, [cards[0], cards[1]]]
    showedCards.value = []
  } else {
    await new Promise(() => setTimeout(() => showedCards.value = [], 750))
  }
})

watch(gameWon, () => {
  if (!gameWon) return
  clearInterval(timer.value)
})

</script>

<template>
  <div v-if="!pending && sortedPokemons.length">
    <p class="timer">{{ convertToDigitalClock(elapsedTime) }}</p>
    <ul class="game-grid">
      <Card v-for="pokemon, index in sortedPokemons" :pokemon="pokemon" :index="index"
        @show-card="() => handleShowCard(`${pokemon.name}-${index}`)"
        :isShown="showedCards.includes(`${pokemon.name}-${index}`) || pairedCards.some(pair => pair.includes(`${pokemon.name}-${index}`))"
        </Card>
    </ul>
  </div>
  <div v-else>
    <GameStatusManager :status="status"></GameStatusManager>
  </div>
  <div v-if="gameWon" class="win">
    <Victory @restart-game="restartGame" :elapsedTime="elapsedTime"
      :compliment="!!compliment ? compliment.toString() : 'Loading compliment...'"></Victory>
  </div>

</template>

<style>
* {
  box-sizing: border-box;
}
html {
  font-family: fantasy;
  width: 100dvw;
  overflow: hidden;
}
html,body, #__nuxt, #__layout, #__nuxt > div:first-of-type {
  height:100%!important;
  width: 100%!important;
}
html,
body,
ul {
  margin: 0;
  padding: 0;
}
ul {
  height: 100%;
  padding: 4rem 0;
  box-sizing: border-box;
  overflow-y: scroll;
  @media screen and (min-width: 688px) {
    align-content: center;
  }
}
h1 {
  margin: 0;
}

body {
  background: linear-gradient(
    90deg,
    rgba(14, 0, 255, 0.9037990196078431) 0%,
    rgba(255, 0, 0, 0.923406862745098) 100%
  );
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}


.game-grid {
  max-width: 100%;
  max-height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  justify-items: center;
  gap: 1rem;
  max-width: 745px;
  margin: auto;
}

.timer {
  text-align: center;
  left: 0;
  right: 0;
  margin: auto;
  width: 100%;
  position: fixed;
  background: rgba(255, 255, 255, .1);
  padding: .5rem 0;
  color: white;
  z-index: 2;
  font-family: monospace;
}
</style>
