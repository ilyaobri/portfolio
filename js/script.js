const skills = {
    data: [{
        item: 'html',
        level: 40,
        iconPath: 'img/skill/html.svg'
    },
    {   
        item: 'css',
        level: 40,
        iconPath: 'img/skill/css.svg'
    },
    {
        item: 'python',
        level: 40,
        iconPath: 'img/skill/python.svg'
    },
    {
        item: 'photoshop',
        level: 40,
        iconPath: 'img/skill/photoshop.svg'
    },
    {
        item: 'php',
        level: 40,
        iconPath: 'img/skill/php.svg'
    }],
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
};

const skillList = document.querySelector('dl.skill-list');
skills.generateList(skillList);
