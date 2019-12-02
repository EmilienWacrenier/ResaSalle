export const BOOKING_HOURS: number[] = [
    8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18
]

export const BOOKING_MINUTES: number[] = [
    0, 30
]

export const RECURRENCE: string[] = [
    "quotidienne", "hebdomadaire", "mensuelle", "annuelle"
] 

export const NUMERO_SEMAINE: string[] = [
    "première", "deuxième", "troisième", "quatrième"
] 

export const JOUR_SEMAINE: string[] = [
    "lundi", "mardi", "mercredi", "jeudi", "vendredi"
]

export const CAPACITE: number[] = [
    4, 6, 8
]

export const HOURS_PLANNING: string[] = [
    "8", "8:30", 
    "9", "9:30", 
    "10", "10:30", 
    "11", "11:30", 
    "12", "12:30", 
    "13", "13:30", 
    "14", "14:30",
    "15", "15:30",
    "16", "16:30",
    "17", "17:30"
]

export class ApiConstants {
    public readonly apiUrl: string = 'http://localhost:3000/';
    public readonly toastrTitle: string = 'ResaSalles';
    public readonly toastrOptions: any = {
        closeButton: true,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: 'toast-top-right',
        preventDuplicates: false,
        onclick: close,
        showDuration: 300,
        hideDuration: 1000,
        timeOut: 2000,
        extendedTimeOut: 1000,
        showEasing: 'swing',
        hideEasing: 'linear',
        showMethod: 'fadeIn',
        hideMethod: 'fadeOut'
      };
}