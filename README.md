# ResaSalle

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.14.

## Inventaire des components

| Component              | Description                                            |
| :--------------------: | :----------------------------------------------------: |
| authlayout.component   | Composant qui gère la connexion et l'enregistrement de l'utilisateur |
| userlayout.component          | *à faire*                                       |
| bookingcalendar.component     | *à définir*                                     |
| bookingdetails.component      | *à définir*                                     |
| bookingsearch.component       | *à définir*                                     |
| delete-confirmation.component | *à définir*                                     |
| edit-booking.component        | *à définir*                                     |
| edit-room.component           | *à définir*                                     |
| admin.component               | Composant qui concerne toute la gestion de l'administration des salles. Possible d'ajouter/modifier/supprimer une salle sur ses différents critères (nom, zone, capacité) |
| confirm.component             | Composant qui confirme la création de compte et qu'il est maintenant possible de se connecter |
| dashboard.component           | Composant qui concerne la gestion des réservations de l'utilisateur. Chacune des réservations présente tous ses critères (date, début, fin, salle, sujet, participants). Il est possible de modifier ou de supprimer ses réservations |
| home.component                | Composant concernant la page d'accueil. Il permet d'afficher l'emploi du temps actuel de chaque salle. Ce qui permet d'avoir une vue rapide et globale des salles |
| room-planning.component       | Composant qui suit celui de la page d'accueil. Il concerne tout l'emploi du temps d'une salle définie en fonction de la date |
| search.component              | Composant qui concerne le stepper de la page Recherche. Rechercher les disponibilités des salles en foncntion de la date avec récurrence ou non et de la capacité |
| navbar.component              | Concerne la barre supérieure avec le nom de l'utilisateur |
| sidebar.component             | Composant de la barre à gauche qui contient le logo, et les différentes pages de navigation (Accueil, Dashboard, Rechercher, Admin) |

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
