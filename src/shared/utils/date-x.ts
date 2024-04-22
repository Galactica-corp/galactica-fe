import { DateObjectUnits, DateTime } from "luxon";

export type DateXInput = Date | DateObjectUnits | DateTime | number | string;

// TODO: maybe it will be better to remove this
class DateX {
  DMY = "dd.LL.yyyy";

  createDT(input: DateXInput, fromFmt?: string): DateTime {
    if (DateTime.isDateTime(input)) return input;

    if (typeof input === "string" && fromFmt) {
      DateTime.fromFormat(input, fromFmt);
    }

    if (typeof input === "string") {
      return DateTime.fromISO(input);
    }

    if (input instanceof Date) {
      return DateTime.fromJSDate(input);
    }

    if (typeof input === "number") {
      return DateTime.fromMillis(input);
    }

    return DateTime.fromObject(input);
  }

  toDMY(input: DateXInput, fromFmt?: string) {
    const dt = this.createDT(input, fromFmt);
    return dt.toFormat(this.DMY);
  }
  toISO(input: DateXInput, fromFmt?: string) {
    const dt = this.createDT(input, fromFmt);
    return dt.toISO();
  }
}

export const dateX = new DateX();
