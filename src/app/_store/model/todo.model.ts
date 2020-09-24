export default class ToDo {
  title: string;
  detail: string;
  date: string;

  constructor(title: string, detail: string, date: string) {
    this.title = title;
    this.detail = detail;
    this.date = date;
  }
}
