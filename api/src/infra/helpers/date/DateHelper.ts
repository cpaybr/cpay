import dayjs from "dayjs";

class DateHelper {
    public now(): Date {
        return new Date(dayjs().format('YYYY-MM-DD hh:mm'));
    }

    public add(amount: number, unit: dayjs.OpUnitType): Date {
        return new Date(dayjs().add(amount, unit).format('YYYY-MM-DD hh:mm'));
    }

    public subtract(amount: number, unit: dayjs.OpUnitType): Date {
        return new Date(dayjs().subtract(amount, unit).format('YYYY-MM-DD hh:mm'));
    }

    public isBefore(date: Date): boolean {
        return dayjs().isBefore(date);
    }
}

export default new DateHelper();
