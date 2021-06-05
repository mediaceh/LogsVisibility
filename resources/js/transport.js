
export const transport = {
    async getStudiesFilterOptions(name = '') {
        return Nova.request().get(`/api/nameofroute/studies?search=${name}`).then(response => response.data)
    },
    async setLogsVisibility(studyId,logsVisibility) {
        return Nova.request().post(`/api/nameofroute/logs-visibility/${studyId}`, {'logs':logsVisibility}).then(response => response.data)
    },
}
