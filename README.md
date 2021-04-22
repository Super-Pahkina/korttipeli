# Elintarvikepeli

Elintarvikepeli on ryhmätyönä toteutettu mobiilipeli, joka on toteutettu keväällä 2021 Haaga-Helian kurssilla Ohjelmointiprojekti 2.

Peli hyödyntää Terveyden ja hyvinvoinnin laitos [Finelin](https://fineli.fi/fineli/fi/ohje/19) dataa.

Halusimme luoda pelin, joka olisi samaan aikaan opettavainen ja hauska. Käyttäjä oppii tekoälyä vastaan pelatessaan millaisia ravintosisältöjä eri tuotteilla on.

## Pelin kulku

### Pelin asetukset
Käyttäjä aloittaa pelaamisen valitsemalla pelin asetuksista vuoroajan pituuden, voittoon tarvittavat pisteet ja pelattavan kategorian. 

// selventävä KUVA RUUDUSTA joss näkyy kategoriat

### Pakan valinta
Käyttäjä siirtyy pakanvalintasivulle, jossa on mahdollisuus valita ruudulla olevista vaihtoehdoista elintarvikekortteja omaan pakkaan tai arpoa pelattavat kortit.

// KUVa  pakanvalinnasta
### Käyttäjän vuoro
Peli alkaa käyttäjän vuorolla, jonka aikana hän voi valita pakastaan pelattavan elintarvikekortin. Valitusta kortista valitaan ravintoarvo, joka todennäköisimmin on suurempi kuin vastustajalla. 

Ravintoarvot: suola, energia (kilokalorit), rasva, proteiini, hiilihydraatti, sokeri, kuitu. 

// kuva käyttäjän vuorosta

### Kierroksen tulos
Ruudulle tulostuu pelatun kierroksen tulos. Ruudun yläosassa näkyy vastustajan kortti. Käyttäjän pelaama kortti on ruudun alaosassa. Jokaisen ravintoarvon perään tulostuu värillinen ikoni kuvaamaan, oliko kortilla oleva kyseinen ravintoarvo suurempi, pienempi tai yhtäsuuri kuin vastustajalla.

Käyttäjä saa pisteen mikäli käyttäjän kortilla oleva valittu ravintoarvo on suurempi tai yhtäsuuri kuin vastustajalla.

// kuva kierroksen tulossivusta
 ### Vastustajan vuoro
Vuoro siirtyy vastustajalle. Ruudun yläreunaan tulostuu vastustajan valitsema ravintoarvokategoria.
Käyttäjä valitsee omasta pakastaan mielestään sopivimman kortin pelattavaksi vastustajan valitsemaa kategoriaa vastaan.
// kuva vastustajan vuorosta
Peli siirtyy kierroksen tulossivulle. Peli jatkuu vuorotellen käyttäjän ja vastustajan vuoroilla, kunnes alussa asetettu voittopistemäärä on saavutettu.

## Erikoiskortit
Pelissä on kahdenlaisia erikoiskortteja.

### Timanttikortti
Timanttikortissa yksi tai useampi ravintoarvo on huomattavasti keskimääräistä korkeampi, joten voittotodennäköisyys on suuri. Jos kierroksen häviää pelattuaan timanttikortin, vastustaja saa ylimääräisen pisteen. 

Timanttikortin tunnistaa elintarvikkeen nimen edessä olevasta timantti-ikonista.

### Lumikortti
Lumikortissa kaikki ravintoarvot ovat keskimääräistä alhaisemmat, joten voittotodennäköisyys on pieni. Jos kierroksen voittaa pelattuaan lumikortin, käyttäjä saa ylimääräisen pisteen. 
// kuva ikonista?

Lumikortin tunnistaa elintarvikkeen nimen edessä olevasta lumihiutaleikonista. 

//kuva ikonista?


## Sovelluksen rakenne

Peli on rakennettu React Nativella, ja se toimii Androidissa ja iPhonessa. Mongo Db Node.js

Peliä voit kokeilla.... osoite?

Backend löytyy osoitteesta: `https://elintarvikepeli.herokuapp.com/`.
Se tarjoaa rajapinnan 