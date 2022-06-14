let adressValue = '';
let entity = 'adress'
let country;
let city;
let street;

function selectCountry(el){

    let item = $(el);
    let secID = item.data('id');
    let valTxt = item.html();
    let cityArea = $('.dropdown-wrapper[data-field="city"]');
    let list = cityArea.find('ul');

    $('#dropdownMenuButtonCountry').html(valTxt);
    country = valTxt;

    BX24.callMethod('entity.section.get', {ENTITY:entity, SORT:{'NAME':'ASC'}, FILTER:{'=SECTION_ID':secID}}, function(res){

        let sections = res.data();
        let listCity = '';

        if(sections.length > 0){

            for (let i = 0; i < sections.length; i++) {
                
                listCity += '<li><span class="dropdown-item" data-id="' + sections[i].ID + '" onclick="selectCity(this);">' + sections[i].NAME + '</span></li>'
            }
        }else{
            listCity = '<li><span class="dropdown-item">Нету доступных городов</span></li>'
        }

        list.empty();
        list.append(listCity);
        cityArea.show();
    });

    BX24.placement.call('setValue', country);
}

function selectCity(el){

    let item = $(el);
    let secID = item.data('id');
    let valTxt = item.html();
    let streetArea = $('.dropdown-wrapper[data-field="street"]');
    let list = streetArea.find('ul');

    $('#dropdownMenuButtonCity').html(valTxt);
    city = valTxt;

    BX24.callMethod('entity.item.get', {ENTITY:entity, SORT:{'NAME':'ASC'}, FILTER:{'=SECTION_ID':secID}}, function(res){

        let items = res.data();
        let listCity = '';

        if(items.length > 0){

            for (let i = 0; i < items.length; i++) {
                
                listCity += '<li><span class="dropdown-item" data-id="' + items[i].ID + '" onclick="selectStreet(this);">' + items[i].NAME + '</span></li>'
            }
            

        }else{
            listCity = '<li><span class="dropdown-item">Нету доступных городов</span></li>'
        }

        list.empty();
        list.append(listCity);
        streetArea.show();
    });

    BX24.placement.call('setValue', country + ', ' + city);
}

function selectStreet(el){
    
    let item = $(el);
    let valTxt = item.html();

    $('#dropdownMenuButtonStreet').html(valTxt);
    street = valTxt;

    BX24.placement.call('setValue', country + ', ' + city + ', ' + street);
}
