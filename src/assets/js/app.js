(function () {
	("use strict");

	/**
	 *  global variables
	 */
	var navbarMenuHTML = document.querySelector(".navbar-menu").innerHTML;
	var horizontalMenuSplit = 5; // after this number all horizontal menus will be moved in More menu options
	var default_lang = "en"; // set Default Language
	var language = localStorage.getItem("language");

	function initLanguage() {
        // Set new language
        (language === null) ? setLanguage(default_lang) : setLanguage(language);
        var languages = document.getElementsByClassName("language");
        languages && Array.from(languages).forEach(function (dropdown) {
            dropdown.addEventListener("click", function (event) {
                setLanguage(dropdown.getAttribute("data-lang"));
            });
        });
	}
	
	function setLanguage(lang) {
		if (document.getElementById("header-lang-img")) {
			if (lang == "en") {
				document.getElementById("header-lang-img").src = "assets/images/flags/us.svg";
			} else if (lang == "sp") {
				document.getElementById("header-lang-img").src = "assets/images/flags/spain.svg";
			} else if (lang == "gr") {
				document.getElementById("header-lang-img").src = "assets/images/flags/germany.svg";
			} else if (lang == "it") {
				document.getElementById("header-lang-img").src = "assets/images/flags/italy.svg";
			} else if (lang == "ru") {
				document.getElementById("header-lang-img").src = "assets/images/flags/russia.svg";
			} else if (lang == "ch") {
				document.getElementById("header-lang-img").src = "assets/images/flags/china.svg";
			} else if (lang == "fr") {
				document.getElementById("header-lang-img").src = "assets/images/flags/french.svg";
			} else if (lang == "ar") {
				document.getElementById("header-lang-img").src = "assets/images/flags/ae.svg";
			}
			localStorage.setItem("language", lang);
			language = localStorage.getItem("language");
			getLanguage();
		}
	}

	// Multi language setting
	function getLanguage() {
		language == null ? setLanguage(default_lang) : false;
		var request = new XMLHttpRequest();
		// Instantiating the request object
		request.open("GET", "assets/lang/" + language + ".json");
		// Defining event listener for readystatechange event
		request.onreadystatechange = function () {
			// Check if the request is compete and was successful
			if (this.readyState === 4 && this.status === 200) {
				var data = JSON.parse(this.responseText);
				Object.keys(data).forEach(function (key) {
					var elements = document.querySelectorAll("[data-key='" + key + "']");
					Array.from(elements).forEach(function (elem) {
						elem.textContent = data[key];
					});
				});
			}
		};
		// Sending the request to the server
		request.send();
	}

	function pluginData() {
		/**
		 * Common plugins
		 */


		/**
		 * Choices Select plugin
		 */
		var choicesExamples = document.querySelectorAll("[data-choices]");
		Array.from(choicesExamples).forEach(function (item) {
			var choiceData = {};
			var isChoicesVal = item.attributes;
			if (isChoicesVal["data-choices-groups"]) {
				choiceData.placeholderValue = "This is a placeholder set in the config";
			}
			if (isChoicesVal["data-choices-search-false"]) {
				choiceData.searchEnabled = false;
			}
			if (isChoicesVal["data-choices-search-true"]) {
				choiceData.searchEnabled = true;
			}
			if (isChoicesVal["data-choices-removeItem"]) {
				choiceData.removeItemButton = true;
			}
			if (isChoicesVal["data-choices-sorting-false"]) {
				choiceData.shouldSort = false;
			}
			if (isChoicesVal["data-choices-sorting-true"]) {
				choiceData.shouldSort = true;
			}
			if (isChoicesVal["data-choices-multiple-remove"]) {
				choiceData.removeItemButton = true;
			}
			if (isChoicesVal["data-choices-limit"]) {
				choiceData.maxItemCount = isChoicesVal["data-choices-limit"].value.toString();
			}
			if (isChoicesVal["data-choices-limit"]) {
				choiceData.maxItemCount = isChoicesVal["data-choices-limit"].value.toString();
			}
			if (isChoicesVal["data-choices-editItem-true"]) {
				choiceData.maxItemCount = true;
			}
			if (isChoicesVal["data-choices-editItem-false"]) {
				choiceData.maxItemCount = false;
			}
			if (isChoicesVal["data-choices-text-unique-true"]) {
				choiceData.duplicateItemsAllowed = false;
			}
			if (isChoicesVal["data-choices-text-disabled-true"]) {
				choiceData.addItems = false;
			}
			isChoicesVal["data-choices-text-disabled-true"] ? new Choices(item, choiceData).disable() : new Choices(item, choiceData);
		});

		/**
		 * flatpickr
		 */
		var flatpickrExamples = document.querySelectorAll("[data-provider]");
		Array.from(flatpickrExamples).forEach(function (item) {
			if (item.getAttribute("data-provider") == "flatpickr") {
				var dateData = {};
				var isFlatpickerVal = item.attributes;
				dateData.disableMobile ="true";
				if (isFlatpickerVal["data-date-format"])
					dateData.dateFormat = isFlatpickerVal["data-date-format"].value.toString();
				if (isFlatpickerVal["data-enable-time"]) {
					(dateData.enableTime = true),
					(dateData.dateFormat = isFlatpickerVal["data-date-format"].value.toString() + " H:i");
				}
				if (isFlatpickerVal["data-altFormat"]) {
					(dateData.altInput = true),
					(dateData.altFormat = isFlatpickerVal["data-altFormat"].value.toString());
				}
				if (isFlatpickerVal["data-minDate"]) {
					dateData.minDate = isFlatpickerVal["data-minDate"].value.toString();
					dateData.dateFormat = isFlatpickerVal["data-date-format"].value.toString();
				}
				if (isFlatpickerVal["data-maxDate"]) {
					dateData.maxDate = isFlatpickerVal["data-maxDate"].value.toString();
					dateData.dateFormat = isFlatpickerVal["data-date-format"].value.toString();
				}
				if (isFlatpickerVal["data-deafult-date"]) {
					dateData.defaultDate = isFlatpickerVal["data-deafult-date"].value.toString();
					dateData.dateFormat = isFlatpickerVal["data-date-format"].value.toString();
				}
				if (isFlatpickerVal["data-multiple-date"]) {
					dateData.mode = "multiple";
					dateData.dateFormat = isFlatpickerVal["data-date-format"].value.toString();
				}
				if (isFlatpickerVal["data-range-date"]) {
					dateData.mode = "range";
					dateData.dateFormat = isFlatpickerVal["data-date-format"].value.toString();
				}
				if (isFlatpickerVal["data-inline-date"]) {
					(dateData.inline = true),
					(dateData.defaultDate = isFlatpickerVal["data-deafult-date"].value.toString());
					dateData.dateFormat = isFlatpickerVal["data-date-format"].value.toString();
				}
				if (isFlatpickerVal["data-disable-date"]) {
					var dates = [];
					dates.push(isFlatpickerVal["data-disable-date"].value);
					dateData.disable = dates.toString().split(",");
				}
				if (isFlatpickerVal["data-week-number"]) {
					var dates = [];
					dates.push(isFlatpickerVal["data-week-number"].value);
					dateData.weekNumbers = true
				}
				flatpickr(item, dateData);
			} else if (item.getAttribute("data-provider") == "timepickr") {
				var timeData = {};
				var isTimepickerVal = item.attributes;
				if (isTimepickerVal["data-time-basic"]) {
					(timeData.enableTime = true),
					(timeData.noCalendar = true),
					(timeData.dateFormat = "H:i");
				}
				if (isTimepickerVal["data-time-hrs"]) {
					(timeData.enableTime = true),
					(timeData.noCalendar = true),
					(timeData.dateFormat = "H:i"),
					(timeData.time_24hr = true);
				}
				if (isTimepickerVal["data-min-time"]) {
					(timeData.enableTime = true),
					(timeData.noCalendar = true),
					(timeData.dateFormat = "H:i"),
					(timeData.minTime = isTimepickerVal["data-min-time"].value.toString());
				}
				if (isTimepickerVal["data-max-time"]) {
					(timeData.enableTime = true),
					(timeData.noCalendar = true),
					(timeData.dateFormat = "H:i"),
					(timeData.minTime = isTimepickerVal["data-max-time"].value.toString());
				}
				if (isTimepickerVal["data-default-time"]) {
					(timeData.enableTime = true),
					(timeData.noCalendar = true),
					(timeData.dateFormat = "H:i"),
					(timeData.defaultDate = isTimepickerVal["data-default-time"].value.toString());
				}
				if (isTimepickerVal["data-time-inline"]) {
					(timeData.enableTime = true),
					(timeData.noCalendar = true),
					(timeData.defaultDate = isTimepickerVal["data-time-inline"].value.toString());
					timeData.inline = true;
				}
				flatpickr(item, timeData);
			}
		});

		// Dropdown
		Array.from(document.querySelectorAll('.dropdown-menu a[data-bs-toggle="tab"]')).forEach(function (element) {
			element.addEventListener("click", function (e) {
				e.stopPropagation();
				bootstrap.Tab.getInstance(e.target).show();
			});
		});
	}

	// on click collapse menu
	function isCollapseMenu() {
		/**
		 * Sidebar menu collapse
		 */
		if (document.querySelectorAll(".navbar-nav .collapse")) {
			var collapses = document.querySelectorAll(".navbar-nav .collapse");
			Array.from(collapses).forEach(function (collapse) {
				// Init collapses
				var collapseInstance = new bootstrap.Collapse(collapse, {
					toggle: false,
				});
				// Hide sibling collapses on `show.bs.collapse`
				collapse.addEventListener("show.bs.collapse", function (e) {
					e.stopPropagation();
					var closestCollapse = collapse.parentElement.closest(".collapse");
					if (closestCollapse) {
						var siblingCollapses = closestCollapse.querySelectorAll(".collapse");
						Array.from(siblingCollapses).forEach(function (siblingCollapse) {
							var siblingCollapseInstance = bootstrap.Collapse.getInstance(siblingCollapse);
							if (siblingCollapseInstance === collapseInstance) {
								return;
							}
							siblingCollapseInstance.hide();
						});
					} else {
						var getSiblings = function (elem) {
							// Setup siblings array and get the first sibling
							var siblings = [];
							var sibling = elem.parentNode.firstChild;
							// Loop through each sibling and push to the array
							while (sibling) {
								if (sibling.nodeType === 1 && sibling !== elem) {
									siblings.push(sibling);
								}
								sibling = sibling.nextSibling;
							}
							return siblings;
						};
						var siblings = getSiblings(collapse.parentElement);
						Array.from(siblings).forEach(function (item) {
							if (item.childNodes.length > 2)
								item.firstElementChild.setAttribute("aria-expanded", "false");
							var ids = item.querySelectorAll("*[id]");
							Array.from(ids).forEach(function (item1) {
								item1.classList.remove("show");
								if (item1.childNodes.length > 2) {
									var val = item1.querySelectorAll("ul li a");
									Array.from(val).forEach(function (subitem) {
										if (subitem.hasAttribute("aria-expanded"))
											subitem.setAttribute("aria-expanded", "false");
									});
								}
							});
						});
					}
				});

				// Hide nested collapses on `hide.bs.collapse`
				collapse.addEventListener("hide.bs.collapse", function (e) {
					e.stopPropagation();
					var childCollapses = collapse.querySelectorAll(".collapse");
					Array.from(childCollapses).forEach(function (childCollapse) {
						childCollapseInstance = bootstrap.Collapse.getInstance(childCollapse);
						childCollapseInstance.hide();
					});
				});
			});
		}
	}


	//  Search menu dropdown on Topbar
	function isCustomDropdown() {
		//Search bar
		var searchOptions = document.getElementById("search-close-options");
		var dropdown = document.getElementById("search-dropdown");
		var searchInput = document.getElementById("search-options");
		if(searchInput){
		searchInput.addEventListener("focus", function () {
			var inputLength = searchInput.value.length;
			if (inputLength > 0) {
				dropdown.classList.add("show");
				searchOptions.classList.remove("d-none");
			} else {
				dropdown.classList.remove("show");
				searchOptions.classList.add("d-none");
			}
		});

		searchInput.addEventListener("keyup", function (event) {
			var inputLength = searchInput.value.length;
			if (inputLength > 0) {
				dropdown.classList.add("show");
				searchOptions.classList.remove("d-none");

				var inputVal = searchInput.value.toLowerCase();
				
				var notifyItem = document.getElementsByClassName("notify-item");
				
				Array.from(notifyItem).forEach(function (element) {
					var notifiTxt = ''
					if(element.querySelector("h6")){
						var spantext = element.getElementsByTagName("span")[0].innerText.toLowerCase()
						var name = element.querySelector("h6").innerText.toLowerCase()
						if(name.includes(inputVal)){
							notifiTxt = name
						}else{
							notifiTxt = spantext
						}
					}else if(element.getElementsByTagName("span")){
						notifiTxt = element.getElementsByTagName("span")[0].innerText.toLowerCase()
					}

					if (notifiTxt)
						element.style.display = notifiTxt.includes(inputVal) ? "block" : "none";
						
				});
			} else {
				dropdown.classList.remove("show");
				searchOptions.classList.add("d-none");
			}
		});

		searchOptions.addEventListener("click", function () {
			searchInput.value = "";
			dropdown.classList.remove("show");
			searchOptions.classList.add("d-none");
		});

		document.body.addEventListener("click", function (e) {
			if (e.target.getAttribute("id") !== "search-options") {
				dropdown.classList.remove("show");
				searchOptions.classList.add("d-none");
			}
		});
	}
}
	//  search menu dropdown on topbar
	function isCustomDropdownResponsive() {
		//Search bar
		var searchOptions = document.getElementById("search-close-options");
		var dropdownReponsive = document.getElementById("search-dropdown-reponsive");
		var searchInputReponsive = document.getElementById("search-options-reponsive");

		if (searchOptions && dropdownReponsive && searchInputReponsive) {
			searchInputReponsive.addEventListener("focus", function () {
				var inputLength = searchInputReponsive.value.length;
				if (inputLength > 0) {
					dropdownReponsive.classList.add("show");
					searchOptions.classList.remove("d-none");
				} else {
					dropdownReponsive.classList.remove("show");
					searchOptions.classList.add("d-none");
				}
			});

			searchInputReponsive.addEventListener("keyup", function () {
				var inputLength = searchInputReponsive.value.length;
				if (inputLength > 0) {
					dropdownReponsive.classList.add("show");
					searchOptions.classList.remove("d-none");
				} else {
					dropdownReponsive.classList.remove("show");
					searchOptions.classList.add("d-none");
				}
			});

			searchOptions.addEventListener("click", function () {
				searchInputReponsive.value = "";
				dropdownReponsive.classList.remove("show");
				searchOptions.classList.add("d-none");
			});

			document.body.addEventListener("click", function (e) {
				if (e.target.getAttribute("id") !== "search-options") {
					dropdownReponsive.classList.remove("show");
					searchOptions.classList.add("d-none");
				}
			});
		}
	}

	function elementInViewport(el) {
		if (el) {
			var top = el.offsetTop;
			var left = el.offsetLeft;
			var width = el.offsetWidth;
			var height = el.offsetHeight;

			if (el.offsetParent) {
				while (el.offsetParent) {
					el = el.offsetParent;
					top += el.offsetTop;
					left += el.offsetLeft;
				}
			}
			return (
				top >= window.pageYOffset &&
				left >= window.pageXOffset &&
				top + height <= window.pageYOffset + window.innerHeight &&
				left + width <= window.pageXOffset + window.innerWidth
			);
		}
	}

	function initLeftMenuCollapse() {
		/**
		 * Vertical layout menu scroll add
		 */
		if (document.documentElement.getAttribute("data-layout") == "vertical") {
			
			if(document.querySelector(".navbar-menu")){
			document.querySelector(".navbar-menu").innerHTML = navbarMenuHTML;
		}	
			document.getElementById("scrollbar").setAttribute("data-simplebar", "");
			document.getElementById("navbar-nav").setAttribute("data-simplebar", "");
			document.getElementById("scrollbar").classList.add("h-100");
		}


		/**
		 * Horizontal layout menu
		 */
		if (document.documentElement.getAttribute("data-layout") == "horizontal") {
			updateHorizontalMenus();
		}
	}

	function isLoadBodyElement() {
		var verticalOverlay = document.getElementsByClassName("vertical-overlay");
		if (verticalOverlay) {
			Array.from(verticalOverlay).forEach(function (element) {
				element.addEventListener("click", function () {
					document.body.classList.remove("vertical-sidebar-enable");
					document.documentElement.setAttribute("data-sidebar-size", sessionStorage.getItem("data-sidebar-size"));
				});
			});
		}
	}

	function windowResizeHover() {
		feather.replace();
		var windowSize = document.documentElement.clientWidth;
		if (windowSize < 1025 && windowSize > 767) {
			if (sessionStorage.getItem("data-layout") == "vertical") {
				document.documentElement.setAttribute("data-sidebar-size", "sm");
			}
			if(document.querySelector(".hamburger-icon")){
			document.querySelector(".hamburger-icon").classList.add("open");
		}
		} else if (windowSize >= 1025) {
			if (sessionStorage.getItem("data-layout") == "vertical") {
				document.documentElement.setAttribute(
					"data-sidebar-size",
					sessionStorage.getItem("data-sidebar-size")
				);
			}
			if(document.querySelector(".hamburger-icon")){
			document.querySelector(".hamburger-icon").classList.remove("open");
			}
		} else if (windowSize <= 767) {
			document.body.classList.remove("vertical-sidebar-enable");
			if (sessionStorage.getItem("data-layout") != "horizontal") {
				document.documentElement.setAttribute("data-sidebar-size", "lg");
			}
			if(document.querySelector(".hamburger-icon")){
			document.querySelector(".hamburger-icon").classList.add("open");
		}
		}

		var isElement = document.querySelectorAll("#navbar-nav > li.nav-item");
		Array.from(isElement).forEach(function (item) {
			item.addEventListener("click", menuItem.bind(this), false);
			item.addEventListener("mouseover", menuItem.bind(this), false);
		});
	}

	function menuItem(e) {
		if (e.target && e.target.matches("a.nav-link span")) {
			if (elementInViewport(e.target.parentElement.nextElementSibling) == false) {
				e.target.parentElement.nextElementSibling.classList.add("dropdown-custom-right");
				e.target.parentElement.parentElement.parentElement.parentElement.classList.add("dropdown-custom-right");
				var eleChild = e.target.parentElement.nextElementSibling;
				Array.from(eleChild.querySelectorAll(".menu-dropdown")).forEach(function (item) {
					item.classList.add("dropdown-custom-right");
				});
			} else if (elementInViewport(e.target.parentElement.nextElementSibling) == true) {
				if (window.innerWidth >= 1848) {
					var elements = document.getElementsByClassName("dropdown-custom-right");
					while (elements.length > 0) {
						elements[0].classList.remove("dropdown-custom-right");
					}
				}
			}
		}

		if (e.target && e.target.matches("a.nav-link")) {
			if (elementInViewport(e.target.nextElementSibling) == false) {
				e.target.nextElementSibling.classList.add("dropdown-custom-right");
				e.target.parentElement.parentElement.parentElement.classList.add("dropdown-custom-right");
				var eleChild = e.target.nextElementSibling;
				Array.from(eleChild.querySelectorAll(".menu-dropdown")).forEach(function (item) {
					item.classList.add("dropdown-custom-right");
				});
			} else if (elementInViewport(e.target.nextElementSibling) == true) {
				if (window.innerWidth >= 1848) {
					var elements = document.getElementsByClassName("dropdown-custom-right");
					while (elements.length > 0) {
						elements[0].classList.remove("dropdown-custom-right");
					}
				}
			}
		}
	}

	function toggleHamburgerMenu() {
		var windowSize = document.documentElement.clientWidth;

		if (windowSize > 767)
			document.querySelector(".hamburger-icon").classList.toggle("open");

		//For collapse horizontal menu
		if (document.documentElement.getAttribute("data-layout") === "horizontal") {
			document.body.classList.contains("menu") ? document.body.classList.remove("menu") : document.body.classList.add("menu");
		}

		//For collapse vertical menu
		if (document.documentElement.getAttribute("data-layout") === "vertical") {
			if (windowSize < 1025 && windowSize > 767) {
				document.body.classList.remove("vertical-sidebar-enable");
				document.documentElement.getAttribute("data-sidebar-size") == "sm" ?
					document.documentElement.setAttribute("data-sidebar-size", "") :
					document.documentElement.setAttribute("data-sidebar-size", "sm");
			} else if (windowSize > 1025) {
				document.body.classList.remove("vertical-sidebar-enable");
				document.documentElement.getAttribute("data-sidebar-size") == "lg" ?
					document.documentElement.setAttribute("data-sidebar-size", "sm") :
					document.documentElement.setAttribute("data-sidebar-size", "lg");
			} else if (windowSize <= 767) {
				document.body.classList.add("vertical-sidebar-enable");
				document.documentElement.setAttribute("data-sidebar-size", "lg");
			}
		}
	}

	function windowLoadContent() {
		// Demo show code
		document.addEventListener("DOMContentLoaded", function () {
			var checkbox = document.getElementsByClassName("code-switcher");
			Array.from(checkbox).forEach(function (check) {
				check.addEventListener("change", function () {
					var card = check.closest(".card");
					var preview = card.querySelector(".live-preview");
					var code = card.querySelector(".code-view");

					if (check.checked) {
						preview.classList.add("d-none");
						code.classList.remove("d-none");
					} else {
						preview.classList.remove("d-none");
						code.classList.add("d-none");
					}
				});
			});
			feather.replace();
		});

		window.addEventListener("resize", windowResizeHover);
		windowResizeHover();

		Waves.init();

		document.addEventListener("scroll", function () {
			windowScroll();
		});

		window.addEventListener("load", function () {
			var isTwoColumn = document.documentElement.getAttribute("data-layout");
			initActiveMenu();
			isLoadBodyElement();
			addEventListenerOnSmHoverMenu();
		});
		if(document.getElementById("topnav-hamburger-icon")){
		document.getElementById("topnav-hamburger-icon").addEventListener("click", toggleHamburgerMenu);
	}	
		var isValues = sessionStorage.getItem("defaultAttribute");
		var defaultValues = JSON.parse(isValues);
		var windowSize = document.documentElement.clientWidth;
	}

	// page topbar class added
	function windowScroll() {
		var pageTopbar = document.getElementById("page-topbar");
		if(pageTopbar){
		document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50 ? pageTopbar.classList.add("topbar-shadow") : pageTopbar.classList.remove("topbar-shadow");
	}}


	// two-column sidebar active js
	function initActiveMenu() {
		var currentPath = location.pathname == "/" ? "index.html" : location.pathname.substring(1);
		currentPath = currentPath.substring(currentPath.lastIndexOf("/") + 1);
		if (currentPath) {
			// navbar-nav
			var a = document.getElementById("navbar-nav").querySelector('[href="' + currentPath + '"]');
			if (a) {
				a.classList.add("active");
				var parentCollapseDiv = a.closest(".collapse.menu-dropdown");
				if (parentCollapseDiv) {
					parentCollapseDiv.classList.add("show");
					parentCollapseDiv.parentElement.children[0].classList.add("active");
					parentCollapseDiv.parentElement.children[0].setAttribute("aria-expanded", "true");
					if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
						parentCollapseDiv.parentElement.closest(".collapse").classList.add("show");
						if (parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling)
							parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.classList.add("active");

						if (parentCollapseDiv.parentElement.parentElement.parentElement.parentElement.closest(".collapse.menu-dropdown")) {
							parentCollapseDiv.parentElement.parentElement.parentElement.parentElement.closest(".collapse").classList.add("show");
							if (parentCollapseDiv.parentElement.parentElement.parentElement.parentElement.closest(".collapse").previousElementSibling) {

								parentCollapseDiv.parentElement.parentElement.parentElement.parentElement.closest(".collapse").previousElementSibling.classList.add("active");
								if((document.documentElement.getAttribute("data-layout") == "horizontal") && parentCollapseDiv.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.closest(".collapse")){
									parentCollapseDiv.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.closest(".collapse").previousElementSibling.classList.add("active")
								}
							}
						}
					}
				}
			}
		}
	}

	function elementInViewport(el) {
		if (el) {
			var top = el.offsetTop;
			var left = el.offsetLeft;
			var width = el.offsetWidth;
			var height = el.offsetHeight;

			if (el.offsetParent) {
				while (el.offsetParent) {
					el = el.offsetParent;
					top += el.offsetTop;
					left += el.offsetLeft;
				}
			}
			return (
				top >= window.pageYOffset &&
				left >= window.pageXOffset &&
				top + height <= window.pageYOffset + window.innerHeight &&
				left + width <= window.pageXOffset + window.innerWidth
			);
		}
	}


	function initComponents() {
		// tooltip
		var tooltipTriggerList = [].slice.call(
			document.querySelectorAll('[data-bs-toggle="tooltip"]')
		);
		tooltipTriggerList.map(function (tooltipTriggerEl) {
			return new bootstrap.Tooltip(tooltipTriggerEl);
		});

		// popover
		var popoverTriggerList = [].slice.call(
			document.querySelectorAll('[data-bs-toggle="popover"]')
		);
		popoverTriggerList.map(function (popoverTriggerEl) {
			return new bootstrap.Popover(popoverTriggerEl);
		});
	}

	// Counter Number
	function counter() {
		var counter = document.querySelectorAll(".counter-value");
		var speed = 250; // The lower the slower
		counter &&
			Array.from(counter).forEach(function (counter_value) {
				function updateCount() {
					var target = +counter_value.getAttribute("data-target");
					var count = +counter_value.innerText;
					var inc = target / speed;
					if (inc < 1) {
						inc = 1;
					}
					// Check if target is reached
					if (count < target) {
						// Add inc to count and output in counter_value
						counter_value.innerText = (count + inc).toFixed(0);
						// Call function every ms
						setTimeout(updateCount, 1);
					} else {
						counter_value.innerText = numberWithCommas(target);
					}
					numberWithCommas(counter_value.innerText);
				}
				updateCount();
			});

		function numberWithCommas(x) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
	}

	function updateHorizontalMenus() {
		
		if(document.querySelector(".navbar-menu")){
		document.querySelector(".navbar-menu").innerHTML = navbarMenuHTML;
		}
		document.getElementById("scrollbar").removeAttribute("data-simplebar");
		document.getElementById("navbar-nav").removeAttribute("data-simplebar");
		document.getElementById("scrollbar").classList.remove("h-100");

		var splitMenu = horizontalMenuSplit;
		var extraMenuName = "More";
		var menuData = document.querySelectorAll("ul.navbar-nav > li.nav-item");
		var newMenus = "";
		var splitItem = "";

		Array.from(menuData).forEach(function (item, index) {
			if (index + 1 === splitMenu) {
				splitItem = item;
			}
			if (index + 1 > splitMenu) {
				newMenus += item.outerHTML;
				item.remove();
			}

			if (index + 1 === menuData.length) {
				if (splitItem.insertAdjacentHTML) {
					splitItem.insertAdjacentHTML(
					"afterend",
					'<li class="nav-item">\
						<a class="nav-link" href="#sidebarMore" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarMore">\
							<i class="las la-briefcase"></i> ' + extraMenuName + '\
						</a>\
						<div class="collapse menu-dropdown" id="sidebarMore"><ul class="nav nav-sm flex-column">' + newMenus + "</ul></div>\
					</li>");
				}
			}
		});
	}

	function hideShowLayoutOptions(dataLayout) {
		if (dataLayout == "vertical") {
			if(document.querySelector(".navbar-menu")){
			document.querySelector(".navbar-menu").innerHTML = navbarMenuHTML;
			}
			if (document.getElementById("theme-settings-offcanvas")) {
				document.getElementById("sidebar-size").style.display = "block";
				document.getElementById("sidebar-view").style.display = "block";
				document.getElementById("sidebar-color").style.display = "block";
				if (document.getElementById("sidebar-img")) {
					document.getElementById("sidebar-img").style.display = "block";
				}
				document.getElementById("layout-position").style.display = "block";
				document.getElementById("layout-width").style.display = "block";
			}
			initLeftMenuCollapse();
			initActiveMenu();
			addEventListenerOnSmHoverMenu();
			initMenuItemScroll();
		} else if (dataLayout == "horizontal") {
			updateHorizontalMenus();
			if (document.getElementById("theme-settings-offcanvas")) {
				document.getElementById("sidebar-size").style.display = "none";
				document.getElementById("sidebar-view").style.display = "none";
				document.getElementById("sidebar-color").style.display = "none";
				if (document.getElementById("sidebar-img")) {
					document.getElementById("sidebar-img").style.display = "none";
				}
				document.getElementById("layout-position").style.display = "block";
				document.getElementById("layout-width").style.display = "block";
			}
			initActiveMenu();
		}
	}

	// add listener Sidebar Hover icon on change layout from setting
	function addEventListenerOnSmHoverMenu() {
		document.getElementById("vertical-hover").addEventListener("click", function () {
			if (document.documentElement.getAttribute("data-sidebar-size") === "sm-hover") {
				document.documentElement.setAttribute("data-sidebar-size", "sm-hover-active");
			} else if (document.documentElement.getAttribute("data-sidebar-size") === "sm-hover-active") {
				document.documentElement.setAttribute("data-sidebar-size", "sm-hover");
			} else {
				document.documentElement.setAttribute("data-sidebar-size", "sm-hover");
			}
		});
	}
	// set full layout
	function layoutSwitch(isLayoutAttributes) {
		switch (isLayoutAttributes) {
			case isLayoutAttributes:
				switch (isLayoutAttributes["data-layout"]) {
					case "vertical":
						getElementUsingTagname("data-layout", "vertical");
						sessionStorage.setItem("data-layout", "vertical");
						document.documentElement.setAttribute("data-layout", "vertical");
						hideShowLayoutOptions("vertical");
						isCollapseMenu();
						break;
					case "horizontal":
						getElementUsingTagname("data-layout", "horizontal");
						sessionStorage.setItem("data-layout", "horizontal");
						document.documentElement.setAttribute("data-layout", "horizontal");
						hideShowLayoutOptions("horizontal");
						break;
					
					default:
						if (sessionStorage.getItem("data-layout") == "vertical" && sessionStorage.getItem("data-layout")) {
							getElementUsingTagname("data-layout", "vertical");
							sessionStorage.setItem("data-layout", "vertical");
							document.documentElement.setAttribute("data-layout", "vertical");
							hideShowLayoutOptions("vertical");
							isCollapseMenu();
						} else if (sessionStorage.getItem("data-layout") == "horizontal") {
							getElementUsingTagname("data-layout", "horizontal");
							sessionStorage.setItem("data-layout", "horizontal");
							document.documentElement.setAttribute("data-layout", "horizontal");
							hideShowLayoutOptions("horizontal");
						}
						break;
				}
				switch (isLayoutAttributes["data-topbar"]) {
					case "light":
							getElementUsingTagname("data-topbar", "light");
							sessionStorage.setItem("data-topbar", "light");
							document.documentElement.setAttribute("data-topbar", "light");
						break;
					case "dark":
							getElementUsingTagname("data-topbar", "dark");
							sessionStorage.setItem("data-topbar", "dark");
							document.documentElement.setAttribute("data-topbar", "dark");
						break;
					default:
						if (sessionStorage.getItem("data-topbar") == "dark") {
							getElementUsingTagname("data-topbar", "dark");
							sessionStorage.setItem("data-topbar", "dark");
							document.documentElement.setAttribute("data-topbar", "dark");
						} else {
							getElementUsingTagname("data-topbar", "light");
							sessionStorage.setItem("data-topbar", "light");
							document.documentElement.setAttribute("data-topbar", "light");
						}
						break;
				}

				switch (isLayoutAttributes["data-layout-style"]) {
					case "default":
							getElementUsingTagname("data-layout-style", "default");
							sessionStorage.setItem("data-layout-style", "default");
							document.documentElement.setAttribute("data-layout-style", "default");
						break;
					case "detached":
							getElementUsingTagname("data-layout-style", "detached");
							sessionStorage.setItem("data-layout-style", "detached");
							document.documentElement.setAttribute("data-layout-style", "detached");
						break;
					default:
						if (sessionStorage.getItem("data-layout-style") == "detached") {
							getElementUsingTagname("data-layout-style", "detached");
							sessionStorage.setItem("data-layout-style", "detached");
							document.documentElement.setAttribute("data-layout-style", "detached");
						} else {
							getElementUsingTagname("data-layout-style", "default");
							sessionStorage.setItem("data-layout-style", "default");
							document.documentElement.setAttribute("data-layout-style", "default");
						}
						break;
				}

				switch (isLayoutAttributes["data-sidebar-size"]) {
					case "lg":
							getElementUsingTagname("data-sidebar-size", "lg");
							document.documentElement.setAttribute("data-sidebar-size", "lg");
							sessionStorage.setItem("data-sidebar-size", "lg");
						break;

					case "sm":
							getElementUsingTagname("data-sidebar-size", "sm");
							document.documentElement.setAttribute("data-sidebar-size", "sm");
							sessionStorage.setItem("data-sidebar-size", "sm");
						break;

					case "md":
							getElementUsingTagname("data-sidebar-size", "md");
							document.documentElement.setAttribute("data-sidebar-size", "md");
							sessionStorage.setItem("data-sidebar-size", "md");
						break;

					case "sm-hover":
							getElementUsingTagname("data-sidebar-size", "sm-hover");
							document.documentElement.setAttribute("data-sidebar-size", "sm-hover");
							sessionStorage.setItem("data-sidebar-size", "sm-hover");
						break;

					default:
						if (sessionStorage.getItem("data-sidebar-size") == "sm") {
							document.documentElement.setAttribute("data-sidebar-size", "sm");
							getElementUsingTagname("data-sidebar-size", "sm");
							sessionStorage.setItem("data-sidebar-size", "sm");
						} else if (sessionStorage.getItem("data-sidebar-size") == "md") {
							document.documentElement.setAttribute("data-sidebar-size", "md");
							getElementUsingTagname("data-sidebar-size", "md");
							sessionStorage.setItem("data-sidebar-size", "md");
						} else if (sessionStorage.getItem("data-sidebar-size") == "sm-hover") {
							document.documentElement.setAttribute("data-sidebar-size", "sm-hover");
							getElementUsingTagname("data-sidebar-size", "sm-hover");
							sessionStorage.setItem("data-sidebar-size", "sm-hover");
						} else {
							document.documentElement.setAttribute("data-sidebar-size", "lg");
							getElementUsingTagname("data-sidebar-size", "lg");
							sessionStorage.setItem("data-sidebar-size", "lg");
						}
						break;
				}

				switch (isLayoutAttributes["data-bs-theme"]) {
					case "light":
						getElementUsingTagname("data-bs-theme", "light");
						document.documentElement.setAttribute("data-bs-theme", "light");
						sessionStorage.setItem("data-bs-theme", "light");
						break;
					case "dark":
						getElementUsingTagname("data-bs-theme", "dark");
						document.documentElement.setAttribute("data-bs-theme", "dark");
						sessionStorage.setItem("data-bs-theme", "dark");
						break;
					default:
						if (sessionStorage.getItem("data-bs-theme") && sessionStorage.getItem("data-bs-theme") == "dark") {
							sessionStorage.setItem("data-bs-theme", "dark");
							document.documentElement.setAttribute("data-bs-theme", "dark");
							getElementUsingTagname("data-bs-theme", "dark");
						} else {
							sessionStorage.setItem("data-bs-theme", "light");
							document.documentElement.setAttribute("data-bs-theme", "light");
							getElementUsingTagname("data-bs-theme", "light");
						}
						break;
				}

				switch (isLayoutAttributes["data-layout-width"]) {
					case "fluid":
							getElementUsingTagname("data-layout-width", "fluid");
							document.documentElement.setAttribute("data-layout-width", "fluid");
							sessionStorage.setItem("data-layout-width", "fluid");
						break;
					case "boxed":
							getElementUsingTagname("data-layout-width", "boxed");
							document.documentElement.setAttribute("data-layout-width", "boxed");
							sessionStorage.setItem("data-layout-width", "boxed");
						break;
					default:
						if (sessionStorage.getItem("data-layout-width") == "boxed") {
							sessionStorage.setItem("data-layout-width", "boxed");
							document.documentElement.setAttribute("data-layout-width", "boxed");
							getElementUsingTagname("data-layout-width", "boxed");
						} else {
							sessionStorage.setItem("data-layout-width", "fluid");
							document.documentElement.setAttribute("data-layout-width", "fluid");
							getElementUsingTagname("data-layout-width", "fluid");
						}
						break;
				}

				switch (isLayoutAttributes["data-sidebar"]) {
					case "light":
							getElementUsingTagname("data-sidebar", "light");
							sessionStorage.setItem("data-sidebar", "light");
							document.documentElement.setAttribute("data-sidebar", "light");
						break;
					case "dark":
							getElementUsingTagname("data-sidebar", "dark");
							sessionStorage.setItem("data-sidebar", "dark");
							document.documentElement.setAttribute("data-sidebar", "dark");
						break;
					default:
							if (sessionStorage.getItem("data-sidebar") && sessionStorage.getItem("data-sidebar") == "light") {
								sessionStorage.setItem("data-sidebar", "light");
								getElementUsingTagname("data-sidebar", "light");
								document.documentElement.setAttribute("data-sidebar", "light");
							} else if (sessionStorage.getItem("data-sidebar") == "dark"){
								sessionStorage.setItem("data-sidebar", "dark");
								getElementUsingTagname("data-sidebar", "dark");
								document.documentElement.setAttribute("data-sidebar", "dark");
							}
						break;
				}


				switch (isLayoutAttributes["data-layout-position"]) {
					case "fixed":
							getElementUsingTagname("data-layout-position", "fixed");
							sessionStorage.setItem("data-layout-position", "fixed");
							document.documentElement.setAttribute("data-layout-position", "fixed");
						break;
					case "scrollable":
							getElementUsingTagname("data-layout-position", "scrollable");
							sessionStorage.setItem("data-layout-position", "scrollable");
							document.documentElement.setAttribute("data-layout-position", "scrollable");
						break;
					default:
						if (sessionStorage.getItem("data-layout-position") && sessionStorage.getItem("data-layout-position") == "scrollable") {
							getElementUsingTagname("data-layout-position", "scrollable");
							sessionStorage.setItem("data-layout-position", "scrollable");
							document.documentElement.setAttribute("data-layout-position", "scrollable");
						} else {
							getElementUsingTagname("data-layout-position", "fixed");
							sessionStorage.setItem("data-layout-position", "fixed");
							document.documentElement.setAttribute("data-layout-position", "fixed");
						}
						break;
				}

				default:
					break;
		}
	}

	function initMenuItemScroll() {
		setTimeout(function () {
			var sidebarMenu = document.getElementById("navbar-nav");
			if (sidebarMenu) {
				var activeMenu = sidebarMenu.querySelector(".nav-item .active");
				var offset = activeMenu ? activeMenu.offsetTop : 0;
				if (offset > 300) {
					var verticalMenu = document.getElementsByClassName("app-menu") ? document.getElementsByClassName("app-menu")[0] : "";
					if (verticalMenu && verticalMenu.querySelector(".simplebar-content-wrapper")) {
						setTimeout(function () {
							offset == 330 ?
								(verticalMenu.querySelector(".simplebar-content-wrapper").scrollTop = offset + 85) :
								(verticalMenu.querySelector(".simplebar-content-wrapper").scrollTop = offset);
						}, 0);
					}
				}
			}
		}, 250);
	}

	// add change event listener on right layout setting
	function getElementUsingTagname(ele, val) {
		Array.from(document.querySelectorAll("input[name=" + ele + "]")).forEach(function (x) {
			val == x.value ? (x.checked = true) : (x.checked = false);

			x.addEventListener("change", function () {
				document.documentElement.setAttribute(ele, x.value);
				sessionStorage.setItem(ele, x.value);
				initLanguage();

				if (ele == "data-layout-width" && x.value == "boxed") {
					document.documentElement.setAttribute("data-sidebar-size", "sm-hover");
					sessionStorage.setItem("data-sidebar-size", "sm-hover");
					document.getElementById("sidebar-size-small-hover").checked = true;
				} else if (ele == "data-layout-width" && x.value == "fluid") {
					document.documentElement.setAttribute("data-sidebar-size", "lg");
					sessionStorage.setItem("data-sidebar-size", "lg");
					document.getElementById("sidebar-size-default").checked = true;
				}

				if (ele == "data-layout") {
					if (x.value == "vertical") {
						hideShowLayoutOptions("vertical");
						isCollapseMenu();
						feather.replace();
					} else if (x.value == "horizontal") {
						if (document.getElementById("sidebarimg-none")){
							document.getElementById("sidebarimg-none").click();
						}
						hideShowLayoutOptions("horizontal");
						feather.replace();
					}
				}

				
			});
		});

	}

	function setDefaultAttribute() {
		if (!sessionStorage.getItem("defaultAttribute")) {
			var attributesValue = document.documentElement.attributes;
			var isLayoutAttributes = {};
			Array.from(attributesValue).forEach(function (x) {
				if (x && x.nodeName && x.nodeName != "undefined") {
					var nodeKey = x.nodeName;
					isLayoutAttributes[nodeKey] = x.nodeValue;
					sessionStorage.setItem(nodeKey, x.nodeValue);
				}
			});
			sessionStorage.setItem("defaultAttribute", JSON.stringify(isLayoutAttributes));
			layoutSwitch(isLayoutAttributes);

			// open right sidebar on first time load
			var offCanvas = document.querySelector('.btn[data-bs-target="#theme-settings-offcanvas"]');
			offCanvas ? offCanvas.click() : "";
		} else {
			var isLayoutAttributes = {};
			isLayoutAttributes["data-layout"] = sessionStorage.getItem("data-layout");
			isLayoutAttributes["data-sidebar-size"] = sessionStorage.getItem("data-sidebar-size");
			isLayoutAttributes["data-bs-theme"] = sessionStorage.getItem("data-bs-theme");
			isLayoutAttributes["data-layout-width"] = sessionStorage.getItem("data-layout-width");
			isLayoutAttributes["data-sidebar"] = sessionStorage.getItem("data-sidebar");
			isLayoutAttributes["data-layout-position"] = sessionStorage.getItem("data-layout-position");
			isLayoutAttributes["data-layout-style"] = sessionStorage.getItem("data-layout-style");
			isLayoutAttributes["data-topbar"] = sessionStorage.getItem("data-topbar");
			layoutSwitch(isLayoutAttributes);
		}
	}

	function initFullScreen() {
		var fullscreenBtn = document.querySelector('[data-toggle="fullscreen"]');
		fullscreenBtn &&
			fullscreenBtn.addEventListener("click", function (e) {
				e.preventDefault();
				document.body.classList.toggle("fullscreen-enable");
				if (!document.fullscreenElement &&
					/* alternative standard method */
					!document.mozFullScreenElement &&
					!document.webkitFullscreenElement
				) {
					// current working methods
					if (document.documentElement.requestFullscreen) {
						document.documentElement.requestFullscreen();
					} else if (document.documentElement.mozRequestFullScreen) {
						document.documentElement.mozRequestFullScreen();
					} else if (document.documentElement.webkitRequestFullscreen) {
						document.documentElement.webkitRequestFullscreen(
							Element.ALLOW_KEYBOARD_INPUT
						);
					}
				} else {
					if (document.cancelFullScreen) {
						document.cancelFullScreen();
					} else if (document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
					} else if (document.webkitCancelFullScreen) {
						document.webkitCancelFullScreen();
					}
				}
			});

		document.addEventListener("fullscreenchange", exitHandler);
		document.addEventListener("webkitfullscreenchange", exitHandler);
		document.addEventListener("mozfullscreenchange", exitHandler);

		function exitHandler() {
			if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
				document.body.classList.remove("fullscreen-enable");
			}
		}
	}

	function setLayoutMode(mode, modeType, modeTypeId, html) {
		var isModeTypeId = document.getElementById(modeTypeId);
		html.setAttribute(mode, modeType);
		if (isModeTypeId) {
			document.getElementById(modeTypeId).click();
		}
	}

	function initModeSetting() {
		var html = document.getElementsByTagName("HTML")[0];
		var lightDarkBtn = document.querySelectorAll(".light-dark-mode");
		if (lightDarkBtn && lightDarkBtn.length) {
			lightDarkBtn[0].addEventListener("click", function (event) {
				html.hasAttribute("data-bs-theme") && html.getAttribute("data-bs-theme") == "dark" ?
					setLayoutMode("data-bs-theme", "light", "layout-mode-light", html) :
					setLayoutMode("data-bs-theme", "dark", "layout-mode-dark", html);
			});
		}
	}

	function resetLayout() {
		if (document.getElementById("reset-layout")) {
			document.getElementById("reset-layout").addEventListener("click", function () {
				sessionStorage.clear();
				window.location.reload();
			});
		}
	}

	function init() {
		setDefaultAttribute();
		isCustomDropdown();
		isCustomDropdownResponsive();
		initFullScreen();
		initModeSetting();
		windowLoadContent();
		counter();
		initLeftMenuCollapse();
		initComponents();
		resetLayout();
		pluginData();
		initLanguage();
		isCollapseMenu();
		initMenuItemScroll();
	}
	init();

	var timeOutFunctionId;

	function setResize() {
		var currentLayout = document.documentElement.getAttribute("data-layout");
		if (currentLayout !== "horizontal") {
			if (document.getElementById("navbar-nav")) {
				var simpleBar = new SimpleBar(document.getElementById("navbar-nav"));
				if (simpleBar) simpleBar.getContentElement();
			}

			if (document.getElementsByClassName("twocolumn-iconview")[0]) {
				var simpleBar1 = new SimpleBar(
					document.getElementsByClassName("twocolumn-iconview")[0]
				);
				if (simpleBar1) simpleBar1.getContentElement();
			}
			clearTimeout(timeOutFunctionId);
		}
	}

	window.addEventListener("resize", function () {
		if (timeOutFunctionId) clearTimeout(timeOutFunctionId);
		timeOutFunctionId = setTimeout(setResize, 2000);
	});
})();


//
/********************* scroll top js ************************/
//

var mybutton = document.getElementById("back-to-top");

if (mybutton) {
	// When the user scrolls down 20px from the top of the document, show the button
	window.onscroll = function () {
		scrollFunction();
	};

	function scrollFunction() {
		if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
			mybutton.style.display = "block";
		} else {
			mybutton.style.display = "none";
		}
	}

	// When the user clicks on the button, scroll to the top of the document
	function topFunction() {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	}
}
