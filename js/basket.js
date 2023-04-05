 //basket begin

 
 if(localStorage.getItem('basket') == null){
    localStorage.setItem('basket',JSON.stringify([]))
}

let buttons = document.querySelectorAll('.add_cart');

for(let btn of buttons){
    btn.addEventListener('click',function(e){
        e.preventDefault();
        let basket = JSON.parse(localStorage.getItem('basket'));
        let prod_id = e.target.parentElement.parentElement.id;
        let prod_img = e.target.parentElement.previousElementSibling.firstChild.src;
        let prod_name = e.target.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
        let prod_price =e.target.previousElementSibling.innerText;

        let existProd = basket.find(item => item.id === prod_id);

        if(existProd === undefined){
            basket.push({
                id:prod_id,
                name:prod_name,
                image:prod_img,
                price:prod_price,
                count:1
            })
        }
        else{
            existProd.count +=1
        }


        localStorage.setItem('basket',JSON.stringify(basket));
        ShowCount()
    })
}

function ShowCount(){
    let basket = JSON.parse(localStorage.getItem('basket'));
    let count = basket.length;
    document.getElementById('count').innerHTML = count
}

ShowCount()


function ShowAlert(){
    let basket = JSON.parse(localStorage.getItem('basket'));

    if(basket.length === 0){
        document.getElementById('Alert').classList.remove('d-none')
        document.getElementById('assa').classList.add('d-none')
        document.getElementById('adda').classList.add('d-none')
        document.getElementById('affa').classList.add('d-none')
        document.querySelector('table').classList.add('d-none');
    }
    else{
        document.getElementById('Alert').classList.add('d-none')
        document.getElementById('assa').classList.remove('d-none')
        document.getElementById('adda').classList.remove('d-none')
        document.getElementById('affa').classList.remove('d-none')
        document.querySelector('table').classList.remove('d-none');

        let list = '';

        basket.forEach(x=>{
            list += `
            <tr id="test">
                    <td class="hidden-xs">
                        <a href="#">
                           <img src="${x.image}" alt="" class="respimg">
                        </a>
                    </td>
                    <td>
                        <h5 class="product-name">${x.name}</h5>
                    </td>
                    <td class="hidden-xs">
                        <h5 class="order-money">${x.price}</h5>
                    </td>
                    <td>
                        <input type="number" name="cartin1" value="${x.count}" max="50" min="1" class="order-count">
                    </td>
                    <td>
                        <span class="total-price">${x.price}</span>
                    </td>
                    <td class="pr-remove">
                      <button type="button" class="btn btn-danger" onclick="remove(this)">Remove</button>

                    </td>
            </tr>
            `
        })

        document.getElementById('tbody').innerHTML = list
        remove()
    }
}

ShowAlert()

function remove(button){
    let number = button.id
    let row = document.getElementById('test' + number);
    row.remove();

}

remove()

//basket end