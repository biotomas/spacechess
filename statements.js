const blueText = document.querySelector('#blue');
const greenText = document.querySelector('#green');
const redText = document.querySelector('#red');
const yellowText = document.querySelector('#yellow');
const cities = new Array();

function setBoardSprites(blue, green, red, yellow, scene) {
    scene.add(blue);
    scene.add(green);
    scene.add(red);
    scene.add(yellow);

    blue.position.x = -2.4;
    blue.position.y = 7.1;
    blue.position.z = 5;
    blue.scale.x = 5;
    blue.scale.y = 1;

    red.position.x = 2.4;
    red.position.y = 7.1;
    red.position.z = 5;
    red.scale.x = 5;
    red.scale.y = 1;

    green.position.x = -2.2;
    green.position.y = 5.5;
    green.position.z = 5;
    green.scale.x = 4.6;
    green.scale.y = 1;


    yellow.position.x = 2.2;
    yellow.position.y = 5.5;
    yellow.position.z = 5;
    yellow.scale.x = 4.6;
    yellow.scale.y = 1;

    for (let index = 0; index < geoData.length; index++) {
        cities.push(geoData[index].city);
    }
}

function setStatements(blue, green, red, yellow) {
    blueText.innerHTML = blue;
    greenText.innerHTML = green;
    redText.innerHTML = red;
    yellowText.innerHTML = yellow;
}

function randomStatements(wrongColor) {
    setStatements(randomFalseStatement(), randomCorrectStatement(), randomCorrectStatement(), randomCorrectStatement());
}

function randomCorrectStatement() {
    var pair = geoData[Math.floor(Math.random() * geoData.length)];
    return "Capital of " + pair.country + " is " + pair.city;
}

function randomFalseStatement() {
    var pair = geoData[Math.floor(Math.random() * geoData.length)];
    var city = cities[Math.floor(Math.random() * cities.length)];
    while (city == pair.city || (city.length + pair.country.length) > 24) {
        city = cities[Math.floor(Math.random() * cities.length)];
    }
    return "Capital of " + pair.country + " is " + city;
}

const geoData = [
    {
        "country": "Afghanistan",
        "city": "Kabul"
    },
    {
        "country": "Albania",
        "city": "Tirana"
    },
    {
        "country": "Algeria",
        "city": "Alger"
    },
    {
        "country": "American Samoa",
        "city": "Fagatogo"
    },
    {
        "country": "Andorra",
        "city": "Andorra la Vella"
    },
    {
        "country": "Angola",
        "city": "Luanda"
    },
    {
        "country": "Anguilla",
        "city": "The Valley"
    },
    {
        "country": "Argentina",
        "city": "Buenos Aires"
    },
    {
        "country": "Armenia",
        "city": "Yerevan"
    },
    {
        "country": "Aruba",
        "city": "Oranjestad"
    },
    {
        "country": "Australia",
        "city": "Canberra"
    },
    {
        "country": "Austria",
        "city": "Wien"
    },
    {
        "country": "Azerbaijan",
        "city": "Baku"
    },
    {
        "country": "Bahamas",
        "city": "Nassau"
    },
    {
        "country": "Bahrain",
        "city": "al-Manama"
    },
    {
        "country": "Bangladesh",
        "city": "Dhaka"
    },
    {
        "country": "Barbados",
        "city": "Bridgetown"
    },
    {
        "country": "Belarus",
        "city": "Minsk"
    },
    {
        "country": "Belgium",
        "city": "Brussel"
    },
    {
        "country": "Belize",
        "city": "Belmopan"
    },
    {
        "country": "Benin",
        "city": "Porto-Novo"
    },
    {
        "country": "Bermuda",
        "city": "Hamilton"
    },
    {
        "country": "Bhutan",
        "city": "Thimphu"
    },
    {
        "country": "Bolivia",
        "city": "La Paz"
    },
    {
        "country": "Bosnia and Herzegovina",
        "city": "Sarajevo"
    },
    {
        "country": "Botswana",
        "city": "Gaborone"
    },
    {
        "country": "Brazil",
        "city": "Brasília"
    },
    {
        "country": "Brunei",
        "city": "Bandar Seri Begawan"
    },
    {
        "country": "Bulgaria",
        "city": "Sofia"
    },
    {
        "country": "Burkina Faso",
        "city": "Ouagadougou"
    },
    {
        "country": "Burundi",
        "city": "Bujumbura"
    },
    {
        "country": "Cambodia",
        "city": "Phnom Penh"
    },
    {
        "country": "Cameroon",
        "city": "Yaound"
    },
    {
        "country": "Canada",
        "city": "Ottawa"
    },
    {
        "country": "Cape Verde",
        "city": "Praia"
    },
    {
        "country": "Cayman Islands",
        "city": "George Town"
    },
    {
        "country": "Chad",
        "city": "N'Djam"
    },
    {
        "country": "Chile",
        "city": "Santiago de Chile"
    },
    {
        "country": "China",
        "city": "Peking"
    },
    {
        "country": "Colombia",
        "city": "Santaf"
    },
    {
        "country": "Comoros",
        "city": "Moroni"
    },
    {
        "country": "Congo",
        "city": "Brazzaville"
    },
    {
        "country": "Cook Islands",
        "city": "Avarua"
    },
    {
        "country": "Costa Rica",
        "city": "San Jos"
    },
    {
        "country": "Croatia",
        "city": "Zagreb"
    },
    {
        "country": "Cuba",
        "city": "La Habana"
    },
    {
        "country": "Cyprus",
        "city": "Nicosia"
    },
    {
        "country": "Czech Republic",
        "city": "Praha"
    },
    {
        "country": "Denmark",
        "city": "Copenhagen"
    },
    {
        "country": "Djibouti",
        "city": "Djibouti"
    },
    {
        "country": "Dominica",
        "city": "Roseau"
    },
    {
        "country": "East Timor",
        "city": "Dili"
    },
    {
        "country": "Ecuador",
        "city": "Quito"
    },
    {
        "country": "Egypt",
        "city": "Cairo"
    },
    {
        "country": "El Salvador",
        "city": "San Salvador"
    },
    {
        "country": "England",
        "city": "London"
    },
    {
        "country": "Equatorial Guinea",
        "city": "Malabo"
    },
    {
        "country": "Eritrea",
        "city": "Asmara"
    },
    {
        "country": "Estonia",
        "city": "Tallinn"
    },
    {
        "country": "Ethiopia",
        "city": "Addis Abeba"
    },
    {
        "country": "Falkland Islands",
        "city": "Stanley"
    },
    {
        "country": "Faroe Islands",
        "city": "Tórshavn"
    },
    {
        "country": "Fiji Islands",
        "city": "Suva"
    },
    {
        "country": "Finland",
        "city": "Helsinki"
    },
    {
        "country": "France",
        "city": "Paris"
    },
    {
        "country": "French Guiana",
        "city": "Cayenne"
    },
    {
        "country": "French Polynesia",
        "city": "Papeete"
    },
    {
        "country": "Gabon",
        "city": "Libreville"
    },
    {
        "country": "Gambia",
        "city": "Banjul"
    },
    {
        "country": "Georgia",
        "city": "Tbilisi"
    },
    {
        "country": "Germany",
        "city": "Berlin"
    },
    {
        "country": "Ghana",
        "city": "Accra"
    },
    {
        "country": "Gibraltar",
        "city": "Gibraltar"
    },
    {
        "country": "Greece",
        "city": "Athenai"
    },
    {
        "country": "Greenland",
        "city": "Nuuk"
    },
    {
        "country": "Grenada",
        "city": "Saint George's"
    },
    {
        "country": "Guadeloupe",
        "city": "Basse-Terre"
    },
    {
        "country": "Guam",
        "city": "Aga"
    },
    {
        "country": "Guatemala",
        "city": "Ciudad de Guatemala"
    },
    {
        "country": "Guinea",
        "city": "Conakry"
    },
    {
        "country": "Guinea-Bissau",
        "city": "Bissau"
    },
    {
        "country": "Guyana",
        "city": "Georgetown"
    },
    {
        "country": "Haiti",
        "city": "Port-au-Prince"
    },
    {
        "country": "Honduras",
        "city": "Tegucigalpa"
    },
    {
        "country": "Hong Kong",
        "city": "Victoria"
    },
    {
        "country": "Hungary",
        "city": "Budapest"
    },
    {
        "country": "Iceland",
        "city": "Reykjav"
    },
    {
        "country": "India",
        "city": "New Delhi"
    },
    {
        "country": "Indonesia",
        "city": "Jakarta"
    },
    {
        "country": "Iran",
        "city": "Tehran"
    },
    {
        "country": "Iraq",
        "city": "Baghdad"
    },
    {
        "country": "Ireland",
        "city": "Dublin"
    },
    {
        "country": "Israel",
        "city": "Jerusalem"
    },
    {
        "country": "Italy",
        "city": "Roma"
    },
    {
        "country": "Ivory Coast",
        "city": "Yamoussoukro"
    },
    {
        "country": "Jamaica",
        "city": "Kingston"
    },
    {
        "country": "Japan",
        "city": "Tokyo"
    },
    {
        "country": "Jordan",
        "city": "Amman"
    },
    {
        "country": "Kazakhstan",
        "city": "Astana"
    },
    {
        "country": "Kenya",
        "city": "Nairobi"
    },
    {
        "country": "Kiribati",
        "city": "Bairiki"
    },
    {
        "country": "Kuwait",
        "city": "Kuwait"
    },
    {
        "country": "Kyrgyzstan",
        "city": "Bishkek"
    },
    {
        "country": "Laos",
        "city": "Vientiane"
    },
    {
        "country": "Latvia",
        "city": "Riga"
    },
    {
        "country": "Lebanon",
        "city": "Beirut"
    },
    {
        "country": "Lesotho",
        "city": "Maseru"
    },
    {
        "country": "Liberia",
        "city": "Monrovia"
    },
    {
        "country": "Liechtenstein",
        "city": "Vaduz"
    },
    {
        "country": "Lithuania",
        "city": "Vilnius"
    },
    {
        "country": "Macao",
        "city": "Macao"
    },
    {
        "country": "North Macedonia",
        "city": "Skopje"
    },
    {
        "country": "Madagascar",
        "city": "Antananarivo"
    },
    {
        "country": "Malawi",
        "city": "Lilongwe"
    },
    {
        "country": "Malaysia",
        "city": "Kuala Lumpur"
    },
    {
        "country": "Maldives",
        "city": "Male"
    },
    {
        "country": "Mali",
        "city": "Bamako"
    },
    {
        "country": "Malta",
        "city": "Valletta"
    },
    {
        "country": "Martinique",
        "city": "Fort-de-France"
    },
    {
        "country": "Mauritania",
        "city": "Nouakchott"
    },
    {
        "country": "Mauritius",
        "city": "Port-Louis"
    },
    {
        "country": "Mayotte",
        "city": "Mamoutzou"
    },
    {
        "country": "Mexico",
        "city": "Ciudad de M"
    },
    {
        "country": "Moldova",
        "city": "Chisinau"
    },
    {
        "country": "Monaco",
        "city": "Monaco-Ville"
    },
    {
        "country": "Mongolia",
        "city": "Ulan Bator"
    },
    {
        "country": "Montenegro",
        "city": "Podgorica"
    },
    {
        "country": "Montserrat",
        "city": "Plymouth"
    },
    {
        "country": "Morocco",
        "city": "Rabat"
    },
    {
        "country": "Mozambique",
        "city": "Maputo"
    },
    {
        "country": "Myanmar",
        "city": "Rangoon (Yangon)"
    },
    {
        "country": "Namibia",
        "city": "Windhoek"
    },
    {
        "country": "Nauru",
        "city": "Yaren"
    },
    {
        "country": "Nepal",
        "city": "Kathmandu"
    },
    {
        "country": "Netherlands",
        "city": "Amsterdam"
    },
    {
        "country": "New Caledonia",
        "city": "Noum"
    },
    {
        "country": "New Zealand",
        "city": "Wellington"
    },
    {
        "country": "Nicaragua",
        "city": "Managua"
    },
    {
        "country": "Niger",
        "city": "Niamey"
    },
    {
        "country": "Nigeria",
        "city": "Abuja"
    },
    {
        "country": "Niue",
        "city": "Alofi"
    },
    {
        "country": "Norfolk Island",
        "city": "Kingston"
    },
    {
        "country": "North Korea",
        "city": "Pyongyang"
    },
    {
        "country": "Norway",
        "city": "Oslo"
    },
    {
        "country": "Oman",
        "city": "Masqat"
    },
    {
        "country": "Pakistan",
        "city": "Islamabad"
    },
    {
        "country": "Palau",
        "city": "Koror"
    },
    {
        "country": "Palestine",
        "city": "Gaza"
    },
    {
        "country": "Panama",
        "city": "Ciudad de Panam"
    },
    {
        "country": "Paraguay",
        "city": "Asunci"
    },
    {
        "country": "Peru",
        "city": "Lima"
    },
    {
        "country": "Philippines",
        "city": "Manila"
    },
    {
        "country": "Pitcairn",
        "city": "Adamstown"
    },
    {
        "country": "Poland",
        "city": "Warszawa"
    },
    {
        "country": "Portugal",
        "city": "Lisboa"
    },
    {
        "country": "Puerto Rico",
        "city": "San Juan"
    },
    {
        "country": "Qatar",
        "city": "Doha"
    },
    {
        "country": "Reunion",
        "city": "Saint-Denis"
    },
    {
        "country": "Romania",
        "city": "Bucuresti"
    },
    {
        "country": "Russia",
        "city": "Moscow"
    },
    {
        "country": "Rwanda",
        "city": "Kigali"
    },
    {
        "country": "Saint Helena",
        "city": "Jamestown"
    },
    {
        "country": "Saint Lucia",
        "city": "Castries"
    },
    {
        "country": "Samoa",
        "city": "Apia"
    },
    {
        "country": "San Marino",
        "city": "San Marino"
    },
    {
        "country": "Saudi Arabia",
        "city": "Riyadh"
    },
    {
        "country": "Scotland",
        "city": "Edinburgh"
    },
    {
        "country": "Senegal",
        "city": "Dakar"
    },
    {
        "country": "Serbia",
        "city": "Belgrade"
    },
    {
        "country": "Seychelles",
        "city": "Victoria"
    },
    {
        "country": "Sierra Leone",
        "city": "Freetown"
    },
    {
        "country": "Singapore",
        "city": "Singapore"
    },
    {
        "country": "Slovakia",
        "city": "Bratislava"
    },
    {
        "country": "Slovenia",
        "city": "Ljubljana"
    },
    {
        "country": "Solomon Islands",
        "city": "Honiara"
    },
    {
        "country": "Somalia",
        "city": "Mogadishu"
    },
    {
        "country": "South Africa",
        "city": "Pretoria"
    },
    {
        "country": "South Korea",
        "city": "Seoul"
    },
    {
        "country": "South Sudan",
        "city": "Juba"
    },
    {
        "country": "Spain",
        "city": "Madrid"
    },
    {
        "country": "Sudan",
        "city": "Khartum"
    },
    {
        "country": "Suriname",
        "city": "Paramaribo"
    },
    {
        "country": "Swaziland",
        "city": "Mbabane"
    },
    {
        "country": "Sweden",
        "city": "Stockholm"
    },
    {
        "country": "Switzerland",
        "city": "Bern"
    },
    {
        "country": "Syria",
        "city": "Damascus"
    },
    {
        "country": "Tajikistan",
        "city": "Dushanbe"
    },
    {
        "country": "Tanzania",
        "city": "Dodoma"
    },
    {
        "country": "Thailand",
        "city": "Bangkok"
    },
    {
        "country": "Togo",
        "city": "Lomé"
    },
    {
        "country": "Tokelau",
        "city": "Fakaofo"
    },
    {
        "country": "Tonga",
        "city": "Nuku'alofa"
    },
    {
        "country": "Tunisia",
        "city": "Tunis"
    },
    {
        "country": "Turkey",
        "city": "Ankara"
    },
    {
        "country": "Turkmenistan",
        "city": "Ashgabat"
    },
    {
        "country": "Tuvalu",
        "city": "Funafuti"
    },
    {
        "country": "Uganda",
        "city": "Kampala"
    },
    {
        "country": "Ukraine",
        "city": "Kyiv"
    },
    {
        "country": "United Kingdom",
        "city": "London"
    },
    {
        "country": "United States",
        "city": "Washington"
    },
    {
        "country": "Uruguay",
        "city": "Montevideo"
    },
    {
        "country": "Uzbekistan",
        "city": "Toskent"
    },
    {
        "country": "Vanuatu",
        "city": "Port-Vila"
    },
    {
        "country": "Venezuela",
        "city": "Caracas"
    },
    {
        "country": "Vietnam",
        "city": "Hanoi"
    },
    {
        "country": "Wales",
        "city": "Cardiff"
    },
    {
        "country": "Wallis and Futuna",
        "city": "Mata-Utu"
    },
    {
        "country": "Western Sahara",
        "city": "El-Aai"
    },
    {
        "country": "Yemen",
        "city": "Sanaa"
    },
    {
        "country": "Zambia",
        "city": "Lusaka"
    },
    {
        "country": "Zimbabwe",
        "city": "Harare"
    }
]