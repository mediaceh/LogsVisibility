<template>
    <div>
        <div class="mb-3">
            <div>Study</div>
            <a-select
                :value="studyFilter"
                class="w-1/3"
                placeholder="Type to search"
                :default-active-first-option="false"
                :show-arrow="false"
                show-search
                :disabled='isStudyFilterDisabled'
                :filter-option="false"
                :loading="isStudyFilterLoading"
                @change="value => changeFilter(value)"
                @search="searchStudyFilter"
                @focus="() => searchStudyFilter('')"
            >
                <a-select-option v-for="item in studyFilterOptions" :title="item.value" :key="item.id">{{item.value}}</a-select-option>
            </a-select>
        </div>
        <a-checkbox-group 
            v-model="logsVisibility" 
            :disabled="isLogsVisibilityDisabled" 
            :options="logTypeFilterOptions" 
            @change="changeLogsVisibility"
        />
    </div>
</template>

<script>
import {VUEX_NAMESPACE} from "../consts";

export default {
    methods: {
        changeFilter(value) {
            this.$store.dispatch(`${VUEX_NAMESPACE}/setStudyCurrentValue`, value);
        },
        searchStudyFilter: _.debounce(function(value) {
            this.$store.dispatch(`${VUEX_NAMESPACE}/getStudiesFilterOptions`, value);
        }, 500),
        changeLogsVisibility(value) {
            this.$store.dispatch(`${VUEX_NAMESPACE}/changeLogsVisibility`, value)
        },
    },
    computed: {
        studyFilter() {
            return this.$store.state[VUEX_NAMESPACE].studyFilter.currentValue;
        },
        studyFilterOptions() {
            return this.$store.state[VUEX_NAMESPACE].studyFilter.options;
        },
        isStudyFilterLoading() {
            return this.$store.state[VUEX_NAMESPACE].studyFilter.isLoading;
        },
        isStudyFilterDisabled() {
            return this.$store.state[VUEX_NAMESPACE].updatingLogsVisibility;
        },
        isLogsVisibilityDisabled() {
            return this.$store.getters[`${VUEX_NAMESPACE}/logsVisibilityDisabled`];
        },
        logTypeFilterOptions() {
            return this.$store.getters[`${VUEX_NAMESPACE}/logTypeFilterOptions`];
        },
        logsVisibility() {
            return this.$store.getters[`${VUEX_NAMESPACE}/logsVisibility`];
        },
    }
}
</script>

<style>
.ant-checkbox-group-item {
    display: block;
}
</style>
