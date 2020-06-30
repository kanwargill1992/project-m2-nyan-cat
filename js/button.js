class Button {
  constructor(root, xPos, yPos) {
    const btn = document.createElement("button");
    btn.style.position = "absolute";
    btn.style.left = xPos;
    btn.style.top = yPos;
    btn.style.zIndex = 1000;
    btn.style.backgroundColor = "#b53890";
    btn.style.color = "white";
    btn.style.border = "none";
    btn.style.font = "30px impact";
    btn.style.borderRadius = "5px";
    btn.innerText = "Reset";

    root.appendChild(btn);
  }
  //   reset() {
  //     location.reload();
  //   }
}
