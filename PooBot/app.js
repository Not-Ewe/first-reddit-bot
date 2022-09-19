require('dotenv').config();

const { CommentStream } = require('snoostorm');
const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');

// Build Snoowrap and Snoostorm clients
const client = new Snoowrap({
	userAgent: 'a bot to comment about the word poo',
	clientId: 'ArDOX-F2_RB27Tg5n0Gx_A',
	clientSecret: '25E0NirGYTrXOfdiyIOx7UnSZTj_vw',
	username: 'boopboopbeepboopbop',
	password: 'remember1'
});


// Configure options for stream: subreddit & results per query
const streamOpts = {
    subreddit: 'testingground4bots',
    results: 25
};

const BOT_START = Date.now() / 1000;

//Keyword that bot searches for
const canSummon = (msg) => {
    return msg && msg.toLowerCase().includes('poo');
};

// Create a Snoostorm CommentStream with the specified options
const comments = new CommentStream(client, { 
    subreddit: "testingground4bots", 
    limit: 10,
    pollTime: 10000});

let itemList = new Array();

comments.on('item', (item) => {
    if(item.created_utc < BOT_START) return;
    if(!canSummon(item.body)) return;
    if(itemList.some(items => items == item.created)) return;

    item.reply("Here I is");
    itemList.push(item.created);
    console.log(itemList);
    
    });