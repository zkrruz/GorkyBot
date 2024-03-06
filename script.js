let tg = window.Telegram.WebApp;

tg.MainButton.text = "КОРЗИНА";
tg.MainButton.isVisible = true;
tg.MainButton.show();

document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.listAddToCart');

    const priceText = addToCartButtons[0].innerText.replace('₽', ''); 
    const price = parseInt(priceText);
    let total = 0; // перемещение переменной total вне цикла событий

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            total += price; // увеличение total при нажатии на кнопку "добавить в корзину"
            tg.MainButton.text = `КОРЗИНА ${total}`;

            // Сохраняем ссылку на исходную кнопку
            const originalButton = this;

            const btnEnable = document.createElement('div');
            btnEnable.classList.add('btnEnable');
            btnEnable.innerHTML = `
                <div class="btn-space position-absolute bottom-0">
                    <div data-cart="136668" class="groupBtn">
                        <button class="listControl" data-action="minus">-</button>
                        <input class="listInput" type="text" readonly value="0">
                        <button class="listControl" data-action="plus">+</button>
                    </div>
                </div>
            `;
                    
            button.parentNode.replaceChild(btnEnable, button);

            // Обработчики событий для кнопок "плюс" и "минус"
            const groupBtnMinus = btnEnable.querySelectorAll(".listControl");
            groupBtnMinus.forEach(button => {
                button.addEventListener('click', function() {
                    const parent = this.parentElement;
                    const input = parent.querySelector('.listInput');
                    let value = parseInt(input.value);
                    input.value = 1;
                    if (this.dataset.action === 'plus') {
                        value += 1; 
                        total += price;
                    } 
                    else if (this.dataset.action === 'minus') {
                        if (value > 1) {
                            value -= 1;
                            total -= price;
                        } else{
                            parent.parentNode.replaceChild(originalButton, parent);
                        }
                    }
                    input.value = value;
                    if (total != 0) {
                        tg.MainButton.text = `КОРЗИНА ${total}`;
                    } else {
                        tg.MainButton.text = "КОРЗИНА";
                    }
                })
            });
        });
    });
});