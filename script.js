let tg = window.Telegram.WebApp;

tg.MainButton.text = "КОРЗИНА";
tg.MainButton.isVisible = true;
tg.MainButton.show()

document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.listAddToCart');

    const priceText = addToCartButtons[0].innerText.replace('₽', ''); 
    const price = parseInt(priceText);
    let total = 0; // перемещение переменной total вне цикла событий

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Сохраняем ссылку на исходную кнопку
            const originalButton = this;

            const btnEnable = document.createElement('div');
            btnEnable.classList.add('btnEnable');
            btnEnable.innerHTML = `
                <div class="btn-space position-absolute bottom-0">
                    <div data-cart="136668" class="groupBtn">
                        <button class="listControl" data-action="minus">-</button>
                        <input class="listInput" type="text" readonly value="1">
                        <button class="listControl" data-action="plus">+</button>
                    </div>
                </div>
            `;
                    
            button.parentNode.replaceChild(btnEnable, button);
            const groupBtnMinus = btnEnable.querySelectorAll(".listControl");

            groupBtnMinus.forEach(button => {
                button.addEventListener('click', function() {
                    const parent = this.parentElement;
                    const input = parent.querySelector('.listInput');
                    let value = parseInt(input.value);

                    if (this.dataset.action === 'plus') {
                        value += 1;
                        total += price; // увеличиваем total при нажатии на кнопку plus
                        tg.MainButton.text = `КОРЗИНА ${total}`;
                    } 
                    else if (this.dataset.action === 'minus' && value > 1) {
                        value -= 1;
                        total -= price; // уменьшаем total при нажатии на кнопку minus
                        tg.MainButton.text = `КОРЗИНА ${total}`;
                    }
                    else {
                        // Восстанавливаем исходную кнопку
                        parent.parentNode.replaceChild(originalButton, parent);
                    }
                    input.value = value;
                })
            });
        });
    });
});
