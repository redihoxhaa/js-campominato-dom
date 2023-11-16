# CAMPO MINATO DOM

#### CONSEGNA DELL'ESERCIZIO 

```
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. 

Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.

In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).

Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

Superbonus 1
Quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle.

Superbonus 2
Quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste.
```

---

#### SVOLGIMENTO

Cominciamo con il creare una funzione che crea in base alla difficoltà scelta, 16 bombe, il cui valore varia da 1 a n, in cui n è rappresentato dalle celle create in relazione alla difficoltà. Utilizzeremo il ciclo for all'interno della funzione. Ogni volta che verrà generato un numero, verrà inserito in un array delle bombe, ma solo se non è già presente. Per capire se la cella cliccata è corrispondende ad una bomba, ci basterà confrontare l'innerHTML della cella, con i valori presenti nell'array bombe. Faremo terminare la partita quando l'utente clicca una bomba con il display di un messaggio di gameover, oppure quando le celle cliccate saranno le celle generate - 16. Per decretare il punteggio ci basterà contare i click effettuati sulle nostre celle; per evitare un doppio click anche su una cella azzurra, decideremo se disattivarla o se pushare i valori in un array di celle selezionate e aggiungere un punto solo se il valore innerHTML è presente nell'array.

- Superbonus 1 -
Possiamo creare un overlay nero trasparente al 50% da appendere alla fine del main in modo che non si possa cliccare niente tranne play. Dovremo quindi andare a modificare la funzione di play andando a togliere visibilità a questo layer che verrà visualizzato grazie ad un aggiunta di classe nel momento in cui clicchiamo una bomba.

- Superbonus 2 -
Per rendere possibile questo comportamente allora invece di far colorare solo la cella di una bomba selezionata dovremo aggiungere la classe a sfondo rosso a tutte le bombe. Senza aver svolto l'esercizio ho difficoltà ad immaginare come implementare questa funzione perché non sono ancora sicuro sull'architettura del programma.

_Considerazioni post esercizio_

