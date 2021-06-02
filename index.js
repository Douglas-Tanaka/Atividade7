const express = require("express");
const app = express();
app.use(express.json()); //isso para garantir o tratamento do json

// Permissões, senão colocar pode ser que não 
// funcione com o cliente
var cors = require('cors');
app.use(cors());

// Porta que eu estou ouvindo, o primeiro é pro heroku e o segundo é pra usar no pc
app.listen(process.env.PORT || 3000);


const Arjuna = '{ "name":"Arjuna", "type":"Forest", "about":"Arjuna was born in the Himalayas in India in 1982 Ever since, he has had a unique and interesting journey through life. He grew up in Goa, the mecca of psy trance, where he saw the birth and evolution of this mystical genre." }';
const Maramba = '{ "name":"Maramba", "type":"Darkpsy/Hitech/ChillOut", "about":"Marambá is the psychedelic trance project of João Alexandre, a brazilian musician also responsible for the projects Shaumbra (with Tyamat), Woruban (with Necropsycho), Atmos Moon (Ambient with Necropsycho) and Namu (solo Psychill/Ambient project)." }';
const DarkWhisper = '{ "name":"DarkWhisper", "type":"Darkpsy", "about":"As to describe the Dark Whisper s soundscape, the use of both analogue and digital instruments are used with a psychedelic influence fusing with ethnic cultures and frequencies to activate inner states of memory consciousness allowing the listener to explore the cymatic body, mind and spirit tuning, while conveying a message to the humanity on the whole." }';
const Lulio = '{ "name":"Lulio", "type":"Forest/Darkpsy", "about":"From the countryside of Brazil emerges LULiO , a project formed by brothers Luciano and Julio. LULiO is based on a multidimensional quantic equational madness." }';
const Tyndra = '{ "name":"Tyndra", "type":"Hitech", "about":" born in Barcelona in 1987, had her first connection with music through the violin when she was 10 years old, later on at the age of 12 she started listening to electronic music and after a few years she came across Psychedelic Trance music and straight away loved the sound of it. In 2005 she started djing Psytrance and then she moved to the United Kingdom (London) and started to play in the London Psytrance scene.In 2008 she decided to go deeper and started to study Music production at the London School of Sound and a Music Technology Specialist BA (Hons) in the University of West London.)" }';
const Charizard  = '{ "name":"Charizard ", "type":"Fire/Flying", "about":"It spits fire that is hot enough to melt boulders. It may cause forest fires by blowing flames." }';
const Squirtle = '{ "name":"Squirtle", "type":"Water", "about":"When it retracts its long neck into its shell, it squirts out water with vigorous force." }';
const Wartortle = '{ "name":"Wartortle", "type":"Water", "about":"It is recognized as a symbol of longevity. If its shell has algae on it, that Wartortle is very old." }';
const Blastoise  = '{ "name":"Blastoise ", "type":"Water", "about":"It crushes its foe under its heavy body to cause fainting. In a pinch, it will withdraw inside its shell." }';


// array simulando um banco de dados, com os objeto Json
const pokedex = [ JSON.parse(Arjuna), 
                  JSON.parse(Maramba),
                  JSON.parse(DarkWhisper),
                  JSON.parse(Lulio),
                  JSON.parse(Tyndra),
                  JSON.parse(Charizard),
                  JSON.parse(Squirtle),
                  JSON.parse(Wartortle),
                  JSON.parse(Blastoise)
];
// novo endpoint com uma explicação inicial
app.get('/',
    function(req, res){
        res.send("Olá esse é o Backend do Bruno Miguel e da Maria Eduarda, fizemos um banco de dados baseado em Pokemon. Nosso banco de dados é um Pokedex com os nove primeiros Pokemons da Região de Kanto."); 
    }
);

// novo endpoint com o banco de dados
app.get('/pokedex',
    function(req, res){
        res.send(pokedex.filter(Boolean)); //isso é pra tratar os valores q aparecem como
                                             //null, que são lidos como boleano
    }
);

// arrumando os indeces do arry para facilitar interface para o usuario
app.get('/pokedex/:id',
    function(req, res){
        const id = req.params.id - 1;
        const pokedexs = pokedex[id];

        if (!pokedexs){
            res.send("Pokemon não encontrado");
        } else {
            res.send(pokedexs);
        }
    }
)
// usando o verbo post
app.post('/pokedex', 
    (req, res) => {
        console.log(req.body.pokedexs); // codigo para receber a mensagem 
        const pokedexs = req.body.pokedexs;
        pokedex.push(pokedexs); // vai colocar a nova mensgem no banco de dados, quando atualizar o localhost vai aparecer
                                 // a mensagem adicionada ao banco de dados, no caso um array
        res.send("Pokemon adicionado")
    }
);
// trocar algo antigo por algo novo
app.put('/pokedex/:id',
    (req, res) => {
        const id = req.params.id - 1;
        const pokedexs = req.body.pokedexs;
        pokedex[id] = pokedexs;        
        res.send("Pokemon atualizado com sucesso.")
    }
)

app.delete('/pokedex/:id', 
    (req, res) => {
        const id = req.params.id - 1;
        delete pokedex[id];

        res.send("Pokemon removido com sucesso");
    }
);
