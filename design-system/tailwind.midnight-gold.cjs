// Tailwind theme extension for FBets Midnight Gold.
// Merge this into the existing config; no Tailwind config was present in the repo.
const colors = {
 gold: {50:"#fff9e9",100:"#fdf0c9",200:"#f7dfa2",300:"#efce78",400:"#e8c365",500:"#d9ad4d",600:"#b8903a",700:"#8e6c2c",800:"#654c25",900:"#403019",950:"#241a0e"},
 ink: {50:"#f5f4f7",100:"#e5e3ea",200:"#cbc8d4",300:"#aaa6b6",400:"#898596",500:"#6c6879",600:"#514e5e",700:"#3b3947",800:"#282732",900:"#1a1a24",950:"#0b0b10"},
 emerald: {50:"#e8fbf1",100:"#c9f5dc",200:"#9de9c1",300:"#6cdaa2",400:"#3dca83",500:"#20ad6b",600:"#168653",700:"#126944",800:"#104f36",900:"#0e3829",950:"#071f18"},
 ruby: {50:"#fff0f1",100:"#ffd9dd",200:"#ffb3bd",300:"#f98595",400:"#e95b70",500:"#cf3c55",600:"#b3203a",700:"#8c1b30",800:"#681827",900:"#47131e",950:"#2a0b12"},
 live: {50:"#eef7ff",100:"#d9edff",200:"#b8dcff",300:"#8bc5ff",400:"#69b2ff",500:"#4798ed",600:"#3279c5",700:"#285d98",800:"#20456f",900:"#19304c",950:"#0d1c2d"}
};
const midnightGoldTheme = {
 colors: {...colors, brand:{gold:"#e2b857",goldDeep:"#b8903a",champagne:"#f3dfa2"}, semantic:{win:"#2fcb7e",loss:"#e95b70",live:"#69b2ff",warning:"#f0b95a",info:"#8bc5ff",suspended:"#8a8793"}},
};
module.exports = { theme: { extend: midnightGoldTheme } };
