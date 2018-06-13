var gProjs = [
    {
        "id": "sokoban",
        "name": "Sokoban",
        "title": "Better push those boxes",
        "desc": "lorem ipsum lorem ipsum lorem ipsum",
        "url": "projs/sokoban",
        "publishedAt": 1448693940000,
        "labels": ["Matrixes", "keyboard events"],
    },
    {
        "id": "calc",
        "name": "Calculator",
        "title": "Basic Calculator",
        "desc": "Badic calculator in development",
        "url": "projs/calc",
        "publishedAt": 1448693940000,
        "labels": ["Matrixes", "keyboard events"],
    },
    {
        "id": "sweeper",
        "name": "Mines Sweeper",
        "title": "The Best Game",
        "desc": "classic game everyone likes",
        "url": "projs/sweeper",
        "publishedAt": 1448693940000,
        "labels": ["game", "mouse events"],
    }
]

function getProjsForDisplay() {
    return gProjs;
}

function getProjByIdx(idx) {
    return gProjs[idx];
}