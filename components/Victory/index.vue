<script setup lang="ts">
const emit = defineEmits(['restartGame'])

interface Props {
    elapsedTime: number
    compliment: string
}

const { elapsedTime, compliment } = defineProps<Props>()

</script>
<template>
    <h1>Game completed in: <br /> {{ convertMS(elapsedTime) }}</h1>
    <h2>{{ compliment }}</h2>
    <button @click="$emit('restartGame')" class="button">
        RESTART GAME
    </button>
</template>
<style>
.win {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    margin-top: 30px;
    padding: 20px 0;
    position: absolute;
    z-index: 1;
    background: white;
    width: 100%;
    margin: auto;
    border-radius: 16px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    text-align: center;
    bottom: 0;
    box-shadow: 0px 11px 11px 0px rgba(0, 0, 0, 0.2);
    @media screen and (min-width: 600px) {
        width: 80%;
        height: 240px;
        max-width: 720px;
    }
    .image {
        max-width: 90%;
        margin-bottom: 30px;
    }

    .button {
        box-shadow: 3px 4px 0px 0px #8a2a21;
        background: linear-gradient(to bottom, #c62d1f 5%, #f24437 100%);
        background-color: #c62d1f;
        border-radius: 18px;
        border: 1px solid #d02718;
        display: inline-block;
        cursor: pointer;
        color: #ffffff;
        font-family: Arial;
        font-size: 17px;
        padding: 12px 30px;
        font-weight: bold;
        text-decoration: none;
        text-shadow: 0px 1px 0px #810e05;

        &:hover {
            background: linear-gradient(to bottom, #f24437 5%, #c62d1f 100%);
            background-color: #f24437;
        }

        &:active {
            position: relative;
            top: 1px;
        }
    }
}
</style>