window.addEventListener('load', function () {
    var table = $('<table/>');
    table.insertAfter($('#filter_payment_category_menu'));
    table.toggle();
    table.append($('<tr/>')
        .append('<th>日付</th>')
        .append('<th>大カテゴリ</th>')
        .append('<th>小カテゴリ</th>')
        .append('<th>金額</th>')
        .append('<th>出金</th>')
        .append('<th>入金</th>')
        .append('<th>お店</th>')
        .append('<th>品目</th>')
        .append('<th>メモ</th>')
    );

    $('tbody.money-list>tr').each(function () {
        var date = parseZaimDateString($('td:nth-child(3)', this).text());
        var category1st = $('td:nth-child(4)>span', this).attr('data-title');
        var category2nd = $('td:nth-child(4)>a', this).text();
        var price = $('td:nth-child(5)', this).text();
        var fromAccount = $('td:nth-child(6) img', this).attr('alt');
        var toAccount = $('td:nth-child(7) img', this).attr('alt');
        var place = $('td:nth-child(8) span', this).attr('title');
        var name = $('td:nth-child(9) span', this).attr('title');
        var memo = $('td:nth-child(10) span', this).attr('title');

        table.append($('<tr/>')
            .append($('<td/>').text(date.toLocaleDateString()))
            .append($('<td/>').text(category1st))
            .append($('<td/>').text(category2nd))
            .append($('<td/>').text(price))
            .append($('<td/>').text(fromAccount))
            .append($('<td/>').text(toAccount))
            .append($('<td/>').text(place))
            .append($('<td/>').text(name))
            .append($('<td/>').text(memo))
        );
    });

    var button = $('<button class="btn btn-success">スプレッドシート形式</button>');
    button.insertAfter($('#filter_payment_category_menu'));
    button.on('click', function () {
        table.toggle();
    });
});

function parseZaimDateString(s) {
    var y = new Date().getFullYear();
    var p = s.split(/[月日]/);
    return new Date(y, p[0] - 1, p[1]);
}
