<script setup lang="ts">

interface Props {
    pokemon: Pokemon,
    isShown: boolean,
    index: number
}
const { pokemon, isShown, index } = defineProps<Props>()
const name = computed(() => pokemon.name)
const image = computed(() => pokemon.sprites.front_default)

</script>
<template>
    <li @click="$emit('showCard')" class="card" :class="{ 'shown': isShown }">
        <label :for="name + '-' + index"><input type="checkbox" :name="name + '-' + index" id="" :disabled="isShown"
                :checked="isShown" />
            <div class="content">
                <div class="back">
                    <NuxtImg src="/back.png" alt="Back of a pokemon card" class="back-cover" />
                </div>
                <div class="front">
                    <NuxtImg width="160" height="222" :src="`/frontTypes/${pokemon.types[0].type.name}.png`"
                        alt="Back of a pokemon card" class="back-cover" />
                    <p class="name">{{ pokemon.name }}</p>
                    <div :class="`pokemon-wrapper ${pokemon.types[0].type.name}`">
                        <NuxtImg class="image" width="120" height="120" :src="image" :alt="pokemon.name" />
                    </div>
                </div>

            </div>
        </label>
    </li>
</template>
<style>
.card {
    position: relative;
    height: 100%;
    list-style: none;
    max-width: 10rem;
    max-height: 13.875rem;
    width: 100%;
}

.content {
    position: absolute;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    transition: transform 1s;
    transform-style: preserve-3d;
}

.card.shown .content {
    transform: rotateY(180deg);
    transition: transform 0.5s;
}

.front,
.back {
    border-radius: .5rem;
    position: absolute;
    height: 100%;
    width: 100%;
    color: #03446A;
    text-align: center;
    backface-visibility: hidden;
    display: grid;
    align-items: center;
    justify-content: center;
    justify-items: center;
}

.back {
    height: 75%;
    cursor: pointer;
}

.front {
    color: white;
    transform: rotateY(180deg);

}

.back-cover {
    display: block;
    max-width: 100%;
}

label {
    position: absolute;
    width: 100%;
    height: 100%;

    input {
        height: 0;
        position: absolute;
        width: 0;
        margin: 0;
        z-index: -9999;
    }
}

.pokemon-wrapper {
    position: absolute;
    background: rgb(255, 255, 255);
    background: linear-gradient(0deg,
            rgba(255, 255, 255, 1) 16%,
            rgba(110, 110, 110, 1) 100%);
    width: 8.3rem;
    height: 8.3rem;
    top: 0;
    clip-path: inset(1.4rem 0rem 1.5rem 0rem);

    .image {
        width: 100%;
        height: 100%;
        transform: scale(0.7);
    }

}

.name {
    position: absolute;
    top: 5px;
    margin: 0;
    color: black;
    font-size: .75rem;
    font-family: monospace;
    background-color: rgba(255, 255, 255, .4);
    padding: 1px;
    text-transform: capitalize;
}
</style>