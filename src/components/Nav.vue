<template>
   <div>
            <img src="@/assets/file-invoice-dollar-solid.png"/>
        </div>
</template>

<script>

export default{
    name: 'nav', 
}

</script>

<style lang="scss" scoped>

header {
    background-color: rgba(8, 66, 37, 0.342);
    flex-direction: row;
    z-index: 99; 
    @media(min-width: 900px) {
        border-radius: 0 10px 10px 0;
        min-height: 100%;
        min-width: 90px;
        flex-direction: column;
    }  
.content {
    padding: 15px;
    background-color:rgba(24, 112, 11, 0.644);
    border-radius: 0 15px 15px 0;
    justify-content: center;
    @media(min-width: 900px) {
        width:100%;
    } 
}
}
img{
    width: 49%;
    height: auto;
    margin: 70% 0 0 70%;
}
</style>