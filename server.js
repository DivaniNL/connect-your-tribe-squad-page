// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';

// Je kunt de volgende URLs uit onze API gebruiken:
// - https://fdnd.directus.app/items/tribe
// - https://fdnd.directus.app/items/squad
// - https://fdnd.directus.app/items/person
// En combineren met verschillende query parameters als filter, sort, search, etc.
// Gebruik hiervoor de documentatie van https://directus.io/docs/guides/connect/query-parameters
// En de oefeningen uit https://github.com/fdnd-task/connect-your-tribe-squad-page/blob/main/docs/squad-page-ontwerpen.md

// Haal alle eerstejaars squads uit de WHOIS API op van dit jaar (2024–2025)
const squadResponse = await fetch('https://fdnd.directus.app/items/squad?filter={"_and":[{"cohort":"2425"},{"tribe":{"name":"FDND Jaar 1"}}]}')

// Lees van de response van die fetch het JSON object in, waar we iets mee kunnen doen
const squadResponseJSON = await squadResponse.json()

// Controleer de data in je console (Let op: dit is _niet_ de console van je browser, maar van NodeJS, in je terminal)
// console.log(squadResponseJSON)

const foodResponse = await fetch("https://fdnd.directus.app/items/person/?filter[fav_kitchen][_neq]=null&sort=fav_kitchen&groupBy=fav_kitchen");
const foodResponseJSON = await foodResponse.json();


// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine('liquid', engine.express()); 

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')

// Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({extended: true}))


// Om Views weer te geven, heb je Routes nodig
// Maak een GET route voor de index

const list_randomInt1G = [25 ,144 ,145 ,146 ,147 ,148 ,149 ,69 ,150 ,152 ,151 ,153 ,154 ,155 ,156 ,157 ,158 ,65 ,159 ,160 ,161 ,162 ,80 ,163 ,164 ,43 ,165 ,71 ,166 ,167];
function randomInt1G(){ 
  return list_randomInt1G[Math.floor(Math.random() * list_randomInt1G.length)];
} 


app.get('/', async function (request, response) {
  // Haal alle personen uit de WHOIS API op, van dit jaar
  const personResponse = await fetch('https://fdnd.directus.app/items/person/?sort=name&fields=*,squads.squad_id.name,squads.squad_id.cohort&filter={"_and":[{"squads":{"squad_id":{"tribe":{"name":"FDND Jaar 1"}}}},{"squads":{"squad_id":{"cohort":"2425"}}},{"squads":{"squad_id":{"name":"1G"}}}]}&fields=id,name,avatar,nickname,bio,fav_color')

  // En haal daarvan de JSON op
  const personResponseJSON = await personResponse.json()
  
  // personResponseJSON bevat gegevens van alle personen uit alle squads van dit jaar
  // Je zou dat hier kunnen filteren, sorteren, of zelfs aanpassen, voordat je het doorgeeft aan de view

  // Render index.liquid uit de views map en geef de opgehaalde data mee als variabele, genaamd persons
  // Geef ook de eerder opgehaalde squad data mee aan de view
  response.render('index.liquid', {persons: personResponseJSON.data, squads: squadResponseJSON.data, dishes: foodResponseJSON.data})
})

app.get('/random', async function (request, response) {
  
  const randomInt = randomInt1G();
  // Haal alle personen uit de WHOIS API op, van dit jaar
  const personResponse = await fetch('https://fdnd.directus.app/items/person/' + randomInt + '?fields=id,name,avatar,nickname,bio,fav_color')
  // En haal daarvan de JSON op
  const personResponseJSON = await personResponse.json()

  // personResponseJSON bevat gegevens van alle personen uit alle squads van dit jaar
  // Je zou dat hier kunnen filteren, sorteren, of zelfs aanpassen, voordat je het doorgeeft aan de view

  // Render index.liquid uit de views map en geef de opgehaalde data mee als variabele, genaamd persons
   
  response.render('random.liquid', {persons: personResponseJSON.data, squads: squadResponseJSON.data, dishes: foodResponseJSON.data, random: true})
});

app.get('/gerecht', async function (request, response) {
  // Haal alle personen uit de WHOIS API op, van dit jaar
  const personResponse = await fetch('https://fdnd.directus.app/items/person/?sort=name&fields=*,squads.squad_id.name,squads.squad_id.cohort&filter={"_and":[{"squads":{"squad_id":{"tribe":{"name":"FDND Jaar 1"}}}},{"squads":{"squad_id":{"cohort":"2425"}}},{"squads":{"squad_id":{"name":"1G"}}}]}&fields=id,name,avatar,nickname,bio,fav_color')

  // En haal daarvan de JSON op
  const personResponseJSON = await personResponse.json()
  
  // personResponseJSON bevat gegevens van alle personen uit alle squads van dit jaar
  // Je zou dat hier kunnen filteren, sorteren, of zelfs aanpassen, voordat je het doorgeeft aan de view

  // Render index.liquid uit de views map en geef de opgehaalde data mee als variabele, genaamd persons
  // Geef ook de eerder opgehaalde squad data mee aan de view
  response.render('index.liquid', {persons: personResponseJSON.data, squads: squadResponseJSON.data, dishes: foodResponseJSON.data})
})

// Maak een POST route voor de index; hiermee kun je bijvoorbeeld formulieren afvangen
app.post('/', async function (request, response) {
  // Je zou hier data kunnen opslaan, of veranderen, of wat je maar wilt
  // Er is nog geen afhandeling van POST, redirect naar GET op /
  response.redirect(303, '/')
})


// Maak een GET route voor een detailpagina met een route parameter, id
// Zie de documentatie van Express voor meer info: https://expressjs.com/en/guide/routing.html#route-parameters
app.get('/student/:id', async function (request, response) {
  // Gebruik de request parameter id en haal de juiste persoon uit de WHOIS API op
  const personDetailResponse = await fetch('https://fdnd.directus.app/items/person/' + request.params.id)
  // En haal daarvan de JSON op
  const personDetailResponseJSON = await personDetailResponse.json()
  
  // Render student.liquid uit de views map en geef de opgehaalde data mee als variable, genaamd person
  // Geef ook de eerder opgehaalde squad data mee aan de view
  response.render('student.liquid', {person: personDetailResponseJSON.data})
})


// Maak een GET route voor een detailpagina met een route parameter, id
// Zie de documentatie van Express voor meer info: https://expressjs.com/en/guide/routing.html#route-parameters
app.get('/gerecht/:fav_kitchen', async function (request, response) {
  // Gebruik de request parameter id en haal de juiste personen uit de WHOIS API op
  const gerechtFilterResponse = await fetch('https://fdnd.directus.app/items/person/?filter={"fav_kitchen":{"_icontains":"' + request.params.fav_kitchen + '"}}&fields=id,name,avatar,nickname,bio,fav_color,fav_kitchen');
  const your_fav_dish = request.params.fav_kitchen;
  // En haal daarvan de JSON op
  const gerechtFilterResponseJSON = await gerechtFilterResponse.json()
  // Render gerecht.liquid uit de views map en geef de opgehaalde data mee als variable, genaamd persons en dishes
  // Geef ook de eerder opgehaalde squad data mee aan de view


  //Persons: alle personen met het juiste favoriete gerecht
  // Dishes, een lijst met alle gerechten die minsens een keer zijn gekozen. Deze wordt gebruikt om de select options te vullen.
  response.render('gerecht.liquid', {persons: gerechtFilterResponseJSON.data, dishes: foodResponseJSON.data, fav: your_fav_dish})
})


app.get('/search/:name', async function (request, response) {
  // Gebruik de request parameter id en haal de juiste persoon uit de WHOIS API op
  const searchResponse = await fetch('https://fdnd.directus.app/items/person/?filter={"name":{"_contains":"' + request.params.name + '"}}');
  // En haal daarvan de JSON op
  const searchResponseJSON = await searchResponse.json()
  
  // Render student.liquid uit de views map en geef de opgehaalde data mee als variable, genaamd person
  // Geef ook de eerder opgehaalde squad data mee aan de view
  response.render('index.liquid', {persons: searchResponseJSON.data})
})







// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})
