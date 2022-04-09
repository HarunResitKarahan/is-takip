// $('body').css({height:  window.innerHeight, display: flex})
// import jsPDF from "jspdf"

// var height = $('.input')
// console.log($('.input').innerWidth())

if (localStorage.getItem('button') !== null) {
    document.getElementById(localStorage.getItem('button')).style.display = 'flex'
}
if (sessionStorage.getItem('login') !== null) {
    document.getElementById('login').style.display = 'none'
}else {
    document.getElementById('login').style.display = 'flex'
}
// $(localStorage.getItem('button')).css({display: flex})
// console.log(localStorage.getItem('button'))

$('.buttons#1').click(function( event ){ // <---- "event" parameter here
    localStorage.setItem('button', 'kayit')
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
    localStorage.setItem('button', 'takip')
    document.querySelector('#takip').style.display = 'flex'
});
$('.buttons#3').click(function( event ){ // <---- "event" parameter here
    localStorage.setItem('button', 'ayarlar')
    document.querySelector('#ayarlar').style.display = 'flex'

    var toplam = 0
    document.querySelectorAll('#ayarlar .register:first-child .input').forEach(element => {
        toplam += $(element).outerHeight()
    });
    $('#ayarlar .worker').css({height: toplam})
});
$('.buttons#4').click(function( event ){ // <---- "event" parameter here
    localStorage.setItem('button', 'rapor')
    document.querySelector('#rapor').style.display = 'flex'

    var toplam = 0
    document.querySelectorAll('#rapor .register:first-child .input').forEach(element => {
        toplam += $(element).outerHeight()
    });
    $('#rapor .worker').css({height: toplam})
});
$('.cards').click(function( event ){ // <---- "event" parameter here
    if (event.target.className === 'cards' && event.target.id !== 'login') {
        document.querySelectorAll('.cards').forEach(element => {
            element.style.display = 'none'
            localStorage.removeItem('button')
        });
      }
});

$('.login').click(function( event ){ // <---- "event" parameter here
    // fetch('https://isci-kayit.herokuapp.com/login', {
    fetch('http://localhost:8000/login', {    
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            adminId: document.getElementsByName("admin-id")[0].value,
            adminPassword: document.getElementsByName("password")[0].value
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data == 'Giriş Başarılı') {
                document.querySelector('#login').style.display = 'none'
                sessionStorage.setItem('login', data);
            }
            else {
                alert(data)
                location.reload()
            }
        })
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

$('#choice-fruite').change((event)=> {
    $('#payment').show()
    $('input[name="toplanankilo"]').val(' ')
    $('input[name="yevmiye"]').val(' ')
    $('input[name="result"]').val(' ')
    document.querySelector('#search').disabled = false
})

$('input[id="search"]').keyup((event) => {
    var counter = 0
    if (event.target.value.length === 0) {
        $.each($('td[name="worker-names"]'), (key, item) => {
            item.parentNode.style.display = null
        })
    }else {
        $.each($('td[name="worker-names"]'), (key, item) => {
            counter = 0
            event.target.value.split('').forEach(element => {
                item.innerText.split('').some(item => {
                    if (element.toUpperCase() === item || element.toLowerCase() === item) {
                        counter += 1
                        return counter == 1
                    }
                })
            });
            // console.log(String(key) + ".ci kişi")
            // console.log(event.target.value.length)
            // console.log(counter)
            if (counter < event.target.value.length) {
                item.parentNode.style.display = 'none'
            }else if (counter >= event.target.value.length){
                item.parentNode.style.display = null
            }
        })
    }
})

$('input[id="search-rapor"]').keyup((event) => {
    var counter = 0
    if (event.target.value.length === 0) {
        $.each($('td[name="worker-names-rapor"]'), (key, item) => {
            item.parentNode.style.display = null
        })
    }else {
        $.each($('td[name="worker-names-rapor"]'), (key, item) => {
            counter = 0
            event.target.value.split('').forEach(element => {
                item.innerText.split('').some(item => {
                    if (element.toUpperCase() === item || element.toLowerCase() === item) {
                        counter += 1
                        return counter == 1
                    }
                })
            });
            // console.log(String(key) + ".ci kişi")
            // console.log(event.target.value.length)
            // console.log(counter)
            if (counter < event.target.value.length) {
                item.parentNode.style.display = 'none'
            }else if (counter >= event.target.value.length){
                item.parentNode.style.display = null
            }
        })
    }
})

$('input[name="toplanankilo"]').keyup((event)=> {
    var fruiteKg = document.querySelector('#choice-fruite').options[document.querySelector('#choice-fruite').selectedIndex].value
    var id = event.target.id.split('_')[1]
    document.querySelector('input[id="yevmiye_' + id + '"]').value = event.target.value * fruiteKg
    document.querySelector('input[id="yevmiye_' + id + '"]').setAttribute("value", event.target.value * fruiteKg)
    event.target.setAttribute("value", event.target.value)
    // console.log(event.target)
})

$('.calculate').click(function( event ) {
    var fruiteKg = document.querySelector('#choice-fruite').options[document.querySelector('#choice-fruite').selectedIndex].value
    var toplamyevmiye = 0
    $.each($('input[name="toplanankilo"]'), function( key, value ) {
        toplamyevmiye += Number(value.value) * fruiteKg
    })
    // var toplamyevmiye = 0
    // $.each($('input[name="yevmiye"]'), function( key, value ) {
    //     toplamyevmiye += Number(value.value)
    // })
    // console.log(toplamkilo)
    // console.log(toplamyevmiye)
    $('input[name="result"]').val( String(toplamyevmiye) + '₺' )
    // $('.result').val(  )
})

$('.pdf').click((event)=> {
    var elementHTML = $('#payment').html()
    var printWindow = window.open('', '', `height=${window.innerHeight},width=${window.innerWidth}`);
    printWindow.document.write(elementHTML);
    printWindow.document.close();
    printWindow.print();
})
$('.save').click(event => {
    var workedWorkers = []
    $.each($('input[name="toplanankilo"]'), function( key, item ) {
        if (item.value > 0)
            console.log(item.value)
            // console.log(item.parentElement.parentElement.childNodes[1].innerText)
            workedWorkers.push({
                // 'worker': item.id.split('_')[1],
                'worker': item.parentElement.parentElement.childNodes[3].innerText,
                'workerFruiteId': document.querySelector('#choice-fruite').options[document.querySelector('#choice-fruite').selectedIndex].innerText,
                'workerFruiteKg': item.value,
                'workerPayment': document.querySelector('input[id="yevmiye_' + item.id.split('_')[1] + '"]').value
            })
            // workedWorkers['workerid'] = item.id.split('_')[1]
            // workedWorkers['workerFruiteKg'] = item.value
            // workedWorkers['workerPayment'] = document.querySelector('input[id="yevmiye_' + item.id.split('_')[1] + '"]').value
    })
    console.log(workedWorkers)
    // console.log(workedWorkers)
    fetch('https://isci-kayit.herokuapp.com/record', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            workers: workedWorkers
        })
    })
        .then(response => response.json())
        .then(data => {
            alert(data)
            location.reload()
        })    
})


// ----------------------------------------------

$('input[name="vehicle1"]').click(function ( event ) { 
    // console.log(typeof(event.target.checked))
    if (event.target.checked == true) {
        document.querySelector('#rapor-search').style.display = 'none'
        var checkboxes = document.querySelectorAll('.rapor-checkbox')
        checkboxes.forEach((item) => {
            if (item !== event.target) item.checked = false
        })
        document.querySelector('#rapor-table').style.display = null
    }else {
        document.querySelector('#rapor-table').style.display = 'none'
    }
})
$('input[name="vehicle2"]').click(function ( event ) { 
    if (event.target.checked == true) {
        var checkboxes = document.querySelectorAll('.rapor-checkbox')
        checkboxes.forEach((item) => {
            if (item !== event.target) item.checked = false
        })
        document.querySelector('#rapor-table').style.display = null
        document.querySelector('#rapor-search').style.display = null
    }else {
        document.querySelector('#rapor-table').style.display = 'none'
        document.querySelector('#rapor-search').style.display = 'none'
    }
})

$('input[name="date"]').change(event => {
    // console.log(event.target.value)
    var dates = event.target.value.split('-')[2] + '.' + event.target.value.split('-')[1] + '.' + event.target.value.split('-')[0]
    var times = document.querySelectorAll('td[name="time"]')
    times.forEach(item=>{
        if (item.innerText !== dates) {
            item.parentNode.style.display = 'none'
        }
        else if (item.innerText === dates){
            item.parentNode.style.display = null
        }
    })
})