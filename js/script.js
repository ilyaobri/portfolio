const skills = {
    data: [{
        item: 'html',
        level: 80,
        iconPath: 'img/skill/html.svg'
    },
    {   
        item: 'css',
        level: 70,
        iconPath: 'img/skill/css.svg'
    },
    {
        item: 'python',
        level: 60,
        iconPath: 'img/skill/python.svg'
    },
    {
        item: 'photoshop',
        level: 50,
        iconPath: 'img/skill/photoshop.svg'
    },
    {
        item: 'php',
        level: 40,
        iconPath: 'img/skill/php.svg'
    }],
    isSorted: false,
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

const skillList = document.querySelector('dl.skill-list');
skills.generateList(skillList);

const sortBtnsBlock = document.querySelector('.skill-buttons');
sortBtnsBlock.addEventListener('click', (e) => {
    if (e.target.nodeName === "BUTTON") {
        skills.sortList(e.target.dataset.type);
    }
});