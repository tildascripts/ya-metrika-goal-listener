const ymId = "12345678" //номер счетчика метрики

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
			elem.title = `${targets[item.goal.target]}: ${item.human.description}\n${item.goal.target}_${item.goal.description}`
		})
	})
}

let vidoeMouseOverState = {}//тут хранится состояния мыши над видосами

let chase = [
	{
		human: {
			description: "Заказать сайт в хэдере",
		},
		goal: {
			target: "button",
			description: "order_site"
		},
		selectors: [
			"#nav221914254 a[href='#contacts']",
		],
	},
];

$(document).ready(() => {//$(window).on("load", () => {
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
