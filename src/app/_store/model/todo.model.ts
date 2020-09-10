export default class ToDo {
    title: string;
    detail: string;
    date: Date;

    constructor(title: string, detail: string, date: Date) {
        this.title = title;
        this.detail = detail;
        this.date = date;
    }
}
