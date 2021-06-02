const express = require("express");
const app = express();
app.use(express.json()); //isso para garantir o tratamento do json

// Permissões, senão colocar pode ser que não 
// funcione com o cliente
var cors = require('cors');
app.use(cors());

// Porta que eu estou ouvindo, o primeiro é pro heroku e o segundo é pra usar no pc
app.listen(process.env.PORT || 3000);


// strings para o banco de dados
const Arjuna = '{ "name":"Arjuna", "type":"Forest", "about":"Arjuna was born in the Himalayas in India in 1982 Ever since, he has had a unique and interesting journey through life. He grew up in Goa, the mecca of psy trance, where he saw the birth and evolution of this mystical genre." }';
const Maramba = '{ "name":"Maramba", "type":"Darkpsy/Hitech/ChillOut", "about":"Marambá is the psychedelic trance project of João Alexandre, a brazilian musician also responsible for the projects Shaumbra (with Tyamat), Woruban (with Necropsycho), Atmos Moon (Ambient with Necropsycho) and Namu (solo Psychill/Ambient project)." }';
const DarkWhisper = '{ "name":"DarkWhisper", "type":"Darkpsy", "about":"As to describe the Dark Whisper s soundscape, the use of both analogue and digital instruments are used with a psychedelic influence fusing with ethnic cultures and frequencies to activate inner states of memory consciousness allowing the listener to explore the cymatic body, mind and spirit tuning, while conveying a message to the humanity on the whole." }';
const Lulio = '{ "name":"Lulio", "type":"Forest/Darkpsy", "about":"From the countryside of Brazil emerges LULiO , a project formed by brothers Luciano and Julio. LULiO is based on a multidimensional quantic equational madness." }';
const Tyndra = '{ "name":"Tyndra", "type":"Hitech", "about":" born in Barcelona in 1987, had her first connection with music through the violin when she was 10 years old, later on at the age of 12 she started listening to electronic music and after a few years she came across Psychedelic Trance music and straight away loved the sound of it. In 2005 she started djing Psytrance and then she moved to the United Kingdom (London) and started to play in the London Psytrance scene.In 2008 she decided to go deeper and started to study Music production at the London School of Sound and a Music Technology Specialist BA (Hons) in the University of West London.)" }';
const OnkelDunkel  = '{ "name":"OnkelDunkel ", "type":"Forest", "about":"Onkel Dunkel is the musical alter ego of Monno, producer, mastering engineer, synth lover and sound designer.Born and raised in Denmark, he has been involved with music one way or another since his late teens. First as a bass player at the age of 17, but the introduction to Psychedelic Trance lead to him ditching his bass and getting into computers and synthesizers."}';
const Mubali = '{"name" : "Mubali", "type":"Forest/Westpsy/Darkpsy", "about":""}';
const Organoise = '{ "name":"Organoise", "type":"Hitech", "about":" ATIM AND DUGGAH TEAMED UP TO REBIRTH THE PROJECT. THEY’VE BEEN ROCKING FOR A DECADE NOW HAVING BEEN AT IT SINCE 2007. WE’RE PROUD TO ANNOUNCE THAT AFTER MANY V.A RELEASES THEY HAVE FINALLY RELEASED THEIR DEBUT FULL LENGTH ALBUM… AND IT’S EVERYTHING WE HAD HOPED IT WOULD BE.South African Hi-tech Psy act, One half of the "Organoise" Duo. Representing ZuluTunes & Damaru Records." }';
const PeakPilots = '{ "name":"PeakPilots", "type":"Hitech", "about":"PEAK PILOTS IS A COLLABORATION PROJECT BETWEEN ORGANOISE (ATIM & DUGGUH) AND NATURAL DISASTER. FILLING A MUCH NEEDED GAP IN THE 150S TO 160S BPM RANGES THE ACT WAS DESIGNED AS BRIDGE BETWEEN TRADITIONAL DARK PSY AND HI-TECH. IT’S SUPER GROOVY, ULTRA TEXTUREY AND LOADS OF FUN. EXPECT WARM ROLLING BASELINES AND LOTS OF TECHNICAL GLITCHY DETAILS ROUNDED OFF WITH DEEP ATMOSPHERICS." }';


// array simulando um banco de dados, com os objetos Json
const psytrance= [ JSON.parse(Arjuna), 
                  JSON.parse(Maramba),
                  JSON.parse(DarkWhisper),
                  JSON.parse(Lulio),
                  JSON.parse(Tyndra),
                  JSON.parse(OnkelDunkel),
                  JSON.parse(Mubali),
                  JSON.parse(Organoise),
                  JSON.parse(PeakPilots)

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
