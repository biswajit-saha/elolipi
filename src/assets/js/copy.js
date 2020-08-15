//Copy Text JS

function CopyToClipboard(containerid) {
  if (document.selection) {
    var range = document.body.createTextRange();
    range.moveToElementText(document.getElementById(containerid));
    range.select().createTextRange();
    document.execCommand("copy");
  } else if (window.getSelection) {
    var range = document.createRange();
    range.selectNode(document.getElementById(containerid));
    window.getSelection().addRange(range);
    document.getElementById("status").innerHTML = "কপি করা হয়েছে";
    document.execCommand("copy");
    }
}

function copyActive() {
  document.getElementById("status").innerHTML = "কপি করুন";
  document.getElementById('copybtn').style.display='block';
}
