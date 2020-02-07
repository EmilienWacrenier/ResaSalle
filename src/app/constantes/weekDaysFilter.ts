export const WEEK_DAYS_FILTER = (d: Date): boolean => {
    const day = d.getDay();
    // Empêche la selection du Samedi/Dimanche
    return day !== 0 && day !== 6;
}