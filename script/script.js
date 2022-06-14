$().ready(function(){

    let addBtn = $('#add');
    let countryInput = $('#country');
    let cityInput = $('#city');
    let streetInput = $('#street');
    let adressEntity = 'adress';

    addBtn.click(function(){
        let country = countryInput.val();
        let city = cityInput.val();
        let street = streetInput.val();
        let errorField = '<span class="error-text"><span>';
        let successField = '<span class="success-text"><span>';

        $('span.error-text').remove();
        $('span.success-text').remove();

        if(country){

            BX24.callMethod('entity.section.get', {ENTITY: adressEntity, SORT: {'NAME': 'ASC'}, FILTER: {'=NAME': country}},function(result){
                
                let secCountry = result.data();

                if(secCountry.length == 0){

                    BX24.callMethod('entity.section.add', {ENTITY: adressEntity,NAME: country}, function(res){

                        if(res.data()){
                            let sectionID = res.data();
                            let success = $(successField).html('Страна "'+ country +'" добавлена');

                            countryInput.parent('.input-area-wrapper').after(success);

                            if(city){

                                BX24.callMethod('entity.section.add', {ENTITY: adressEntity,NAME: city, SECTION: sectionID}, function(res){
                                    
                                    if(res.data()){
                                        let sectionID = res.data();
                                        let success = $(successField).html('Город "'+ city +'" добавлен');

                                        cityInput.parent('.input-area-wrapper').after(success);
             
                                        if(street){
             
                                            BX24.callMethod('entity.item.add', {ENTITY: adressEntity,NAME: street, SECTION: sectionID}, function(res){

                                                if(res.data){
                                                    let success = $(successField).html('Улица "'+ street +'" добавлена');

                                                    streetInput.parent('.input-area-wrapper').after(success);
                                                }
                                            });
                                        }
                                    }
                                });
                            }else if(!city && street){
                                let error = $(errorField).html('Поле "Добавить город" должно быть заполнено');
                                cityInput.parent('.input-area-wrapper').after(error);
                            }
                        }
                    });
                }else{

                    if(city){

                        BX24.callMethod('entity.section.get', {ENTITY: adressEntity, SORT: {'NAME': 'ASC'}, FILTER: {'=NAME': city, 'SECTION_ID': secCountry[0].ID}},function(result){
                            
                            let sections = result.data();
    
                            if(sections.length == 0){
    
                                BX24.callMethod('entity.section.add', {ENTITY: adressEntity,NAME: city, SECTION:secCountry[0].ID}, function(res){
    
                                    if(res.data()){
                                        let sectionID = res.data();
                                        let success = $(successField).html('Город "'+ city +'" добавлен');

                                        cityInput.parent('.input-area-wrapper').after(success);
            
                                        if(street){
            
                                            BX24.callMethod('entity.item.add', {ENTITY: adressEntity,NAME: street, SECTION: sectionID}, function(res){

                                                if(res.data){
                                                    let success = $(successField).html('Улица "'+ street +'" добавлена');

                                                    streetInput.parent('.input-area-wrapper').after(success);
                                                }
                                            });
                                        }else if(!city && street){
                                            let error = $(errorField).html('Поле "Добавить город" должно быть заполнено');
                                            cityInput.parent('.input-area-wrapper').after(error);
                                        }
                                    }
                                });
                            }else{
                                
                                if(street){
    
                                    BX24.callMethod('entity.item.get', {ENTITY: adressEntity, SORT: {'NAME': 'ASC'}, FILTER: {'=NAME': street, 'SECTION_ID': sections[0].ID}},function(res){
                                        
                                        let item = res.data();
        
                                        if(item.length == 0){
        
                                            BX24.callMethod('entity.item.add', {ENTITY: adressEntity,NAME: street, SECTION: sections[0].ID}, function(res){

                                                if(res.data){
                                                    let success = $(successField).html('Улица "'+ street +'" добавлена');

                                                    streetInput.parent('.input-area-wrapper').after(success);
                                                }
                                            });
                                        }else{
                                            let error = $(errorField).html("Такая улица существует");
                                            streetInput.parent('.input-area-wrapper').after(error);
                                        }
                                    })
                                }else{
                                    let error = $(errorField).html("Город \"" + city + "\" существует");
                                    cityInput.parent('.input-area-wrapper').after(error);
                                }
                            } 
                        });
                    }else if(!city && street){
                        let error = $(errorField).html("Поле \"Добавить город\" должно быть заполнено");
                        cityInput.parent('.input-area-wrapper').after(error);
                    }else{
                        let error = $(errorField).html("Страна \"" + country + "\" существует");
                        countryInput.parent('.input-area-wrapper').after(error);
                    }

                    

                    
                }
            });
        } else{
            let error = $(errorField).html('Поле "Добавить страну" должно быть заполнено');
            countryInput.parent('.input-area-wrapper').after(error);
        }
    })

    function addItem(entity, name, sectionID = null, props = {}){

        let data = {
            ENTITY: entity,
            NAME: name,
        }

        if(sectionID){
            data.SECTION = sectionID;
        }

        if(props){
            data.PROPERTY_VALUES = props;
        }

        BX24.callMethod('entity.item.add', data);
    }
})