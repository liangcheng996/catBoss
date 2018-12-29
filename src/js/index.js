var xhr = new XMLHttpRequest();
xhr.onload = function(res) {
    var lists = document.querySelector(".list");
    var data = JSON.parse(res.target.responseText)
    data = JSON.parse(data.data)
    lists.innerHTML += data.map(function(v, i) {
        return `<div>
                   <dl>
                       <dt><img src="${v.img}" alt=""></dt>
                       <dd>
                           <p>${v.title}</p>
                           <span>${v.type}</span>
                <h2>${v.price}<span>+</span></h2>
                       </dd>
                   </dl>
               </div> `
    }).join("")
}
xhr.open("post", "/list")
xhr.setRequestHeader("content-type", "application/json")
xhr.send("")