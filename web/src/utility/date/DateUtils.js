class DateUtils {
    getYMD() {
        const date = new Date()
        return `${date.getUTCFullYear()}/${date.getUTCMonth()}/${date.getUTCDate()}`
    }

    formatDate(date) {
        const dt = new Date(date)
        const day = (dt.getUTCDate()).toString().padStart(2, "0")
        const month = (dt.getUTCMonth() + 1).toString().padStart(2, "0")

        return `${day}/${month}/${dt.getUTCFullYear()}`
    }

    formatDateWithTime(date) {
        const dt = new Date(date)
        const day = (dt.getUTCDate()).toString().padStart(2, "0")
        const month = (dt.getUTCMonth() + 1).toString().padStart(2, "0")
        const hours = (dt.getHours()).toString().padStart(2, "0")
        const minutes = (dt.getMinutes() + 1).toString().padStart(2, "0")

        return `${day}/${month}/${dt.getUTCFullYear()} às ${hours}:${minutes}`
    }
}

export default new DateUtils()