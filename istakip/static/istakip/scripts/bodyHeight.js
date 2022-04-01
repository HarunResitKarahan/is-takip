// $('body').css({height:  window.innerHeight, display: flex})


// var height = $('.input')
// console.log($('.input').innerWidth())

if (localStorage.getItem('button') !== null) {
    $(localStorage.getItem('button')).css({display: 'flex'})
}
// $(localStorage.getItem('button')).css({display: flex})
// console.log(localStorage.getItem('button'))

$('.buttons#1').click(function( event ){ // <---- "event" parameter here
    localStorage.setItem('button', '".buttons#1"')
    document.querySelector('#kayit').style.display = 'flex'
    var width = $('#1.register').outerWidth()
    $('#2.register').css({width: width})

    var toplam = 0
    document.querySelectorAll('.input').forEach(element => {
        toplam += $(element).outerHeight()
    });
    $('.worker').css({height: toplam})
});
$('.buttons#2').click(function( event ){ // <---- "event" parameter here
    localStorage.setItem('button', '".buttons#2"')
    document.querySelector('#takip').style.display = 'flex'
});
$('.buttons#3').click(function( event ){ // <---- "event" parameter here
    localStorage.setItem('button', '".buttons#3"')
    document.querySelector('#ayarlar').style.display = 'flex'

    var toplam = 0
    document.querySelectorAll('#ayarlar .register:first-child .input').forEach(element => {
        toplam += $(element).outerHeight()
    });
    $('#ayarlar .worker').css({height: toplam})
});
$('.buttons#4').click(function( event ){ // <---- "event" parameter here
    localStorage.setItem('button', '".buttons#4"')
    document.querySelector('#rapor').style.display = 'flex'

    var toplam = 0
    document.querySelectorAll('#rapor .register:first-child .input').forEach(element => {
        toplam += $(element).outerHeight()
    });
    $('#rapor .worker').css({height: toplam})
});
$('.cards').click(function( event ){ // <---- "event" parameter here
    if (event.target.className === 'cards') {
        document.querySelectorAll('.cards').forEach(element => {
            element.style.display = 'none'
            localStorage.removeItem('button')
        });
      }
});

$('.kaydet').click(function( event ){ // <---- "event" parameter here
    fetch('https://isci-kayit.herokuapp.com/workers/getworkers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            workerName: document.getElementsByName("name")[0].value,
            workerTelNo: document.getElementsByName("phone")[0].value
        })
    })
        .then(response => response.json())
        .then(data => {
            alert(data)
            location.reload()
        })
});
$('.update').click(function( event ){ // <---- "event" parameter here
    fetch('https://isci-kayit.herokuapp.com/workers/getworkers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: document.querySelector('#workerupdate').options[document.querySelector('#workerupdate').selectedIndex].value,
            workerName: document.getElementsByName("newname")[0].value,
            workerTelNo: document.getElementsByName("newno")[0].value,
        })
    })
        .then(response => response.json())
        .then(data => {
            alert(data)
            location.reload()
        })
});
$('.sil').click(function( event ){ // <---- "event" parameter here
    fetch('https://isci-kayit.herokuapp.com/workers/getworkers', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: document.querySelector('#worker').options[document.querySelector('#worker').selectedIndex].value,
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data == 'Deleted Successfully') {
                alert("Başarıyla Silindi.")
                location.reload()
            }
        })
});
$('.fruitekaydet').click(function( event ){ // <---- "event" parameter here
    fetch('https://isci-kayit.herokuapp.com/fruite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            fruiteName: document.getElementsByName("meyve")[0].value,
            fruiteKg: document.getElementsByName("tl")[0].value
        })
    })
        .then(response => response.json())
        .then(data => {
            alert(data)
            location.reload()
        })
});
$('.fruiteupdate').click(function( event ){ // <---- "event" parameter here
    fetch('https://isci-kayit.herokuapp.com/fruite', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: document.querySelector('#fruiteupdate').options[document.querySelector('#fruiteupdate').selectedIndex].value,
            fruiteKg: document.getElementsByName("tlupdate")[0].value
        })
    })
        .then(response => response.json())
        .then(data => {
            alert(data)
            location.reload()
        })
});
$('.fruitesil').click(function( event ){ // <---- "event" parameter here
    fetch('https://isci-kayit.herokuapp.com/fruite', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: document.querySelector('#fruit').options[document.querySelector('#fruit').selectedIndex].value,
        })
    })
        .then(response => response.json())
        .then(data => {
            alert(data)
            location.reload()
        })
});
$('.calculate').click(function( event ) {
    var toplamkilo = 0
    $.each($('input[name="toplanankilo"]'), function( key, value ) {
        toplamkilo += Number(value.value)
    })
    var toplamyevmiye = 0
    $.each($('input[name="yevmiye"]'), function( key, value ) {
        toplamyevmiye += Number(value.value)
    })
    // console.log(toplamkilo)
    // console.log(toplamyevmiye)
    $('input[name="result"]').val( String(toplamyevmiye) + '₺' )
    // $('.result').val(  )
})

// ----------------------------------------------
var input = "<div class='input jsadded'><label for='phone' style='margin-left: 6px;'>İşçi Seç: </label><select name='fruit' id='fruit'><option value='default' selected='true' disabled='disabled' hidden>İşçi Şeçin</option></select><label for='toplanankilo' style='margin-left: 6px;'>Toplanan Kilo: </label><input type='number' name='toplanankilo' value='0' min='0'><label for='yevmiye' style='margin-left: 6px;'>Yevmiye: </label><input type='number' value='0' min='0' name='yevmiye'></div>"


$('#quantity').change(function () {
    $('.jsadded').remove()
    for (flag = 0; flag < Number($('#quantity').val()); flag++) { 
        $('.jsadd').append(input)
    }
})

$('input[name="vehicle1"]').click(function ( event ) { 
    var checkboxes = document.getElementsByName('vehicle1')
    checkboxes.forEach((item) => {
        if (item !== event.target) item.checked = false
    })
})
$('input[name="vehicle2"]').click(function ( event ) { 
    var checkboxes = document.getElementsByName('vehicle2')
    checkboxes.forEach((item) => {
        if (item !== event.target) item.checked = false
    })
})
