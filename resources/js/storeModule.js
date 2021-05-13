import {transport} from "./transport";
import {
    LOG_TYPE_1,
    LOG_TYPE_2,
    LOG_TYPE_3,
    LOG_TYPE_4,
    LOG_TYPE_5,
    LOG_TYPE_6,
    LOG_TYPE_7,
    LOG_TYPE_8,
    LOG_TYPE_9,
    LOG_TYPE_10,
    LOG_TYPE_11,
    LOG_TYPE_12,
    LOG_TYPE_13,
    LOG_TYPE_14,
} from "./consts";

export default {
    namespaced: true,
    state: () => ({
        updatingLogsVisibility: false,
        studyFilter: {
            currentValue: undefined,
            options: [],
            logsVisibility: {},
            isLoading: false
        },
    logTypeFilter: {
            generalOptions: [
                {value: LOG_TYPE_1, label: 'Log name 1'},
                {value: LOG_TYPE_2, label: 'Log name 2'},
                {value: LOG_TYPE_3, label: 'Log name 3'},
                {value: LOG_TYPE_4, label: 'Log name 4'},
                {value: LOG_TYPE_5, label: 'Log name 5'},
                {value: LOG_TYPE_6, label: 'Log name 6'},
                {value: LOG_TYPE_7, label: 'Log name 7'},
                {value: LOG_TYPE_8, label: 'Log name 8'},
                {value: LOG_TYPE_9, label: 'Log name 9'},
                {value: LOG_TYPE_10, label: 'Log name 10'},
                {value: LOG_TYPE_11, label: 'Log name 11'},
                {value: LOG_TYPE_12, label: 'Log name 12'},
                {value: LOG_TYPE_13, label: 'Log name 13'},
                {value: LOG_TYPE_14, label: 'Log name 14'},
            ],

        },
    }),
    mutations: {
        tryGetStudyOptions(state) {
            state.studyFilter.isLoading = true;
        },
        successGetStudyOptions(state, data) {
            state.studyFilter.options = data;
            state.studyFilter.isLoading = false;
        },
        successGetLogsVisibility(state, data) {
            state.studyFilter.logsVisibility = data;
        },
        failGetStudyOptions(state) {
            state.studyFilter.isLoading = false;
        },
        setStudyCurrentValue(state, value) {
            state.studyFilter.currentValue = value;
        },
        changeVisibility (state, value) {
            state.updatingLogsVisibility = true;
            state.studyFilter.logsVisibility[state.studyFilter.currentValue] = value;
        },
        successUpdateLogsVisibility(state) {
            state.updatingLogsVisibility = false;
        },
        failUpdateLogsVisibility(state) {
            // do nothing or rollback last action may be
        },
    },
    actions: {
        async getStudiesFilterOptions({commit,state}, name) {
            try {
                commit('tryGetStudyOptions');
                const {data : {data}} = await transport.getStudiesFilterOptions(name);
                var logsVisibility = {};
                var logFilterOptions = [];
                state.logTypeFilter.generalOptions.forEach(function(item, i, arr) {
                    logFilterOptions.push(item.value);
                });
                data.forEach(function(item, i, arr) {
                    var filterArr = item.logs_visibility.map(i => (i.log_id));
                    logsVisibility[item.id] = logFilterOptions.filter(value => !filterArr.includes(value));
                });
                commit('successGetStudyOptions', data.map(i => ({id: i.id, value: i.name})));
                commit('successGetLogsVisibility', logsVisibility);
            } catch (e){
                commit('failGetStudyOptions');
            }
        },
        changeLogsVisibility({commit,dispatch}, value) {
            commit('changeVisibility', value)
            dispatch('updateLogsVisibility');
        },
        async updateLogsVisibility({commit,state}) {
            try {
                var logFilterOptions = [];
                state.logTypeFilter.generalOptions.forEach(function(item, i, arr) {
                    logFilterOptions.push(item.value);
                });
                await transport.setLogsVisibility(state.studyFilter.currentValue,logFilterOptions.filter(value => !state.studyFilter.logsVisibility[state.studyFilter.currentValue].includes(value)));
                commit('successUpdateLogsVisibility');
            } catch (e){
                commit('failUpdateLogsVisibility');
            }
        },
        setStudyCurrentValue({commit}, value) {
            commit('setStudyCurrentValue', value);
        },
    },
    getters: {
        studyFilterOptions: state => state.studyFilter.options,
        logTypeFilterOptions: state => state.logTypeFilter.generalOptions,
        logsVisibility: state => state.studyFilter.logsVisibility[state.studyFilter.currentValue],
        logsVisibilityDisabled: state => state.updatingLogsVisibility || !state.studyFilter.currentValue,
    }
}