Vue.component('filter-comp',{
    props:[],
    template:`
    <form action="#" @submit.prevent='$root.FilterGoods($parent.searchLine)' class="search-form">
                        <a @click="$root.FilterGoods($parent.searchLine)" href="#"><img class="header__search"
                                                                          src="img/search.svg"
                                                                          alt="search">
                        </a>
                        <input type="text" class="search-field" v-model="$parent.searchLine">
                    </form>
    `
})