<template>
    <div class="report-btn">
        <p class="text-in-btn">Report bug</p>
        <i class="pi pi-pencil"></i>
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    setup() {
        
    },
})
</script>

<style scoped>
    .report-btn{
        box-sizing: border-box;
        position: fixed;
        right: -50px;
        top: calc(50% - 20px);
        transform: rotate(-90deg);
        z-index: 999;
        background-color: red;
        max-width: 135px;
        height: 55px;
        text-align: center;
        color: white;
        border-radius: 10px 10px 0 0;
        box-shadow: -5px 0 20px -7px rgba(0, 0, 0, 0.5);
        cursor: pointer;
        transition: .2s ease;
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: flex-start;
    }
    .report-btn:hover{
        right: -45px;
    }
    .report-btn .text-in-btn,
    .report-btn .pi{
        height: 25px;
    }
    .report-btn .pi{
        align-items: center;
        display: flex;
        margin-left: 10px;
    }
</style>