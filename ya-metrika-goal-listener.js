const ymId = "" //номер счетчика метрики

const reachGoal = (target, description) => {
	window[`yaCounter${ymId}`].reachGoal(`${target}_${description}`)//тильдовская ф-я метрики
	console.log("reachGoal", target, description)
}
const showChasing = () => {//обвести прослушиваемые элементы красным
	let targets = {
		formbutton: "Клик по кнопке с формой",
		button: "Клик по кнопке",
		link: "Клик по ссылке",
		video: "Просмотр видео",
		anchor: "Клик по якорьной ссылке",
		expandedfaq: "Раскрытие вопроса",
		chat: "Переход в чат"
	}
	chase.forEach(item => {
		item.selectors.forEach(selector => {
			let elem = document.querySelector(selector)
			elem.style.boxShadow = "0 0 0 5px red"
			elem.title = `${item.human.block} — ${targets[item.goal.target]}: ${item.human.description}\n${item.goal.target}_${item.goal.description}`
		})
	})
}

let vidoeMouseOverState = {}//тут хранится состояния мыши над видосами

let chase = [//прослушиваемые элементы
	{
		human: {//для человека
			description: "Преимущества",
			block: "Хэдер",
		},
		goal: {
			target: "anchor",//короткое название таргета (см. targets)
			description: "AdvantagesHeader",
		},
		selectors: [//1 и более селекторов элемента
			"BODY>:nth-child(1)>:nth-child(3)>:nth-child(2)>:nth-child(1)>:nth-child(19)>:nth-child(1)",
		]
	},
]

$(window).on("load", () => {
	chase.forEach(item => {
		if (item.goal.target !== "video") {
			item.selectors.forEach(selector => {
				let elem = document.querySelector(selector)
				!elem && console.log("not found", item)
				elem && elem.addEventListener("click", () => {
					reachGoal(item.goal.target, item.goal.description)
				})
			})
		}
		else if (item.goal.target === "video") {
			item.selectors.forEach(selector => {
				let elem = document.querySelector(selector)
				!elem && console.log("not found", item)
				let videoJsId = `${item.goal.target}_${item.goal.description}`
				vidoeMouseOverState[videoJsId] = false
				
				elem && elem.addEventListener("mouseover", () => {
					vidoeMouseOverState[videoJsId] = true;
				});
				elem && elem.addEventListener("mouseout", () => {
					vidoeMouseOverState[videoJsId] = false;
					window.focus()
				});
			})
		}
	})

	window.addEventListener("blur", () => {
		for (let videoJsId in vidoeMouseOverState) {
			if (vidoeMouseOverState[videoJsId] === true) {
				reachGoal.apply(null, videoJsId.split("_"))
			}
		}
	});
})