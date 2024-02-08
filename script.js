let tg = window.Telegram.WebApp;

tg.MainButton.text = "КОРЗИНА";
tg.MainButton.isVisible = true;
tg.MainButton.show()

// Ждем, пока загрузится весь HTML-документ
document.addEventListener('DOMContentLoaded', function() {
    // Находим все кнопки с классом "listAddToCart"
    const addToCartButtons = document.querySelectorAll('.listAddToCart');
    
    // Для каждой кнопки добавляем обработчик события "click"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Создаем элемент, соответствующий вашему блоку
            const btnEnable = document.createElement('div');
            btnEnable.classList.add('btnEnable');
            btnEnable.innerHTML = `
                <div class="btn-space position-absolute bottom-0">
                    <div data-cart="136668" class="groupBtn">
                        <button class="listControl" data-action="minus">-</button>
                        <input type="text" readonly value="1">
                        <button class="listControl" data-action="plus">+</button>
                    </div>
                </div>
            `;
            
            // Заменяем кнопку на созданный блок
            button.parentNode.replaceChild(btnEnable, button);
        });
    });
});
