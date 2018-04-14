// $.getJSON("https://api.github.com/search/repositories?q=language:javascript+language:ruby+language:css+language:pythont&sort=stars&order=desc",function(data){
//     console.log(data)
// })

let languages = document.querySelectorAll('a')
console.log(languages)
const mostPopularURL = 'https://api.github.com/search/repositories?q=stars:%3E=1&sort=stars&order=desc';
const baseURL = 'https://api.github.com/search/repositories?q=language:{lang}&sort=stars&order=desc'
for (let lang of languages) {
  console.log("ll")
			lang.addEventListener('click', fetchPopularRepos);
		}

function displayResults(data){
  data.items.forEach(function(item, i){
    console.log(item)
      let fullName = item.full_name.slice(0,item.full_name.indexOf("/"))
      $('main').append(`
      <div class="repos">
        <div class="rank repos-item">#${i+1}</div>
        <img src="${item.owner.avatar_url}">
        <div class="name repos-item">${item.name}</div>
        <div class="full-name repos-item">@${fullName}</div>
        <div class="stars repos-item">${item.stargazers_count} stars</div>
      </div>
                `
  )
  })
}

function fetchPopularRepos(e) {
			e.preventDefault()

			let language = e.target.textContent;

			let url
			if (language === 'All')  {
				url = mostPopularURL
			} else {
				url = baseURL.replace('{lang}', language)
			}

			fetch(url)
				.then((result) => {
					return result.json()
				})
				.then((data) => {
          $('main').empty()
					displayResults(data)
				})
		}


    //https://api.github.com/search/commits?q=user:morfioce
