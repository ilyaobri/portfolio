const skills = {
    data: [],
    isSorted: false,
    jsonPath: '',
    skillList: null,
    skillSection: null,
    initList: function(jsonPath, skillList, skillSection) {
        this.jsonPath = jsonPath;
        this.skillList = skillList;
        this.skillSection = skillSection;
        fetch(jsonPath)
            .then(data => data.json())
            .then(object => {
                this.data = object;
                this.generateList(skillList);
            })
            .catch(() => {
                console.error('Что-то пошло не так');
                skillSection.remove();
            });
    },
    generateList: function(parentElement) {
        parentElement.innerHTML = '';
        this.data.forEach(element => {
            const dt = document.createElement('dt');
            dt.classList.add('skill-item');
            dt.textContent = element.item;
            dt.style.backgroundImage = `url(${element.iconPath})`;

            const dd = document.createElement('dd');
            dd.classList.add('skill-level');
            
            const div = document.createElement('div');
            div.style.width = `${element.level}%`;
            div.textContent = `${element.level}%`;

            dd.append(div);
            parentElement.append(dt, dd);
        });
    },
    sortList: function(sortingType) {
        if (skills.isSorted !== sortingType) {
            switch (sortingType) {
                case 'name':
                    this.data.sort((a, b) => a.item.localeCompare(b.item)); break;
                case 'level':
                    this.data.sort((a, b) => b.level - a.level); break;
                default:
                    return;
            }
            console.log(`отсортировано по ${sortingType}`);
            this.isSorted = sortingType;
        } else {
            this.data.reverse();
            console.log('инвертировали порядок сортировки');
        }
        this.generateList(skillList);
    },
};

const sortBtnsBlock = document.querySelector('.skill-buttons');
sortBtnsBlock.addEventListener('click', (e) => {
    if (e.target.nodeName === "BUTTON") {
        skills.sortList(e.target.dataset.type);
    }
});

const menu = {
    open: function() {
        nav.classList.remove('main-nav_closed');
        btn.classList.add('nav-btn_close');
        btn.classList.remove('nav-btn_open');
        btn.innerHTML = '<span class="visually-hidden">Закрыть меню</span>';
    },
    close: function() {
        nav.classList.add('main-nav_closed');
        btn.classList.remove('nav-btn_close');
        btn.classList.add('nav-btn_open');
        btn.innerHTML = '<span class="visually-hidden">Открыть меню</span>';
    },
};

const skillList = document.querySelector('dl.skill-list');
const skilSection = document.querySelector('section.skill');
skills.initList('db/skills.json', skillList, skillSection);

const nav = document.querySelector('.main-nav');
const btn = document.querySelector('.nav-btn');
btn.addEventListener('click', (e) => {
    e.target.classList.contains('nav-btn_open') ? menu.open() : menu.close();
});
menu.close();

const changeTheme = (theme) => {
    theme
      ? document.body.classList.remove('dark-theme')
      : document.body.classList.add('dark-theme');
    localStorage.setItem('dark-theme-disabled', theme);
}

const checkbox = document.querySelector(".switch-checkbox");
checkbox.addEventListener("change", (e) => {
    changeTheme(checkbox.checked);
});

const darkTheme = localStorage.getItem('dark-theme-disabled');
if (darkTheme === null) {
    changeTheme(false);
    checkbox.checked = false;
} else {
    changeTheme(darkTheme === "true");
    checkbox.checked = (darkTheme === "true");
}
