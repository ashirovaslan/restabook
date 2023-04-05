if(localStorage.getItem('wish') === null){
    localStorage.setItem('wish', JSON.stringify([]))
}

let butto = document.querySelectorAll('.heart');

for(let btn of butto){
    btn.addEventListener('click', function(e){
        e.preventDefault();
        let wish = JSON.parse(localStorage.getItem('wish')); 
        let product_id = e.target.parentElement.parentElement.parentElement.parentElement.id;
        let product_img = e.target.parentElement.parentElement.parentElement.previousElementSibling.firstChild.src;
        let product_name = e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
        let product_price = e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.innerText;
        

        let existWish = wish.find(item => item.id ===  product_id)

        if(existWish === undefined){
            wish.push({
                id:product_id,
                name:product_name,
                image:product_img,
                price:product_price,
                count:1
            }) 
        } 
        else{
            existWish.count += 1
        }

        

        localStorage.setItem('wish', JSON.stringify(wish));
        SeeCount()
    })
}

function SeeCount(){
    let wish = JSON.parse(localStorage.getItem('wish'));
    let count = wish.length;
    document.getElementById('count-wish').innerHTML = count
}

SeeCount()


function SeeAlert(){
    let wish = JSON.parse(localStorage.getItem('wish'));

    if(wish.length === 0){
        document.getElementById('Alert').classList.remove('d-none')
        document.getElementById('myTable').classList.add('d-none');
        document.querySelector('table').classList.add('d-none');
    }
    else{
        document.getElementById('Alert').classList.add('d-none')
        document.getElementById('myTable').classList.remove('d-none');
        document.querySelector('table').classList.remove('d-none');

        let list = '';

        wish.forEach(x => {
            list +=`
            <tr>
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
                        <a href="#" title="Remove">
                        <i class="fal fa-times"></i>
                        </a>
                    </td>
                    <td>
                        <button id="btun" class="btn-shine">
                            <span>ADD TO CART</span>
                        </button>
                    </td>
            </tr>
            `
        })

        document.getElementById('tbody-wish').innerHTML = list;
        SeeAlert()

    }
    
}

SeeAlert()