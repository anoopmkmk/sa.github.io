var elements = [];
document.addEventListener("DOMContentLoaded", function () {
    var savedMenuItem = localStorage.getItem("activeMenuItem");
    if (savedMenuItem) {
        highlightMenuItem(savedMenuItem);
    }
    document.querySelectorAll(".scroll-to-link").forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            var target = this.dataset.target;
            var targetElement = document.getElementById(target);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
                highlightMenuItem(target);
                localStorage.setItem("activeMenuItem", target);
            }
        });
    });
    window.addEventListener("scroll", function () {
        var sections = document.querySelectorAll(".scroll-to-link");
        var closestSection = null;
        var minDistance = Infinity;
        sections.forEach(function (link) {
            var target = link.dataset.target;
            var targetElement = document.getElementById(target);
            if (targetElement) {
                var rect = targetElement.getBoundingClientRect();
                var distance = Math.abs(rect.top);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestSection = link;
                }
            }
        });
        if (closestSection) {
            var target = closestSection.dataset.target;
            highlightMenuItem(target);
            localStorage.setItem("activeMenuItem", target);
        }
    });
    function highlightMenuItem(target) {
        document.querySelectorAll(".accordion-content li").forEach(function (el) {
            el.classList.remove("active");
        });
        document.querySelectorAll(".accordion").forEach(function (el) {
            el.classList.remove("active");
        });
        var activeLink = document.querySelector(`.scroll-to-link[data-target='${target}']`);
        if (activeLink) {
            activeLink.classList.add("active");
            activeLink.closest(".accordion").classList.add("active");
        }
    }
});
document.getElementById('button-menu-mobile').onclick = function (e) {
    e.preventDefault();
    document.querySelector('html').classList.toggle('menu-opened');
}
document.querySelector('.left-menu .mobile-menu-closer').onclick = function (e) {
    e.preventDefault();
    document.querySelector('html').classList.remove('menu-opened');
}
function debounce (func) {
    var timer;
    return function (event) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, 100, event);
    };
}
function calculElements () {
    var totalHeight = 0;
    elements = [];
    [].forEach.call(document.querySelectorAll('.content-section'), function (div) {
        var section = {};
        section.id = div.id;
        totalHeight += div.offsetHeight;
        section.maxHeight = totalHeight - 25;
        elements.push(section);
    });
    onScroll();
}
function onScroll () {
    var scroll = window.pageYOffset;
    // console.log('scroll', scroll, elements)
    for (var i = 0; i < elements.length; i++) {
        var section = elements[i];
        if (scroll <= section.maxHeight) {
            var elems = document.querySelectorAll(".content-menu ul li");
            [].forEach.call(elems, function (el) {
                el.classList.remove("active");
            });
            var activeElems = document.querySelectorAll(".content-menu ul li[data-target='" + section.id + "']");
            [].forEach.call(activeElems, function (el) {
                el.classList.add("active");
            });
            break;
        }
    }
    if (window.innerHeight + scroll + 5 >= document.body.scrollHeight) { // end of scroll, last element
        var elems = document.querySelectorAll(".content-menu ul li");
        [].forEach.call(elems, function (el) {
            el.classList.remove("active");
        });
        var activeElems = document.querySelectorAll(".content-menu ul li:last-child");
        [].forEach.call(activeElems, function (el) {
            el.classList.add("active");
        });
    }
}
calculElements();
window.onload = () => {
    calculElements();
};
window.addEventListener("resize", debounce(function (e) {
    e.preventDefault();
    calculElements();
}));
window.addEventListener('scroll', function (e) {
    e.preventDefault();
    onScroll();
});
 document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', function() {
            this.parentElement.classList.toggle('active');
        });
    });
    document.querySelectorAll(".links").forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault(); 
            var targetId = this.getAttribute('href').substring(1); 
            var targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        });
    });