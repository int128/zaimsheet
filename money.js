'use strict';

window.addEventListener('load', () => {
    const table = createZaimSheetTable();

    const selectButton = document.createElement('button');
    selectButton.classList.add('btn', 'btn-success');
    selectButton.textContent = 'スプレッドシートをすべて選択';
    selectButton.addEventListener('click', e => {
        e.preventDefault();
        const range = document.createRange();
        range.selectNodeContents(table);
        const selection = window.getSelection();
        selection.empty();
        selection.addRange(range);
    });

    const toggleGroup = document.createElement('div');
    toggleGroup.appendChild(selectButton);
    toggleGroup.appendChild(table);

    const toggleButton = document.createElement('button');
    toggleButton.classList.add('btn', 'btn-success');
    toggleButton.textContent = 'スプレッドシート形式';
    toggleButton.addEventListener('click', e => {
        e.preventDefault();
        toggleGroup.classList.toggle('hide');
    });
    toggleGroup.classList.toggle('hide');

    const insertRef = document.getElementById('filter_payment_category_menu');
    insertRef.parentNode.insertBefore(toggleGroup, insertRef.nextElementSibling);
    insertRef.parentNode.insertBefore(toggleButton, toggleGroup);
});

/**
 * @returns {Element} table element
 */
function createZaimSheetTable() {
    const table = document.createElement('table');
    table.appendChild(createRowWithColumns('th', [
        '日付',
        '大カテゴリ',
        '小カテゴリ',
        '金額',
        '出金',
        '入金',
        'お店',
        '品目',
        'メモ',
    ]));
    document.querySelectorAll('tbody.money-list>tr').forEach(tr => {
        const columns = [
            applyOrEmpty(tr.querySelector('td:nth-child(3)'), e => parseZaimDateString(e.textContent).toLocaleDateString()),
            applyOrEmpty(tr.querySelector('td:nth-child(4)>span'), e => e.getAttribute('data-title')),
            applyOrEmpty(tr.querySelector('td:nth-child(4)>a'), e => e.textContent),
            applyOrEmpty(tr.querySelector('td:nth-child(5)'), e => e.textContent),
            applyOrEmpty(tr.querySelector('td:nth-child(6) img'), e => e.getAttribute('alt')),
            applyOrEmpty(tr.querySelector('td:nth-child(7) img'), e => e.getAttribute('alt')),
            applyOrEmpty(tr.querySelector('td:nth-child(8) span'), e => e.getAttribute('title')),
            applyOrEmpty(tr.querySelector('td:nth-child(9) span'), e => e.getAttribute('title')),
            applyOrEmpty(tr.querySelector('td:nth-child(10) span'), e => e.getAttribute('title')),
        ];
        table.appendChild(createRowWithColumns('td', columns));
    });
    return table;
}

/**
 * @param {Element} e 
 * @param {(e: Element) => string} f 
 * @returns {string}
 */
function applyOrEmpty(e, f) {
    if (!(e instanceof Element)) {
        return '';
    }
    return f(e);
}

/**
 * @param {string} columnTagName 
 * @param {Array<string>} columns 
 * @returns {Element}
 */
function createRowWithColumns(columnTagName, columns) {
    const tr = document.createElement('tr');
    columns.forEach(column => {
        const c = document.createElement(columnTagName);
        c.textContent = column;
        tr.appendChild(c);
    });
    return tr;
}

/**
 * @param {string} s
 * @returns {Date}
 */
function parseZaimDateString(s) {
    const y = new Date().getFullYear();
    const p = s.split(/[月日]/);
    return new Date(y, p[0] - 1, p[1]);
}
