import React from 'react'
import '../styles/Prueba.scss'; 
export default function Prueba() {
  return (
    <div>
  <nav>
    <img src="./icons/icon_menu.svg" alt="menu" class="menu" />

    <div class="navbar-left">
      <img src="./logos/logo_yard_sale.svg" alt="logo" class="logo" />

      <ul>
        <li>
          <a href="/">All</a>
        </li>
        <li>
          <a href="/">Clothes</a>
        </li>
        <li>
          <a href="/">Electronics</a>
        </li>
        <li>
          <a href="/">Furnitures</a>
        </li>
        <li>
          <a href="/">Toys</a>
        </li>
        <li>
          <a href="/">Others</a>
        </li>
      </ul>
    </div>

    <div class="navbar-right">
      <ul>
        <li class="navbar-email">platzi@example.com</li>
        <li class="navbar-shopping-cart">
          <img src="./icons/icon_shopping_cart.svg" alt="shopping cart" />
          <div>2</div>
        </li>
      </ul>
    </div>
  </nav>

    </div>
  )
}
