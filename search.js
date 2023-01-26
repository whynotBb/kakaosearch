const thumbList = document.querySelector(".list");
const searchTxt = document.querySelector(".search-txt");
const btnSearch = document.querySelector(".btn-search");
const rescentSearch = document.querySelector(".recent-search-word");
const rescentSearchRemove = document.querySelector(".recent-search-word > li");
const rescentSearchArray = [];

// searchTxt.addEventListener("keyup", function () {
//   const txt = searchTxt.value;
//   console.log(txt);
// });

searchTxt.addEventListener("keyup", function (e) {
  const txt = searchTxt.value;
  console.log(txt);
  if (e.keyCode === 13) {
    searchImg(txt);
    if (!rescentSearchArray.includes(txt)) {
      rescentSearchArray.push(txt);
      rescentSearch.innerHTML += `<li id = ${txt}>${
        rescentSearchArray[rescentSearchArray.length - 1]
      } <span class="material-icons">
        clear
        </span></li> `;
      localStorage.setItem("recentSeach", JSON.stringify(rescentSearchArray));
      searchImg(txt);
    } else if (rescentSearchArray.includes(`${txt}`)) {
      rescentSearchArray.pop(txt);
      rescentSearch.getElementById(txt);
      localStorage.setItem("recentSeach", JSON.stringify(rescentSearchArray));
    }
    console.log(rescentSearchArray);
  }
});

function searchImg(searchTxt) {
  thumbList.innerHTML = "";
  const myFetch = fetch(
    `http://dapi.kakao.com/v2/search/image?query=${searchTxt} `,
    {
      headers: { Authorization: "KakaoAK 9c969449d7add2cb026afdd60ef2ed97" },
    }
  );
  myFetch
    .then(function (response) {
      // console.log(response.json());
      return response.json();
    })
    .then(function (result) {
      result.documents.forEach(function (item, idx) {
        // console.log(item.thumbnail_url);
        thumbList.innerHTML += `<li><a href="${item.image_url}"   data-fancybox="gallery"
      ><img src="${item.thumbnail_url}"></a></li>`;
      });
    })

    .catch(function () {
      console.log("F");
    })
    .finally(function () {
      console.log("마침내");
    });

  console.log(myFetch);
}
