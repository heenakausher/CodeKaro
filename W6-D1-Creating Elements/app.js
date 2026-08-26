
function changecolor() {
    let colors = ["fuchsia", "red", "turquoise", "blue", "green", "yellow", "blueviolet", "lavender",
                 "pink", "purple", "orange", "maroon", "gray", "olive", "orchid" ];

    let randomIndex = Math.floor(Math.random() * colors.length);

    document.body.style.backgroundColor = colors[randomIndex];
}