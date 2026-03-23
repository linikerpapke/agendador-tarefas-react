import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export function parseBackendDate(dateString: string) {
    const [date, time] = dateString.split(" ")
    const [day, month, year] = date.split("-").map(Number)
    const [hour, minute, second] = time.split(":").map(Number)

    return new Date(year, month - 1, day, hour, minute, second)
}

export function formatDateTimeDisplay(dateString: string) {

    if (!dateString) {
        return null
    }

    const date = parseBackendDate(dateString)

    return {
        data: format(date, "dd/MM/yyyy", { locale: ptBR }),
        hora: format(date, "HH:mm")
    }
}

export function formatToInputDateTime(dateString: string) {
    const date = parseBackendDate(dateString)
    return format(date, "yyyy-MM-dd'T'HH:mm")
}

export function formatToBackend(dateTimeLocal: string) {
    const date = new Date(dateTimeLocal)
    return format(date, "dd-MM-yyyy HH:mm:ss")
}